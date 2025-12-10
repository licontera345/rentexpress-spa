const CatalogVehicleView = {

    container: "#vehicle-list",
    count: "#vehicle-count",
    status: "#catalog-status",

    render(vehicles) {
        const container = document.querySelector(this.container);
        const count = document.querySelector(this.count);
        const status = document.querySelector(this.status);

        if (!container || !count || !status) return;

        let html = "";

        if (Array.isArray(vehicles) && vehicles.length > 0) {

            for (let i = 0; i < vehicles.length; i++) {
                const v = vehicles[i];

                const brand = v.brand;
                const model = v.model;
                const plate = v.licensePlate;
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

                html += `<li class='catalog-item'>${name}</li>`;
            }

            container.innerHTML = html;
            count.textContent = `Vehículos encontrados: ${vehicles.length}`;
            status.textContent = "";

        } else {
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
        container.innerHTML = "";
        count.textContent = "";
    }
};

export default CatalogVehicleView;