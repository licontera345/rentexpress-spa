const CatalogVehicleView = {

    container: "#vehicle-list",
    count: "#vehicle-count",
    status: "#catalog-status",

    render(vehicles) {
        const container = document.querySelector(this.container);
        const count = document.querySelector(this.count);
        const status = document.querySelector(this.status);

        if (!container || !count || !status) {
            console.error("Contenedores del catálogo no encontrados");
            return;
        }

        let html = "";

        if (Array.isArray(vehicles) && vehicles.length > 0) {
            console.log(`Renderizando ${vehicles.length} vehículos`);

            for (let i = 0; i < vehicles.length; i++) {
                const v = vehicles[i];

                const brand = v.brand || '';
                const model = v.model || '';
                const plate = v.licensePlate || '';
                const vehicleId = v.vehicleId;
                
                if (!vehicleId) {
                    console.warn("Vehículo sin ID:", v);
                    continue;
                }
                
                let name = "";

                if (brand && model && plate) {
                    name = `${brand} ${model} (${plate})`;
                } else if (brand && model) {
                    name = `${brand} ${model}`;
                } else if (brand) {
                    name = brand;
                } else if (model) {
                    name = model;
                } else if (plate) {
                    name = `Vehículo (${plate})`;
                } else {
                    name = "Vehículo sin nombre";
                }

                html += `<li class='catalog-item' data-vehicle-id='${vehicleId}'>${name}</li>`;
            }

            container.innerHTML = html;
            count.textContent = `Vehículos encontrados: ${vehicles.length}`;
            status.textContent = "";

        } else {
            console.warn("No hay vehículos para mostrar");
            container.innerHTML = "<li class='catalog-empty'>No se encontraron vehículos.</li>";
            count.textContent = "";
            status.textContent = "";
        }
    },

    renderLoading() {
        const container = document.querySelector(this.container);
        const count = document.querySelector(this.count);
        const status = document.querySelector(this.status);

        if (!container || !count || !status) return;

        status.textContent = "Cargando catálogo...";
        container.innerHTML = "";
        count.textContent = "";
    },

    renderError(msg) {
        const container = document.querySelector(this.container);
        const count = document.querySelector(this.count);
        const status = document.querySelector(this.status);

        if (!container || !count || !status) return;

        status.textContent = msg;
        status.style.color = "red";
        container.innerHTML = "";
        count.textContent = "";
    }
};

export default CatalogVehicleView;