/**
 * Vista del modal de detalle de vehículo
 * SOLO renderiza HTML, NO tiene lógica de negocio
 */
export class VehicleDetailView {
    constructor() {
        this.containerSelector = "#modal-body";
        this.$container = document.querySelector(this.containerSelector);
        this.modal = document.getElementById("vehicleModal");
    }

    /**
     * Renderizar los detalles del vehículo
     * @param {Object} data - { vehicle: {...} }
     */
    render(data) {
        if (!this.$container) return;

        const { vehicle } = data;

        if (!vehicle) {
            this.$container.innerHTML = `
                <div class="error-message">
                    <p>No se pudo cargar la información del vehículo</p>
                </div>
            `;
            return;
        }

        this.$container.innerHTML = `
            ${this.renderVehicleImage(vehicle)}

            <div class="vehicle-detail-info">
                <h2 class="vehicle-detail-name">
                    ${vehicle.brand} ${vehicle.model}
                </h2>

                <p class="vehicle-detail-price">
                    ${vehicle.dailyPrice}€ <span class="price-period">/ día</span>
                </p>

                <ul class="vehicle-detail-features">
                    <li><strong>Año de fabricación:</strong> ${vehicle.manufactureYear}</li>
                    <li><strong>Matrícula:</strong> ${vehicle.licensePlate}</li>
                    <li><strong>VIN:</strong> ${vehicle.vinNumber}</li>
                    <li><strong>Kilometraje:</strong> ${this.formatNumber(vehicle.currentMileage)} km</li>
                    <li><strong>Estado:</strong> ${vehicle.activeStatus ? 
                        '<span class="status-badge status-active">Disponible</span>' : 
                        '<span class="status-badge status-inactive">No disponible</span>'}</li>
                </ul>

                ${this.renderAdditionalInfo(vehicle)}
            </div>
        `;
    }

    /**
     * Renderizar imagen o placeholder del vehículo
     */
    renderVehicleImage(vehicle) {
        // Por ahora placeholder, después se puede integrar con ImageService
        return `
            <div class="vehicle-detail-image-placeholder">
                <span class="vehicle-detail-initials">${vehicle.brand.charAt(0)}${vehicle.model.charAt(0)}</span>
                <p class="no-image-detail-text">Sin imagen</p>
            </div>
        `;
    }

    /**
     * Renderizar información adicional si existe
     */
    renderAdditionalInfo(vehicle) {
        const additionalFields = [];

        if (vehicle.color) {
            additionalFields.push(`<li><strong>Color:</strong> ${vehicle.color}</li>`);
        }

        if (vehicle.fuelType) {
            additionalFields.push(`<li><strong>Combustible:</strong> ${vehicle.fuelType}</li>`);
        }

        if (vehicle.transmission) {
            additionalFields.push(`<li><strong>Transmisión:</strong> ${vehicle.transmission}</li>`);
        }

        if (additionalFields.length === 0) {
            return '';
        }

        return `
            <div class="vehicle-additional-info">
                <h3>Información adicional</h3>
                <ul class="vehicle-detail-features">
                    ${additionalFields.join('')}
                </ul>
            </div>
        `;
    }

    /**
     * Formatear números con separadores de miles
     */
    formatNumber(num) {
        return num.toLocaleString('es-ES');
    }

    show() {
        if (this.modal) {
            this.modal.classList.add("active");
        }
    }

    hide() {
        if (this.modal) {
            this.modal.classList.remove("active");
        }
    }
}