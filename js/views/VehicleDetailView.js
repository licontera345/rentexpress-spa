import ImageService from "../services/ImageService.js";

export class VehicleDetailView {
    constructor() {
        this.containerSelector = "#modal-body";
        this.$container = document.querySelector(this.containerSelector);
        this.modal = document.getElementById("vehicleModal");
    }

    async render(vehicle) {
        if (!this.$container) return;

        // Cargar imágenes del vehículo
        let images = [];
        try {
            images = await ImageService.listVehicleImages(vehicle.vehicleId);
        } catch (error) {
            console.warn(`No se pudieron cargar imágenes para vehículo ${vehicle.vehicleId}`);
        }

        this.$container.innerHTML = `
            ${this.renderVehicleImage(vehicle, images)}

            <div class="vehicle-detail-info">
                <h2 class="vehicle-detail-name">
                    ${vehicle.brand} ${vehicle.model}
                </h2>

                <ul class="vehicle-detail-features">
                    <li><strong>Año de fabricación:</strong> ${vehicle.manufactureYear}</li>
                    <li><strong>Matrícula:</strong> ${vehicle.licensePlate}</li>
                    <li><strong>VIN:</strong> ${vehicle.vinNumber}</li>
                    <li><strong>Kilometraje:</strong> ${vehicle.currentMileage.toLocaleString()} km</li>
                    <li><strong>Precio:</strong> ${vehicle.dailyPrice} € / día</li>
                </ul>

                ${images.length > 1 ? this.renderImageGallery(vehicle, images) : ''}
            </div>
        `;
    }

    renderVehicleImage(vehicle, images) {
        if (images && images.length > 0) {
            const imageUrl = ImageService.getVehicleImageUrl(vehicle.vehicleId, images[0]);
            return `
                <img src="${imageUrl}" 
                     alt="${vehicle.brand} ${vehicle.model}"
                     class="vehicle-detail-image"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="vehicle-detail-image-placeholder" style="display: none;">
                    <span class="vehicle-detail-initials">${vehicle.brand.charAt(0)}${vehicle.model.charAt(0)}</span>
                    <p class="no-image-detail-text">Sin imagen</p>
                </div>
            `;
        } else {
            return `
                <div class="vehicle-detail-image-placeholder">
                    <span class="vehicle-detail-initials">${vehicle.brand.charAt(0)}${vehicle.model.charAt(0)}</span>
                    <p class="no-image-detail-text">Sin imagen</p>
                </div>
            `;
        }
    }

    renderImageGallery(vehicle, images) {
        return `
            <div class="vehicle-detail-gallery">
                <h4>Más imágenes:</h4>
                <div class="detail-gallery-grid">
                    ${images.slice(1).map(imageName => `
                        <img src="${ImageService.getVehicleImageUrl(vehicle.vehicleId, imageName)}" 
                             alt="${vehicle.brand} ${vehicle.model}"
                             class="detail-gallery-thumb"
                             onclick="document.querySelector('.vehicle-detail-image').src = this.src">
                    `).join('')}
                </div>
            </div>
        `;
    }

    show() {
        if (this.modal) this.modal.classList.add("active");
    }

    hide() {
        if (this.modal) this.modal.classList.remove("active");
    }
}