const VehicleDetailView = {
    container: "#modal-body",

    render(vehicle) {
        const c = document.querySelector(this.container);
        if (!c) return;

        const brand = vehicle.brand;
        const model = vehicle.model;
        const licensePlate = vehicle.licensePlate;
        const year = vehicle.manufactureYear;
        const price = vehicle.dailyPrice;
        const vin = vehicle.vinNumber;
        const mileage = vehicle.currentMileage ;
    

        const html = `<div class="vehicle-detail">
                  <div class="detail-section">
                    <h3>Información General</h3>
                    <p><strong>Marca:</strong> ${brand}</p>
                    <p><strong>Modelo:</strong> ${model}</p>
                    <p><strong>Matrícula:</strong> ${licensePlate}</p>
                    <p><strong>VIN:</strong> ${vin}</p>
                    <p><strong>Año:</strong> ${year}</p>
                    <p><strong>Kilometraje:</strong> ${mileage} km</p>
                    <p><strong>Precio por día:</strong> ${price}€</p>
                </div>
            </div>`;
        
        c.innerHTML = html;
    },

    renderLoading() {
        const c = document.querySelector(this.container);
        if (!c) return;
        c.innerHTML = "<p class='loading'>Cargando detalles del vehículo...</p>";
    },

    renderError(msg) {
        const c = document.querySelector(this.container);
        if (!c) return;
        c.innerHTML = `<p class="error">${msg}</p>`;
    }
};

export default VehicleDetailView;