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
            if (this.listContainer) this.listContainer.innerHTML = "<li>No hay vehículos disponibles</li>";
            if (this.countElement) this.countElement.textContent = "0 vehículos";
            return;
        }

        if (this.listContainer) {
            this.listContainer.innerHTML = vehicles.map(v => `
                <li class="catalog-item" data-vehicle-id="${v.vehicleId}">
                 <img src="./img/default.jpg" alt="${v.brand} ${v.model}">
                    <h3>${v.brand} ${v.model} (${v.manufactureYear})</h3>
                    <p>Matrícula: ${v.licensePlate}</p>
                    <p>KM: ${v.currentMileage}</p>
                    <p>Precio: ${v.dailyPrice}€</p>
                </li>
            `).join("");
        }

        if (this.countElement) this.countElement.textContent = `${vehicles.length} vehículos`;
    }

    show() {
        if (this.$container) this.$container.style.display = "block";
    }

    hide() {
        if (this.$container) this.$container.style.display = "none";
    }
}