const SearchVehicleView = {

    container: "#search-panel",
    render: function (headquarters, categories) {
        const container = document.querySelector(this.container);
        if (!container) {
            console.error("Contenedor de búsqueda no encontrado:", this.container);
            return;
        }

        console.log("Renderizando vista de búsqueda con", headquarters?.length, "sedes y", categories?.length, "categorías");

        const html = `
            <div class="search-wrapper">
                <div class="search-fields">
                    <!-- Lugar de recogida -->
                    <div class="search-field" id="pickup-hq-field">
                        <label class="field-label">
                            Lugar de recogida
                        </label>
                        <select id="pickup-headquarters" class="field-select" required>
                            <option value="">Seleccionar sede</option>
                            ${headquarters.map(hq => `
                                <option value="${hq.id}" 
                                    data-name="${hq.name}"
                                    data-street="${hq.address?.street || ''}"
                                    data-number="${hq.address?.number || ''}"
                                    data-city="${hq.address?.city?.name || ''}"
                                    data-province="${hq.address?.city?.province?.name || ''}"
                                    data-postal="${hq.address?.postalCode || ''}"
                                    data-phone="${hq.phoneNumber || ''}">
                                    ${hq.name} - ${hq.address?.city?.name || ''}
                                </option>
                            `).join('')}
                        </select>
                        <div id="pickup-hq-details" class="hq-details" style="display: none;"></div>
                    </div>

                    <!-- Lugar de devolución -->
                    <div class="search-field" id="return-hq-field">
                        <label class="field-label">
                            Lugar de devolución
                        </label>
                        <select id="return-headquarters" class="field-select" required>
                            <option value="">Seleccionar sede</option>
                            ${headquarters.map(hq => `
                                <option value="${hq.id}"
                                    data-name="${hq.name}"
                                    data-street="${hq.address?.street || ''}"
                                    data-number="${hq.address?.number || ''}"
                                    data-city="${hq.address?.city?.name || ''}"
                                    data-province="${hq.address?.city?.province?.name || ''}"
                                    data-postal="${hq.address?.postalCode || ''}"
                                    data-phone="${hq.phoneNumber || ''}">
                                    ${hq.name} - ${hq.address?.city?.name || ''}
                                </option>
                            `).join('')}
                        </select>
                        <div id="return-hq-details" class="hq-details" style="display: none;"></div>
                    </div>

                    <!-- Fecha de recogida -->
                    <div class="search-field">
                        <label class="field-label">
                    
                            Fecha de recogida
                        </label>
                        <input type="date" id="pickup-date" class="field-input" required 
                               min="${new Date().toISOString().split('T')[0]}">
                    </div>

                    <!-- Hora de recogida -->
                    <div class="search-field">
                        <label class="field-label">
                           
                            Hora
                        </label>
                        <input type="time" id="pickup-time" class="field-input" value="10:00" required>
                    </div>

                    <!-- Fecha de devolución -->
                    <div class="search-field">
                        <label class="field-label">
                         
                            Fecha de devolución
                        </label>
                        <input type="date" id="return-date" class="field-input" required>
                    </div>

                    <!-- Hora de devolución -->
                    <div class="search-field">
                        <label class="field-label">
                        
                            Hora
                        </label>
                        <input type="time" id="return-time" class="field-input" value="10:00" required>
                    </div>

                    <!-- Categoría (opcional) -->
                    <div class="search-field">
                        <label class="field-label">
                           
                            Categoría
                        </label>
                        <select id="vehicle-category" class="field-select">
                            <option value="">Todas</option>
                            ${categories.map(cat => `
                                <option value="${cat.id}">${cat.name}</option>
                            `).join('')}
                        </select>
                    </div>

                    <!-- Botón de búsqueda -->
                    <div class="search-field search-button-field">
                        <button id="search-vehicles-btn" class="search-button">
                            Buscar
                        </button>
                    </div>
                </div>

                <!-- Mensaje de error -->
                <div id="search-error" class="search-error" style="display: none;"></div>
            </div>
        `;

        container.innerHTML = html;
    },

    /**
     * Muestra los detalles de una sede seleccionada
     */
    showHeadquarterDetails: function (selectElement, detailsContainerId) {
        const selectedOption = selectElement.options[selectElement.selectedIndex];
        const detailsContainer = document.getElementById(detailsContainerId);

        if (!detailsContainer) return;

        if (selectedOption.value) {
            const details = `
                <div class="hq-info">
                    <strong>${selectedOption.dataset.name}</strong><br>
                    ${selectedOption.dataset.street} ${selectedOption.dataset.number}<br>
                    ${selectedOption.dataset.city}, ${selectedOption.dataset.province}<br>
                    CP: ${selectedOption.dataset.postal}
                    ${selectedOption.dataset.phone ? `<br> ${selectedOption.dataset.phone}` : ''}
                </div>
            `;
            detailsContainer.innerHTML = details;
            detailsContainer.style.display = 'block';
        } else {
            detailsContainer.style.display = 'none';
        }
    },

    /**
     * Muestra un mensaje de error
     */
    showError: function (message) {
        const errorContainer = document.getElementById("search-error");
        if (errorContainer) {
            errorContainer.textContent = message;
            errorContainer.style.display = 'block';

            setTimeout(() => {
                errorContainer.style.display = 'none';
            }, 5000);
        }
    },

    /**
     * Limpia el mensaje de error
     */
    clearError: function () {
        const errorContainer = document.getElementById("search-error");
        if (errorContainer) {
            errorContainer.style.display = 'none';
        }
    },

    /**
     * Obtiene los valores del formulario de búsqueda
     */
    getSearchParams: function () {
        return {
            pickupHeadquartersId: document.getElementById("pickup-headquarters")?.value,
            returnHeadquartersId: document.getElementById("return-headquarters")?.value,
            pickupDate: document.getElementById("pickup-date")?.value,
            pickupTime: document.getElementById("pickup-time")?.value,
            returnDate: document.getElementById("return-date")?.value,
            returnTime: document.getElementById("return-time")?.value,
            categoryId: document.getElementById("vehicle-category")?.value
        };
    },

    /**
     * Valida los parámetros de búsqueda
     */
    validateSearchParams: function (params) {
        if (!params.pickupHeadquartersId) {
            this.showError("Por favor selecciona una sede de recogida");
            return false;
        }

        if (!params.returnHeadquartersId) {
            this.showError("Por favor selecciona una sede de devolución");
            return false;
        }

        if (!params.pickupDate) {
            this.showError("Por favor selecciona una fecha de recogida");
            return false;
        }

        if (!params.returnDate) {
            this.showError("Por favor selecciona una fecha de devolución");
            return false;
        }

        // Validar que la fecha de devolución sea posterior a la de recogida
        const pickupDateTime = new Date(`${params.pickupDate}T${params.pickupTime}`);
        const returnDateTime = new Date(`${params.returnDate}T${params.returnTime}`);

        if (returnDateTime <= pickupDateTime) {
            this.showError("La fecha de devolución debe ser posterior a la de recogida");
            return false;
        }

        return true;
    }
};

export default SearchVehicleView;