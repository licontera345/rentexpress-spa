const VehicleDetailView = {
    container: "#modal-body",

    render(vehicle) {
        const c = document.querySelector(this.container);
        if (!c) return;

        c.innerHTML = `
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
};

export default VehicleDetailView;
