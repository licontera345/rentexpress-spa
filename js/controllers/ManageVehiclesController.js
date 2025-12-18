import VehicleService from "../services/VehicleService.js";
import sessionController from "./SessionController.js";

/**
 * Controlador para gestión de vehículos (CRUD)
 * Solo para empleados
 */
export class ManageVehiclesController {
    constructor(view, router) {
        this.view = view;
        this.router = router;
        this.vehicles = [];
        this.currentVehicle = null;
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
            await this.init(); 
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
            await this.init();
        } catch (error) {
            console.error("Error eliminando vehículo:", error);
            this.view.showMessage("Error al eliminar el vehículo", "error");
        }
    }

    closeModal() {
        if (this.modal && this.modal.parentNode) {
            this.modal.remove();
        }
        this.modal = null;
        
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