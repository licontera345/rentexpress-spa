import VehicleService from "../services/VehicleService.js";
import ImageService from "../services/ImageService.js";
import sessionController from "./SessionController.js";

/**
 * Controlador para gestión de vehículos (CRUD + Imágenes)
 * Solo para empleados
 */
export class ManageVehiclesController {
    constructor(view, router) {
        this.view = view;
        this.router = router;
        this.vehicles = [];
        this.currentVehicle = null;
        this.selectedFile = null;
        this.modal = null;
    }

    async init() {
        await this.loadVehicles();
        this.view.render(this.vehicles);
        this.setupEventListeners();
    }

    async loadVehicles() {
        try {
            const token = sessionController.getToken();
            const response = await VehicleService.search({
                pageNumber: 1,
                pageSize: 100
            });
            this.vehicles = response.results || [];
        } catch (error) {
            console.error("Error cargando vehículos:", error);
            this.view.showMessage("Error al cargar vehículos", "error");
            this.vehicles = [];
        }
    }

    setupEventListeners() {
        // Botón nuevo vehículo
        this.view.$container.addEventListener('click', async (e) => {
            // Nuevo vehículo
            if (e.target.id === 'btn-new-vehicle' || e.target.closest('#btn-new-vehicle')) {
                this.showVehicleForm();
            }

            // Editar vehículo
            if (e.target.classList.contains('btn-edit')) {
                const vehicleId = e.target.dataset.vehicleId;
                await this.showEditForm(vehicleId);
            }

            // Eliminar vehículo
            if (e.target.classList.contains('btn-delete')) {
                const vehicleId = e.target.dataset.vehicleId;
                await this.deleteVehicle(vehicleId);
            }

            // Gestionar imágenes
            if (e.target.classList.contains('btn-images')) {
                const vehicleId = e.target.dataset.vehicleId;
                await this.showImageGallery(vehicleId);
            }
        });

        // Submit del formulario
        this.view.$container.addEventListener('submit', async (e) => {
            if (e.target.id === 'vehicle-form') {
                e.preventDefault();
                await this.saveVehicle();
            }
        });
    }

