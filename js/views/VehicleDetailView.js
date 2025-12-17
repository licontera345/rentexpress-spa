export class VehicleDetailView {
    constructor() {
        this.containerSelector = "#modal-body";
        this.$container = document.querySelector(this.containerSelector);
        this.modal = document.getElementById("vehicleModal");
    }

  render(vehicle) {
    if (!this.$container) return;

    this.$container.innerHTML = `
        <div class="vehicle-detail-image">
            <img src="./img/default.jpg" alt="${vehicle.brand} ${vehicle.model}">
        </div>

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
