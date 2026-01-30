/**
 * Vista del panel de búsqueda de vehículos
 * SOLO renderiza HTML, NO tiene lógica de negocio
 */
export class SearchVehicleView {
    constructor() {
        this.containerSelector = "#search-panel";
        this.$container = document.querySelector(this.containerSelector);
    }

    /**
     * Renderizar el panel de búsqueda
     * @param {Object} data - { headquarters: [], categories: [] }
     */
    render(data) {
        if (!this.$container) return;

        const { headquarters = [], categories = [] } = data;

        const hqOptions = headquarters.map(hq => `
            <option value="${hq.id}"
                data-name="${hq.name || ''}"
                data-address-id="${hq.addressId || ''}">
                ${hq.name}
            </option>
        `).join("");

        this.$container.innerHTML = `
            <div class="search-field-wrapper">
                <label class="search-field-label">Lugar de recogida</label>
                <select id="pickup-headquarters">
                    <option value="">Seleccionar</option>
                    ${hqOptions}
                </select>
            </div>

            <div class="search-field-wrapper">
                <label class="search-field-label">Lugar de devolución</label>
                <select id="return-headquarters">
                    <option value="">Seleccionar</option>
                    ${hqOptions}
                </select>
            </div>

            <div class="search-field-wrapper">
                <label class="search-field-label">Fecha de recogida</label>
                <input type="date" id="pickup-date">
            </div>

            <div class="search-field-wrapper small">
                <label class="search-field-label">Hora</label>
                <input type="time" id="pickup-time" value="10:00">
            </div>

            <div class="search-field-wrapper">
                <label class="search-field-label">Fecha de devolución</label>
                <input type="date" id="return-date">
            </div>

            <div class="search-field-wrapper small">
                <label class="search-field-label">Hora</label>
                <input type="time" id="return-time" value="10:00">
            </div>

            <div class="search-field-wrapper button">
                <button id="search-vehicles-btn">BUSCAR</button>
            </div>

            <div id="pickup-hq-details" class="hq-details"></div>
            <div id="return-hq-details" class="hq-details"></div>
        `;
    }

    /**
     * Mostrar detalles de una sede
     */
    showDetails(elementId, data) {
        const element = document.getElementById(elementId);
        if (!element) return;

        const { name, address } = data;

        let html = `<strong>${name}</strong><br>`;

        if (!address) {
            html += "<em>Dirección no disponible</em>";
        } else {
            const addressLine = [address.street, address.number].filter(Boolean).join(" ").trim();
            if (addressLine) html += addressLine + "<br>";

            const locationLine = [address.cityName, address.provinceName].filter(Boolean).join(", ").trim();
            if (locationLine) html += locationLine;

            if (!addressLine && !locationLine) {
                html += "<em>Dirección no disponible</em>";
            }
        }

        element.innerHTML = html;
        element.style.display = "block";
    }

    /**
     * Ocultar detalles de una sede
     */
    hideDetails(elementId) {
        const element = document.getElementById(elementId);
        if (!element) return;

        element.innerHTML = "";
        element.style.display = "none";
    }

    /**
     * Obtener los parámetros de búsqueda del formulario
     */
    getSearchParams() {
        return {
            pickupHeadquartersId: document.getElementById("pickup-headquarters")?.value || "",
            returnHeadquartersId: document.getElementById("return-headquarters")?.value || "",
            pickupDate: document.getElementById("pickup-date")?.value || "",
            pickupTime: document.getElementById("pickup-time")?.value || "",
            returnDate: document.getElementById("return-date")?.value || "",
            returnTime: document.getElementById("return-time")?.value || ""
        };
    }

    show() {
        if (this.$container) {
            this.$container.style.display = "flex";
        }
    }

    hide() {
        if (this.$container) {
            this.$container.style.display = "none";
        }
    }
}