    showVehicleForm(vehicle = null) {
        this.currentVehicle = vehicle;
        
        // Limpiar modales anteriores
        this.closeModal();
        
        // Crear modal
        this.modal = document.createElement('div');
        this.modal.className = 'modal active';
        this.modal.innerHTML = `
            <div class="modal-dialog modal-large">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${vehicle ? 'Editar' : 'Nuevo'} Vehículo</h5>
                        <button type="button" class="btn-close" aria-label="Cerrar">×</button>
                    </div>
                    <div class="modal-body">
                        ${this.view.renderVehicleForm(vehicle)}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(this.modal);

        // Event listeners del modal
        this.modal.querySelector('.btn-close').addEventListener('click', () => {
            this.closeModal();
        });

        this.modal.querySelector('#btn-cancel-form')?.addEventListener('click', () => {
            this.closeModal();
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    async showEditForm(vehicleId) {
        try {
            const vehicle = await VehicleService.findById(vehicleId);
            this.showVehicleForm(vehicle);
        } catch (error) {
            console.error("Error cargando vehículo:", error);
            this.view.showMessage("Error al cargar el vehículo", "error");
        }
    }

    async saveVehicle() {
        const formData = this.view.getFormData();
        const token = sessionController.getToken();

        try {
            if (formData.vehicleId) {
                // Actualizar
                await VehicleService.update(formData.vehicleId, formData, token);
                this.view.showMessage("Vehículo actualizado correctamente", "success");
            } else {
                // Crear nuevo
                delete formData.vehicleId;
                await VehicleService.create(formData, token);
                this.view.showMessage("Vehículo creado correctamente", "success");
            }

            this.closeModal();
            await this.init(); // Recargar lista
        } catch (error) {
            console.error("Error guardando vehículo:", error);
            this.view.showMessage("Error al guardar el vehículo", "error");
        }
    }

    async deleteVehicle(vehicleId) {
        if (!confirm('¿Estás seguro de eliminar este vehículo?')) {
            return;
        }

        const token = sessionController.getToken();

        try {
            await VehicleService.delete(vehicleId, token);
            this.view.showMessage("Vehículo eliminado correctamente", "success");
            await this.init(); // Recargar lista
        } catch (error) {
            console.error("Error eliminando vehículo:", error);
            this.view.showMessage("Error al eliminar el vehículo", "error");
        }
    }

    async showImageGallery(vehicleId) {
        try {
            const vehicle = await VehicleService.findById(vehicleId);
            
            // Intentar listar imágenes, si falla usar array vacío
            let images = [];
            try {
                images = await ImageService.listVehicleImages(vehicleId);
            } catch (imgError) {
                console.warn("No se pudieron cargar las imágenes (puede que no existan):", imgError);
                // Continuar con array vacío
            }

            // Limpiar modales anteriores
            this.closeModal();

            // Crear modal de galería
            this.modal = document.createElement('div');
            this.modal.className = 'modal active';
            this.modal.innerHTML = `
                <div class="modal-dialog modal-large">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Gestionar Imágenes</h5>
                            <button type="button" class="btn-close" aria-label="Cerrar">×</button>
                        </div>
                        <div class="modal-body">
                            ${this.view.renderImageGallery(vehicleId, vehicle, images)}
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(this.modal);

            this.setupImageGalleryListeners(vehicleId);
        } catch (error) {
            console.error("Error cargando vehículo:", error);
            this.view.showMessage("Error al cargar el vehículo", "error");
        }
    }

    setupImageGalleryListeners(vehicleId) {
        const fileInput = this.modal.querySelector('#image-file-input');
        const btnSelect = this.modal.querySelector('#btn-select-image');
        const btnUpload = this.modal.querySelector('#btn-upload-image');
        const fileNameSpan = this.modal.querySelector('#selected-file-name');

        // Cerrar modal
        this.modal.querySelector('.btn-close').addEventListener('click', () => {
            this.closeModal();
        });

        this.modal.querySelector('#btn-close-gallery')?.addEventListener('click', () => {
            this.closeModal();
        });

        // Seleccionar archivo
        btnSelect.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.selectedFile = file;
                fileNameSpan.textContent = file.name;
                btnUpload.style.display = 'inline-block';
            }
        });

        // Subir imagen
        btnUpload.addEventListener('click', async () => {
            if (!this.selectedFile) return;

            try {
                await ImageService.uploadVehicleImage(vehicleId, this.selectedFile);
                this.view.showMessage("Imagen subida correctamente", "success");
                
                // Recargar galería
                this.closeModal();
                await this.showImageGallery(vehicleId);
            } catch (error) {
                console.error("Error subiendo imagen:", error);
                this.view.showMessage("Error al subir la imagen", "error");
            }
        });

        // Eliminar imagen
        this.modal.addEventListener('click', async (e) => {
            if (e.target.classList.contains('btn-delete-image')) {
                const imageName = e.target.dataset.imageName;
                
                if (!confirm(`¿Eliminar la imagen ${imageName}?`)) {
                    return;
                }

                try {
                    await ImageService.deleteVehicleImage(vehicleId, imageName);
                    this.view.showMessage("Imagen eliminada correctamente", "success");
                    
                    // Recargar galería
                    this.closeModal();
                    setTimeout(() => {
                        this.showImageGallery(vehicleId);
                    }, 100);
                } catch (error) {
                    console.error("Error eliminando imagen:", error);
                    this.view.showMessage("Error al eliminar la imagen", "error");
                }
            }
        });
    }

    closeModal() {
        if (this.modal && this.modal.parentNode) {
            this.modal.remove();
        }
        this.modal = null;
        this.selectedFile = null;
        
        // Limpiar cualquier modal huérfano
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.id !== 'loginModal' && modal.id !== 'vehicleModal') {
                modal.remove();
            }
        });
    }

    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }
}