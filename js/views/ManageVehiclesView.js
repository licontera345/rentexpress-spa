import ImageService from "../services/ImageService.js";

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
        this.vehicleImages = new Map();
    }

    async render(vehicles = []) {
        if (!this.$container) return;

        // Cargar thumbnails usando caché optimizado
        await this.loadVehicleImages(vehicles);

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

    async loadVehicleImages(vehicles) {
        this.vehicleImages.clear();

        await Promise.all(
            vehicles.map(async (v) => {
                try {
                    const thumb = await ImageService.getVehicleThumbnail(v.vehicleId);
                    if (thumb) {
                        this.vehicleImages.set(v.vehicleId, thumb);
                    }
                } catch (error) {
                    console.warn(`No thumbnail for vehicle ${v.vehicleId}`);
                }
            })
        );
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

    renderVehicleThumb(vehicle) {
        const imageName = this.vehicleImages.get(vehicle.vehicleId);
        
        if (imageName) {
            const imageUrl = ImageService.getVehicleImageUrl(vehicle.vehicleId, imageName);
            return `
                <img src="${imageUrl}" 
                     alt="${vehicle.brand} ${vehicle.model}"
                     class="vehicle-thumb"
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="vehicle-thumb-placeholder" style="display: none;">
                    ${vehicle.brand.charAt(0)}${vehicle.model.charAt(0)}
                </div>
            `;
        } else {
            return `
                <div class="vehicle-thumb-placeholder">
                    ${vehicle.brand.charAt(0)}${vehicle.model.charAt(0)}
                </div>
            `;
        }
    }

    // ... el resto del archivo (renderVehicleForm, renderImageGallery, etc.) se mantiene exactamente igual ...
    renderVehicleForm(vehicle = null) { /* sin cambios */ }
    renderImageGallery(vehicleId, vehicle, images = []) { /* sin cambios */ }
    renderImagesGrid(vehicleId, images) { /* sin cambios */ }
    getFormData() { /* sin cambios */ }
    showMessage(message, type = 'success') { /* sin cambios */ }
    show() { if (this.$container) this.$container.style.display = "block"; }
    hide() { if (this.$container) this.$container.style.display = "none"; }
}