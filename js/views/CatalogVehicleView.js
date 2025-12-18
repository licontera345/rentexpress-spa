export class CatalogVehicleView {
    constructor() {
        this.containerSelector = "#catalog-section";
        this.$container = document.querySelector(this.containerSelector);
        this.listContainer = document.querySelector("#vehicle-list");
        this.countElement = document.querySelector("#vehicle-count");
    }

    render(vehicles) {
        if (!this.$container) return;

        this.$container.style.display = "block";

        if (!vehicles || vehicles.length === 0) {
            if (this.listContainer) this.listContainer.innerHTML = `
                <li class="catalog-empty">No hay vehículos disponibles</li>
            `;
            if (this.countElement) this.countElement.textContent = "0 vehículos";
            return;
        }

        if (this.listContainer) {
            this.listContainer.innerHTML = vehicles.map(v => `
                <li class="catalog-item" data-vehicle-id="${v.vehicleId}">
                    ${this.renderVehiclePlaceholder(v)}
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

    renderVehiclePlaceholder(vehicle) {
        return `
            <div class="vehicle-image-placeholder">
                <span class="vehicle-initials">${vehicle.brand.charAt(0)}${vehicle.model.charAt(0)}</span>
                <p class="no-image-text">Sin imagen</p>
            </div>
        `;
    }

    show() {
        if (this.$container) this.$container.style.display = "block";
    }

    hide() {
        if (this.$container) this.$container.style.display = "none";
    }
}