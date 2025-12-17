/**
 * Vista para gestionar vehículos (CRUD completo con imágenes)
 * Solo para empleados
 */
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
                                <th>Imagen</th>
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
                    <div class="vehicle-thumb-placeholder">
                        ${v.brand.charAt(0)}${v.model.charAt(0)}
                    </div>
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
                    <button class="btn-icon btn-images" data-vehicle-id="${v.vehicleId}" title="Gestionar imágenes">
                        🖼️
                    </button>
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

    renderVehicleForm(vehicle = null) {
        const isEdit = vehicle !== null;
        const title = isEdit ? 'Editar Vehículo' : 'Nuevo Vehículo';

        return `
            <div class="modal-form">
                <h3>${title}</h3>
                <form id="vehicle-form">
                    <input type="hidden" id="vehicle-id" value="${vehicle?.vehicleId || ''}">
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="brand">Marca *</label>
                            <input type="text" id="brand" required value="${vehicle?.brand || ''}">
                        </div>
                        <div class="form-group">
                            <label for="model">Modelo *</label>
                            <input type="text" id="model" required value="${vehicle?.model || ''}">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="manufactureYear">Año de fabricación *</label>
                            <input type="number" id="manufactureYear" required 
                                   min="1900" max="2099" value="${vehicle?.manufactureYear || ''}">
                        </div>
                        <div class="form-group">
                            <label for="licensePlate">Matrícula *</label>
                            <input type="text" id="licensePlate" required value="${vehicle?.licensePlate || ''}">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="vinNumber">VIN *</label>
                            <input type="text" id="vinNumber" required value="${vehicle?.vinNumber || ''}">
                        </div>
                        <div class="form-group">
                            <label for="currentMileage">Kilometraje *</label>
                            <input type="number" id="currentMileage" required 
                                   min="0" value="${vehicle?.currentMileage || ''}">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="dailyPrice">Precio por día (€) *</label>
                            <input type="number" id="dailyPrice" required 
                                   min="0" step="0.01" value="${vehicle?.dailyPrice || ''}">
                        </div>
                        <div class="form-group">
                            <label for="activeStatus">Estado</label>
                            <select id="activeStatus">
                                <option value="true" ${vehicle?.activeStatus ? 'selected' : ''}>Activo</option>
                                <option value="false" ${!vehicle?.activeStatus && vehicle ? 'selected' : ''}>Inactivo</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button type="button" id="btn-cancel-form" class="btn btn-secondary">
                            Cancelar
                        </button>
                        <button type="submit" class="btn btn-primary">
                            ${isEdit ? 'Guardar Cambios' : 'Crear Vehículo'}
                        </button>
                    </div>
                </form>
            </div>
        `;
    }

    renderImageGallery(vehicleId, vehicle, images = []) {
        return `
            <div class="image-gallery-container">
                <h3>Imágenes de ${vehicle.brand} ${vehicle.model}</h3>
                
                <div class="upload-section">
                    <input type="file" id="image-file-input" accept="image/*" style="display: none;">
                    <button id="btn-select-image" class="btn btn-primary">
                        📁 Seleccionar Imagen
                    </button>
                    <button id="btn-upload-image" class="btn btn-success" style="display: none;">
                        ⬆️ Subir Imagen
                    </button>
                    <span id="selected-file-name"></span>
                </div>

                <div class="images-grid" id="images-grid">
                    ${images.length === 0 ? 
                        '<p class="no-images">No hay imágenes para este vehículo</p>' : 
                        this.renderImagesGrid(vehicleId, images)
                    }
                </div>

                <div class="form-actions">
                    <button id="btn-close-gallery" class="btn btn-secondary">Cerrar</button>
                </div>
            </div>
        `;
    }

    renderImagesGrid(vehicleId, images) {
        return images.map(imageName => `
            <div class="image-card" data-image-name="${imageName}">
                <img src="${this.getImageUrl(vehicleId, imageName)}" 
                     alt="${imageName}"
                     class="gallery-image">
                <div class="image-actions">
                    <button class="btn-icon-small btn-delete-image" 
                            data-vehicle-id="${vehicleId}"
                            data-image-name="${imageName}"
                            title="Eliminar">
                        🗑️
                    </button>
                </div>
                <p class="image-name">${imageName}</p>
            </div>
        `).join('');
    }

    getImageUrl(vehicleId, imageName) {
        // Usa la función del ImageService
        return `${window.location.origin}/rentexpress-rest-api/api/open/file/vehicle/${vehicleId}/${imageName}`;
    }

    getFormData() {
        return {
            vehicleId: document.getElementById('vehicle-id')?.value || null,
            brand: document.getElementById('brand')?.value.trim(),
            model: document.getElementById('model')?.value.trim(),
            manufactureYear: parseInt(document.getElementById('manufactureYear')?.value),
            licensePlate: document.getElementById('licensePlate')?.value.trim(),
            vinNumber: document.getElementById('vinNumber')?.value.trim(),
            currentMileage: parseInt(document.getElementById('currentMileage')?.value),
            dailyPrice: parseFloat(document.getElementById('dailyPrice')?.value),
            activeStatus: document.getElementById('activeStatus')?.value === 'true'
        };
    }

    showMessage(message, type = 'success') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = message;
        
        this.$container.insertBefore(messageDiv, this.$container.firstChild);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    show() {
        if (this.$container) this.$container.style.display = "block";
    }

    hide() {
        if (this.$container) this.$container.style.display = "none";
    }
}