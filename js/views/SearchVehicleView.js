const SearchVehicleView = {
    container: "#search-panel",

    render(headquarters) {
        const c = document.querySelector(this.container);
        if (!c) return;

        const options = headquarters.map(hq => {
            const addr = hq.addresses?.[0] || {};
            return `
                <option value="${hq.id}"
                    data-name="${hq.name}"
                    data-street="${addr.street}"
                    data-number="${addr.number}"
                    data-city="${hq.city?.cityName}"
                    data-province="${hq.province?.provinceName}">
                    ${hq.name}
                </option>
            `;
        }).join("");

        c.innerHTML = `
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
    },

    showHeadquarterDetails(select, detailsId) {
        const opt = select.options[select.selectedIndex];
        const d = document.getElementById(detailsId);
        if (!d) return;

        if (!opt.value) {
            d.innerHTML = "";
            return;
        }

        d.innerHTML = `
            <strong>${opt.dataset.name}</strong><br>
            ${opt.dataset.street} ${opt.dataset.number}<br>
            ${opt.dataset.city}, ${opt.dataset.province}
        `;
    },

    getSearchParams() {
        return {
            pickupHeadquartersId: document.getElementById("pickup-headquarters").value,
            returnHeadquartersId: document.getElementById("return-headquarters").value,
            pickupDate: document.getElementById("pickup-date").value,
            pickupTime: document.getElementById("pickup-time").value,
            returnDate: document.getElementById("return-date").value,
            returnTime: document.getElementById("return-time").value
        };
    }
};

export default SearchVehicleView;