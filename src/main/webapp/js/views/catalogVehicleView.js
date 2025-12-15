const CatalogVehicleView = {

    container: "#vehicle-list",
    count: "#vehicle-count",
    status: "#catalog-status",
    section: "#catalog-section",

    render(vehicles) {
        const container = document.querySelector(this.container);
        const count = document.querySelector(this.count);
        const status = document.querySelector(this.status);
        const section = document.querySelector(this.section);

        if (!container || !count || !status) {
            console.error("Contenedores del catálogo no encontrados");
            return;
        }

        // Mostrar la sección del catálogo
        if (section) {
            section.style.display = 'block';
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
                const price = v.dailyPrice || '';
                const year = v.manufactureYear || '';
                const mileage = v.currentMileage || 0;
                
                // Obtener la sede correctamente (es un array según el JSON)
                let headquartersName = '';
                if (v.currentHeadquarters && Array.isArray(v.currentHeadquarters) && v.currentHeadquarters.length > 0) {
                    headquartersName = v.currentHeadquarters[0].name || '';
                }
                
                if (!vehicleId) {
                    console.warn("Vehículo sin ID:", v);
                    continue;
                }
                
                let name = "";

                if (brand && model) {
                    name = `${brand} ${model}`;
                } else if (brand) {
                    name = brand;
                } else if (model) {
                    name = model;
                } else {
                    name = "Vehículo";
                }

                html += `
                    <li class='catalog-item' data-vehicle-id='${vehicleId}'>
                        <div class="vehicle-card">
                            <div class="vehicle-header">
                                <h3 class="vehicle-name">${name}</h3>
                                <span class="vehicle-year">${year}</span>
                            </div>
                            <div class="vehicle-info">
                                <p><strong>Matrícula:</strong> ${plate}</p>
                                <p><strong>Kilometraje:</strong> ${mileage.toLocaleString()} km</p>
                                ${headquartersName ? `<p><strong>Sede:</strong> ${headquartersName}</p>` : ''}
                            </div>
                            <div class="vehicle-price">
                                <span class="price-label">Precio/día:</span>
                                <span class="price-value">${price}€</span>
                            </div>
                        </div>
                    </li>
                `;
            }

            container.innerHTML = html;
            count.textContent = `${vehicles.length} vehículo${vehicles.length !== 1 ? 's' : ''} disponible${vehicles.length !== 1 ? 's' : ''}`;
            status.textContent = "";

        } else {
            console.warn("No hay vehículos para mostrar");
            this.renderEmpty("No se encontraron vehículos disponibles con los criterios seleccionados.");
        }
    },

    /**
     * Renderiza un mensaje cuando no hay vehículos
     */
    renderEmpty(message) {
        const container = document.querySelector(this.container);
        const count = document.querySelector(this.count);
        const status = document.querySelector(this.status);
        const section = document.querySelector(this.section);

        // Mostrar la sección
        if (section) {
            section.style.display = 'block';
        }

        if (container) {
            container.innerHTML = `<li class='catalog-empty'>${message}</li>`;
        }
        if (count) {
            count.textContent = "0 vehículos disponibles";
        }
        if (status) {
            status.textContent = "";
        }
    },

    /**
     * Renderiza un mensaje de error
     */
    renderError(message) {
        const container = document.querySelector(this.container);
        const count = document.querySelector(this.count);
        const status = document.querySelector(this.status);
        const section = document.querySelector(this.section);

        // Mostrar la sección
        if (section) {
            section.style.display = 'block';
        }

        if (container) {
            container.innerHTML = `<li class='catalog-error'>${message}</li>`;
        }
        if (count) {
            count.textContent = "";
        }
        if (status) {
            status.textContent = message;
            status.style.color = "red";
        }
    },

    /**
     * Oculta el catálogo
     */
    hide() {
        const section = document.querySelector(this.section);
        if (section) {
            section.style.display = 'none';
        }
    },

    /**
     * Actualiza solo el contador de vehículos
     */
    updateCount(count) {
        const countElement = document.querySelector(this.count);
        if (countElement) {
            countElement.textContent = `${count} vehículo${count !== 1 ? 's' : ''} disponible${count !== 1 ? 's' : ''}`;
        }
    }
};

export default CatalogVehicleView;