import AddressService from "../services/AddressService.js";
import sessionController from "../controllers/SessionController.js";

export class SearchVehicleView {
    constructor() {
        this.containerSelector = "#search-panel";
        this.$container = document.querySelector(this.containerSelector);
    }

    render(headquarters, categories = []) {
        if (!this.$container) return;

        const options = headquarters.map(hq => {
            return `
                <option value="${hq.id}"
                    data-name="${hq.name || ''}"
                    data-address-id="${hq.addressId || ''}">
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

            <div id="pickup-hq-details" class="hq-details"></div>
            <div id="return-hq-details" class="hq-details"></div>
        `;
    }

    async showHeadquarterDetails(select, detailsId) {
        const detailsElement = document.getElementById(detailsId);
        if (!detailsElement) return;

        const hqId = select.value;
        if (!hqId) {
            detailsElement.innerHTML = "";
            detailsElement.style.display = "none";
            return;
        }

        const selectedOption = Array.from(select.options).find(opt => opt.value === hqId);
        if (!selectedOption) return;

        const name = selectedOption.dataset.name || "Sede sin nombre";
        const addressId = selectedOption.dataset.addressId;

        let html = `<strong>${name}</strong><br>`;

        if (!addressId) {
            html += "<em>Dirección no disponible</em>";
        } else {
            // Intentamos cargar la dirección solo si hay token
            const token = sessionController.getToken ? sessionController.getToken() : sessionController.token;
            if (token) {
                try {
                    const addr = await AddressService.findById(addressId, token);

                    const addressLine = [addr.street, addr.number].filter(Boolean).join(" ").trim();
                    if (addressLine) html += addressLine + "<br>";

                    const locationLine = [addr.cityName, addr.provinceName].filter(Boolean).join(", ").trim();
                    if (locationLine) html += locationLine;

                    if (!addressLine && !locationLine) {
                        html += "<em>Dirección no disponible</em>";
                    }
                } catch (e) {
                    console.error("Error al cargar dirección:", e);
                    html += "<em>Error al cargar la dirección</em>";
                }
            } else {
                html += "<em>Inicia sesión como empleado para ver la dirección</em>";
            }
        }

        detailsElement.innerHTML = html;
        detailsElement.style.display = "block";
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

    show() { 
        if (this.$container) this.$container.style.display = "block"; 
    }

    hide() { 
        if (this.$container) this.$container.style.display = "none"; 
    }
}