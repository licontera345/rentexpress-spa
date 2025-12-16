const CatalogVehicleView = {
    render(vehicles) {
        document.querySelector("#catalog-section").style.display = "block";
        const container = document.querySelector("#vehicle-list");

        if (!vehicles?.length) {
            container.innerHTML = `<li>No hay vehículos</li>`;
            document.querySelector("#vehicle-count").textContent = "0 vehículos";
            return;
        }

        container.innerHTML = vehicles.map(v => `
            <li class="catalog-item" data-vehicle-id="${v.vehicleId}">
                <h3>${v.brand} ${v.model} (${v.manufactureYear})</h3>
                <p>Matrícula: ${v.licensePlate}</p>
                <p>KM: ${v.currentMileage}</p>
                <p>Precio: ${v.dailyPrice}€</p>
            </li>
        `).join("");

        document.querySelector("#vehicle-count").textContent = `${vehicles.length} vehículos`;
    },

    hide() {
        document.querySelector("#catalog-section").style.display = "none";
    }
};

export default CatalogVehicleView;