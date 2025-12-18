import ImageService from "../services/ImageService.js";

export class CatalogVehicleView {
    constructor() {
        this.containerSelector = "#catalog-section";
        this.$container = document.querySelector(this.containerSelector);
        this.listContainer = document.querySelector("#vehicle-list");
        this.countElement = document.querySelector("#vehicle-count");
    }

    async render(vehicles) {
        if (!this.$container) return;

        this.$container.style.display = "block";

        if (!vehicles || vehicles.length === 0) {
            if (this.listContainer) this.listContainer.innerHTML = `
                <li class="catalog-empty">No hay vehículos disponibles</li>
            `;
            if (this.countElement) this.countElement.textContent = "0 vehículos";
            return;
        }

        // Uso optimizado con caché
        const vehiclesWithImages = await Promise.all(
            vehicles.map(async (v) => {
                try {
                    const images = await ImageService.listVehicleImages(v.vehicleId);
                    return { ...v, images: images || [] };
                } catch (error) {
                    console.warn(`No se pudieron cargar imágenes para vehículo ${v.vehicleId}`);
                    return { ...v, images: [] };
                }
            })
        );

        if (this.listContainer) {
            this.listContainer.innerHTML = vehiclesWithImages.map(v => `
                <li class="catalog-item" data-vehicle-id="${v.vehicleId}">
                    ${this.renderVehicleImage(v)}
                    <div class="vehicle-card">
                        <div class="vehicle-header">
                            <span class="vehicle-name">${v.brand} ${v.model}</span>
                            <span class="vehicle-year">${v.manufactureYear}</span>
                        </div>
                        <div class="vehicle-info">
                            <p><strong>Matrícula:</strong> ${v.licensePlate}</p>
                            <p><strong>Kilometraje:</strong> ${v.currentMileage.toLocaleString()} km</p>
                        </div>
                        <div class="vehicle-price">
                            <span class="price-label">Precio por día</span>
                            <span class="price-value">${v.dailyPrice}€</span>
                        </div>
                    </div>
                </li>
            `).join("");
        }

        if (this.countElement) this.countElement.textContent = `${vehicles.length} vehículos`;
    }

    renderVehicleImage(vehicle) {
        if (vehicle.images && vehicle.images.length > 0) {
            const imageUrl = ImageService.getVehicleImageUrl(vehicle.vehicleId, vehicle.images[0]);
            return `
                <img src="${imageUrl}" 
                     alt="${vehicle.brand} ${vehicle.model}"
                     class="vehicle-card-image"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="vehicle-image-placeholder" style="display: none;">
                    <span class="vehicle-initials">${vehicle.brand.charAt(0)}${vehicle.model.charAt(0)}</span>
                    <p class="no-image-text">Sin imagen</p>
                </div>
            `;
        } else {
            return `
                <div class="vehicle-image-placeholder">
                    <span class="vehicle-initials">${vehicle.brand.charAt(0)}${vehicle.model.charAt(0)}</span>
                    <p class="no-image-text">Sin imagen</p>
                </div>
            `;
        }
    }

    show() {
        if (this.$container) this.$container.style.display = "block";
    }

    hide() {
        if (this.$container) this.$container.style.display = "none";
    }
}