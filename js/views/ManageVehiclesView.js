export class ManageVehiclesView {
    constructor() {
        this.containerSelector = "#manage-vehicles-view";
        this.$container = document.querySelector(this.containerSelector);
        
        if (!this.$container) {
            this.$container = document.createElement("section");
            this.$container.id = "manage-vehicles-view";
            this.$container.style.display = "none";
            document.querySelector("main").appendChild(this.$container);
        }
    }

    render(vehicles = []) {
        if (!this.$container) return;

        this.$container.innerHTML = `
            <div class="manage-vehicles-container">
                <div class="manage-header">
                    <h2>Gestión de Vehículos</h2>
                    <button id="btn-new-vehicle" class="btn btn-primary">
                        <span>➕</span> Nuevo Vehículo
                    </button>
                </div>

                <div class="vehicles-table-container">
                    <table class="vehicles-table">
                        <thead>
                            <tr>
                                <th>Iniciales</th>
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Año</th>
                                <th>Matrícula</th>
                                <th>Precio/día</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="vehicles-table-body">
                            ${this.renderVehiclesRows(vehicles)}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    renderVehiclesRows(vehicles) {
        if (!vehicles || vehicles.length === 0) {
            return `
                <tr>
                    <td colspan="8" class="empty-state">
                        No hay vehículos registrados
                    </td>
                </tr>
            `;
        }

        return vehicles.map(v => `
            <tr data-vehicle-id="${v.vehicleId}">
                <td>
                    ${this.renderVehicleThumb(v)}
                </td>
                <td>${v.brand}</td>
                <td>${v.model}</td>
                <td>${v.manufactureYear}</td>
                <td>${v.licensePlate}</td>
                <td>${v.dailyPrice}€</td>
                <td>
                    <span class="status-badge ${v.activeStatus ? 'status-active' : 'status-inactive'}">
                        ${v.activeStatus ? 'Activo' : 'Inactivo'}
                    </span>
                </td>
                <td class="actions-cell">
                    <button class="btn-icon btn-edit" data-vehicle-id="${v.vehicleId}" title="Editar">
                        ✏️
                    </button>
                    <button class="btn-icon btn-delete" data-vehicle-id="${v.vehicleId}" title="Eliminar">
                        🗑️
                    </button>
                </td>
            </tr>
        `).join('');
    }

    renderVehicleThumb(vehicle) {
        return `
            <div class="vehicle-thumb-placeholder">
                ${vehicle.brand.charAt(0)}${vehicle.model.charAt(0)}
            </div>
        `;
    }

    renderVehicleForm(vehicle = null) {
        return `
            <form id="vehicle-form" class="modal-form">
                <input type="hidden" name="vehicleId" value="${vehicle?.vehicleId || ''}">
                
                <h3>${vehicle ? 'Editar' : 'Nuevo'} Vehículo</h3>

                <div class="form-row">
                    <div class="form-group">
                        <label>Marca *</label>
                        <input type="text" name="brand" value="${vehicle?.brand || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Modelo *</label>
                        <input type="text" name="model" value="${vehicle?.model || ''}" required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Año de fabricación *</label>
                        <input type="number" name="manufactureYear" value="${vehicle?.manufactureYear || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Matrícula *</label>
                        <input type="text" name="licensePlate" value="${vehicle?.licensePlate || ''}" required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>VIN *</label>
                        <input type="text" name="vinNumber" value="${vehicle?.vinNumber || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Kilometraje actual *</label>
                        <input type="number" name="currentMileage" value="${vehicle?.currentMileage || ''}" required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Precio por día (€) *</label>
                        <input type="number" step="0.01" name="dailyPrice" value="${vehicle?.dailyPrice || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Estado</label>
                        <select name="activeStatus">
                            <option value="true" ${vehicle?.activeStatus !== false ? 'selected' : ''}>Activo</option>
                            <option value="false" ${vehicle?.activeStatus === false ? 'selected' : ''}>Inactivo</option>
                        </select>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="button" id="btn-cancel-form" class="btn btn-secondary">Cancelar</button>
                    <button type="submit" class="btn btn-success">Guardar</button>
                </div>
            </form>
        `;
    }

    getFormData() {
        const form = document.getElementById('vehicle-form');
        if (!form) return null;

        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            if (key === 'vehicleId' && !value) {
                continue;
            }
            if (key === 'activeStatus') {
                data[key] = value === 'true';
            } else if (key === 'manufactureYear' || key === 'currentMileage') {
                data[key] = parseInt(value);
            } else if (key === 'dailyPrice') {
                data[key] = parseFloat(value);
            } else {
                data[key] = value;
            }
        }

        return data;
    }

    showMessage(message, type = 'success') {
        const container = this.$container.querySelector('.manage-vehicles-container');
        if (!container) return;

        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        
        container.insertBefore(messageEl, container.firstChild);

        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }

    show() {
        if (this.$container) this.$container.style.display = "block";
    }

    hide() {
        if (this.$container) this.$container.style.display = "none";
    }
}