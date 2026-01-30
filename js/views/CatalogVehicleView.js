/**
 * Vista del catálogo de vehículos
 * SOLO renderiza HTML, NO tiene lógica de negocio
 */
export class CatalogVehicleView {
    constructor() {
        this.containerSelector = "#catalog-section";
        this.$container = document.querySelector(this.containerSelector);
        this.listContainer = document.querySelector("#vehicle-list");
        this.countElement = document.querySelector("#vehicle-count");
    }

    /**
     * Renderizar el catálogo de vehículos
     * @param {Object} data - { vehicles: [] }
     */
    render(data) {
        if (!this.$container) return;

        const { vehicles = [] } = data;

        this.$container.style.display = "block";

        // Actualizar contador
        if (this.countElement) {
            this.countElement.textContent = `${vehicles.length} vehículo${vehicles.length !== 1 ? 's' : ''}`;
        }

        // Renderizar lista
        if (this.listContainer) {
            if (vehicles.length === 0) {
                this.listContainer.innerHTML = `
                    <li class="catalog-empty">No hay vehículos disponibles</li>
                `;
            } else {
                this.listContainer.innerHTML = vehicles.map(v => this.renderVehicleCard(v)).join("");
            }
        }
    }

    /**
     * Renderizar una tarjeta de vehículo
     */
    renderVehicleCard(vehicle) {
        return `
            <li class="catalog-item" data-vehicle-id="${vehicle.vehicleId}">
                ${this.renderVehiclePlaceholder(vehicle)}
                <div class="vehicle-card">
                    <div class="vehicle-header">
                        <span class="vehicle-name">${vehicle.brand} ${vehicle.model}</span>
                        <span class="vehicle-year">${vehicle.manufactureYear}</span>
                    </div>
                    <div class="vehicle-info">
                        <p><strong>Matrícula:</strong> ${vehicle.licensePlate}</p>
                        <p><strong>Kilometraje:</strong> ${vehicle.currentMileage.toLocaleString()} km</p>
                    </div>
                    <div class="vehicle-price">
                        <span class="price-label">Precio por día</span>
                        <span class="price-value">${vehicle.dailyPrice}€</span>
                    </div>
                </div>
            </li>
        `;
    }

    /**
     * Renderizar placeholder de imagen
     */
    renderVehiclePlaceholder(vehicle) {
        return `
            <div class="vehicle-image-placeholder">
                <span class="vehicle-initials">${vehicle.brand.charAt(0)}${vehicle.model.charAt(0)}</span>
                <p class="no-image-text">Sin imagen</p>
            </div>
        `;
    }

    show() {
        if (this.$container) {
            this.$container.style.display = "block";
        }
    }

    hide() {
        if (this.$container) {
            this.$container.style.display = "none";
        }
    }
}