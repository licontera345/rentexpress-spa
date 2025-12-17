export class SearchVehicleView {
    constructor() {
        this.containerSelector = "#search-panel";
        this.$container = document.querySelector(this.containerSelector);
    }

    render(headquarters, categories = []) {
        if (!this.$container) return;

        const options = headquarters.map(hq => {
            const addr = hq.addresses?.[0] || {};
            return `
                <option value="${hq.id}"
                    data-name="${hq.name || ''}"
                    data-street="${addr.street || ''}"
                    data-number="${addr.number || ''}"
                    data-city="${hq.city?.cityName || ''}"
                    data-province="${hq.province?.provinceName || ''}">
                    ${hq.name}
                </option>
            `;
        }).join("");

        this.$container.innerHTML = `
            <div class="search-field-wrapper">
                <label class="search-field-label">Lugar de recogida</label>
                <select id="pickup-headquarters">
                    <option value="">Seleccionar</option>
                    ${options}
                </select>
            </div>

            <div class="search-field-wrapper">
                <label class="search-field-label">Lugar de devolución</label>
                <select id="return-headquarters">
                    <option value="">Seleccionar</option>
                    ${options}
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

            <div id="pickup-hq-details"></div>
            <div id="return-hq-details"></div>
        `;
    }

    showHeadquarterDetails(select, detailsId) {
        const detailsElement = document.getElementById(detailsId);
        if (!detailsElement) return;

        const selectedOption = select.options[select.selectedIndex];

        if (!selectedOption.value) {
            detailsElement.innerHTML = "";
            return;
        }

        detailsElement.innerHTML = `
            <strong>${selectedOption.dataset.name}</strong><br>
            ${selectedOption.dataset.street} ${selectedOption.dataset.number}<br>
            ${selectedOption.dataset.city}, ${selectedOption.dataset.province}
        `;
    }

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

    show() { if (this.$container) this.$container.style.display = "block";
    }

    hide() {
        if (this.$container) this.$container.style.display = "none";
    }
}