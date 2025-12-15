const VehicleDetailView = {
    container: "#modal-body",

    render(vehicle) {
        const c = document.querySelector(this.container);
        if (!c) return;

        // Extraer datos de forma segura
        const brand = vehicle.brand || 'N/A';
        const model = vehicle.model || 'N/A';
        const licensePlate = vehicle.licensePlate || 'N/A';
        const year = vehicle.manufactureYear || 'N/A';
        const price = vehicle.dailyPrice || 'N/A';
        const vin = vehicle.vinNumber || 'N/A';
        const mileage = vehicle.currentMileage || 'N/A';
        
        // Estado del vehículo
        let status = 'N/A';
        if (vehicle.vehicleStatus && vehicle.vehicleStatus.length > 0) {
            status = vehicle.vehicleStatus[0].statusName || 'N/A';
        }
        
        // Categoría
        let category = 'N/A';
        if (vehicle.vehicleCategory && vehicle.vehicleCategory.length > 0) {
            category = vehicle.vehicleCategory[0].categoryName || 'N/A';
        }
        
        // Sede actual
        let headquarters = 'N/A';
        let headquartersAddress = '';
        if (vehicle.currentHeadquarters && vehicle.currentHeadquarters.length > 0) {
            const hq = vehicle.currentHeadquarters[0];
            headquarters = hq.name || 'N/A';
            
            if (hq.addresses && hq.addresses.length > 0) {
                const addr = hq.addresses[0];
                headquartersAddress = `${addr.street || ''} ${addr.number || ''}, ${addr.cityName || ''}, ${addr.provinceName || ''}`;
            }
        }

        const html = `
            <div class="vehicle-detail">
                <div class="detail-section">
                    <h3>Información General</h3>
                    <p><strong>Marca:</strong> ${brand}</p>
                    <p><strong>Modelo:</strong> ${model}</p>
                    <p><strong>Matrícula:</strong> ${licensePlate}</p>
                    <p><strong>VIN:</strong> ${vin}</p>
                    <p><strong>Año:</strong> ${year}</p>
                    <p><strong>Kilometraje:</strong> ${mileage} km</p>
                </div>
                
                <div class="detail-section">
                    <h3>Detalles de Alquiler</h3>
                    <p><strong>Precio por día:</strong> ${price}€</p>
                    <p><strong>Categoría:</strong> ${category}</p>
                    <p><strong>Estado:</strong> ${status}</p>
                </div>
                
                <div class="detail-section">
                    <h3>Ubicación</h3>
                    <p><strong>Sede:</strong> ${headquarters}</p>
                    ${headquartersAddress ? `<p><strong>Dirección:</strong> ${headquartersAddress}</p>` : ''}
                </div>
            </div>
        `;
        
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