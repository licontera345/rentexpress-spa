/**
 * Vista de gestión de vehículos
 * SOLO renderiza HTML, NO tiene lógica de negocio
 */
export class ManageVehiclesView {
    constructor() {
        this.containerSelector = "#manage-vehicles-view";
        this.$container = document.querySelector(this.containerSelector);
        
        // Crear el contenedor si no existe
        if (!this.$container) {
            this.$container = document.createElement("section");
            this.$container.id = "manage-vehicles-view";
            this.$container.style.display = "none";
            const main = document.querySelector("main");
            if (main) {
                main.appendChild(this.$container);
            }
        }
    }

    /**
     * Renderizar la vista de gestión de vehículos
     * @param {Object} data - { vehicles: [] }
     */
    render(data = {}) {
        if (!this.$container) return;

        const { vehicles = [] } = data;

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

    /**
     * Renderizar filas de la tabla
     */
    renderVehiclesRows(vehicles) {
        if (!vehicles || vehicles.length === 0) {
            return `
                <tr>
                    <td colspan="8" class="empty-state">
                        No hay vehículos registrados. Haz clic en "Nuevo Vehículo" para agregar uno.
                    </td>
                </tr>
            `;
        }

        return vehicles.map(v => this.renderVehicleRow(v)).join('');
    }

    /**
     * Renderizar una fila de vehículo
     */
    renderVehicleRow(vehicle) {
        return `
            <tr data-vehicle-id="${vehicle.vehicleId}">
                <td>${this.renderVehicleThumb(vehicle)}</td>
                <td>${vehicle.brand}</td>
                <td>${vehicle.model}</td>
                <td>${vehicle.manufactureYear}</td>
                <td>${vehicle.licensePlate}</td>
                <td>${vehicle.dailyPrice}€</td>
                <td>
                    <span class="status-badge ${vehicle.activeStatus ? 'status-active' : 'status-inactive'}">
                        ${vehicle.activeStatus ? 'Activo' : 'Inactivo'}
                    </span>
                </td>
                <td class="actions-cell">
                    <button class="btn-icon btn-edit" data-vehicle-id="${vehicle.vehicleId}" title="Editar">
                        ✏️
                    </button>
                    <button class="btn-icon btn-delete" data-vehicle-id="${vehicle.vehicleId}" title="Eliminar">
                        🗑️
                    </button>
                </td>
            </tr>
        `;
    }

    /**
     * Renderizar thumbnail del vehículo
     */
    renderVehicleThumb(vehicle) {
        return `
            <div class="vehicle-thumb-placeholder">
                ${vehicle.brand.charAt(0)}${vehicle.model.charAt(0)}
            </div>
        `;
    }

    /**
     * Renderizar formulario de vehículo
     */
    renderVehicleForm(vehicle = null) {
        return `
            <form id="vehicle-form" class="modal-form">
                <input type="hidden" name="vehicleId" value="${vehicle?.vehicleId || ''}">
                
                <h3>${vehicle ? 'Editar' : 'Nuevo'} Vehículo</h3>

                <div class="form-row">
                    <div class="form-group">
                        <label>Marca *</label>
                        <input type="text" name="brand" value="${vehicle?.brand || ''}" required placeholder="Ej: Toyota">
                    </div>
                    <div class="form-group">
                        <label>Modelo *</label>
                        <input type="text" name="model" value="${vehicle?.model || ''}" required placeholder="Ej: Corolla">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Año de fabricación *</label>
                        <input type="number" name="manufactureYear" value="${vehicle?.manufactureYear || ''}" 
                               required min="1900" max="${new Date().getFullYear() + 1}" placeholder="2024">
                    </div>
                    <div class="form-group">
                        <label>Matrícula *</label>
                        <input type="text" name="licensePlate" value="${vehicle?.licensePlate || ''}" 
                               required placeholder="1234ABC">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>VIN (Número de bastidor) *</label>
                        <input type="text" name="vinNumber" value="${vehicle?.vinNumber || ''}" 
                               required placeholder="1HGBH41JXMN109186">
                    </div>
                    <div class="form-group">
                        <label>Kilometraje actual *</label>
                        <input type="number" name="currentMileage" value="${vehicle?.currentMileage || ''}" 
                               required min="0" placeholder="50000">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label>Precio por día (€) *</label>
                        <input type="number" step="0.01" name="dailyPrice" value="${vehicle?.dailyPrice || ''}" 
                               required min="0" placeholder="45.00">
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
                    <button type="submit" class="btn btn-success">
                        ${vehicle ? '💾 Actualizar' : '➕ Crear'} Vehículo
                    </button>
                </div>
            </form>
        `;
    }

    /**
     * Obtener datos del formulario
     */
    getFormData() {
        const form = document.getElementById('vehicle-form');
        if (!form) return null;

        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            // Omitir vehicleId si está vacío (nuevo vehículo)
            if (key === 'vehicleId' && !value) {
                continue;
            }

            // Convertir tipos
            if (key === 'activeStatus') {
                data[key] = value === 'true';
            } else if (key === 'manufactureYear' || key === 'currentMileage') {
                data[key] = parseInt(value, 10);
            } else if (key === 'dailyPrice') {
                data[key] = parseFloat(value);
            } else {
                data[key] = value.trim();
            }
        }

        return data;
    }

    /**
     * Mostrar mensaje de feedback
     */
    showMessage(message, type = 'success') {
        const container = this.$container.querySelector('.manage-vehicles-container');
        if (!container) return;

        // Eliminar mensajes anteriores
        const existingMessages = container.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Crear nuevo mensaje
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        
        container.insertBefore(messageEl, container.firstChild);

        // Auto-eliminar después de 4 segundos
        setTimeout(() => {
            messageEl.remove();
        }, 4000);
    }

    show() {
        if (this.$container) {
            this.$container.style.display = "block";
        }
    }

    hide() {
        if (this.$container) {
            this.$container.style.display = "none";
        }
    }
}