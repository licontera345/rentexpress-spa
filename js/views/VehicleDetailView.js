export class VehicleDetailView {
    constructor() {
        this.containerSelector = "#modal-body";
        this.$container = document.querySelector(this.containerSelector);
        this.modal = document.getElementById("vehicleModal");
    }

    render(vehicle) {
        if (!this.$container) return;

        this.$container.innerHTML = `
            <div class="vehicle-detail">
                <div class="detail-section">
                    <h3>Información General</h3>
                    <p><strong>Marca:</strong> ${vehicle.brand}</p>
                    <p><strong>Modelo:</strong> ${vehicle.model}</p>
                    <p><strong>Matrícula:</strong> ${vehicle.licensePlate}</p>
                    <p><strong>VIN:</strong> ${vehicle.vinNumber}</p>
                    <p><strong>Año:</strong> ${vehicle.manufactureYear}</p>
                    <p><strong>Kilometraje:</strong> ${vehicle.currentMileage} km</p>
                    <p><strong>Precio por día:</strong> ${vehicle.dailyPrice}€</p>
                </div>
            </div>
        `;
    }

    show() {
        if (this.modal) this.modal.classList.add("show");
    }

    hide() {
        if (this.modal) this.modal.classList.remove("show");
    }
}