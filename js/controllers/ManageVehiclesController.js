import { BaseController } from './BaseController.js';
import VehicleService from "../services/VehicleService.js";
import sessionController from "./SessionController.js";

/**
 * Controlador para gestión de vehículos (CRUD)
 * Solo para empleados
 */
export class ManageVehiclesController extends BaseController {
    constructor(view) {
        super(view);
        this.vehicles = [];
        this.currentVehicle = null;
        this.modal = null;
    }

    /**
     * Cargar vehículos desde la API
     */
    async loadData() {
        try {
            const response = await VehicleService.search({
                pageNumber: 1,
                pageSize: 100
            });
            this.vehicles = response.results || [];
            console.log(`📦 Cargados ${this.vehicles.length} vehículos para gestión`);
        } catch (error) {
            console.error("Error cargando vehículos:", error);
            this.vehicles = [];
        }
    }

    getData() {
        return {
            vehicles: this.vehicles
        };
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        const container = this.view.$container;
        if (!container) return;

        // Delegación de eventos para clicks
        this.clickHandler = async (e) => {
            // Botón nuevo vehículo
            if (e.target.id === 'btn-new-vehicle' || e.target.closest('#btn-new-vehicle')) {
                await this.handleNewVehicle();
            }

            // Botón editar
            if (e.target.classList.contains('btn-edit')) {
                const vehicleId = e.target.dataset.vehicleId;
                await this.handleEditVehicle(vehicleId);
            }

            // Botón eliminar
            if (e.target.classList.contains('btn-delete')) {
                const vehicleId = e.target.dataset.vehicleId;
                await this.handleDeleteVehicle(vehicleId);
            }
        };

        container.addEventListener('click', this.clickHandler);

        // Submit del formulario (cuando se abra el modal)
        this.setupFormListener();
    }

    cleanupEventListeners() {
        const container = this.view.$container;
        if (!container) return;

        if (this.clickHandler) {
            container.removeEventListener('click', this.clickHandler);
        }

        this.cleanupFormListener();
    }

    /**
     * Configurar listener del formulario
     */
    setupFormListener() {
        // Se configura cuando se abre el modal
    }

    cleanupFormListener() {
        if (this.formHandler) {
            document.removeEventListener('submit', this.formHandler);
            this.formHandler = null;
        }
    }

    /**
     * Manejar creación de nuevo vehículo
     */
    async handleNewVehicle() {
        this.showVehicleModal(null);
    }

    /**
     * Manejar edición de vehículo
     */
    async handleEditVehicle(vehicleId) {
        try {
            const vehicle = await VehicleService.findById(vehicleId);
            this.showVehicleModal(vehicle);
        } catch (error) {
            console.error("Error cargando vehículo:", error);
            this.view.showMessage("Error al cargar el vehículo", "error");
        }
    }

    /**
     * Manejar eliminación de vehículo
     */
    async handleDeleteVehicle(vehicleId) {
        if (!confirm('¿Estás seguro de eliminar este vehículo?')) {
            return;
        }

        const token = sessionController.getToken();

        try {
            await VehicleService.delete(vehicleId, token);
            this.view.showMessage("Vehículo eliminado correctamente", "success");
            
            // Recargar datos y re-renderizar
            await this.loadData();
            this.view.render(this.getData());
            this.setupEventListeners();
        } catch (error) {
            console.error("Error eliminando vehículo:", error);
            this.view.showMessage("Error al eliminar el vehículo", "error");
        }
    }

    /**
     * Mostrar modal de vehículo
     */
    showVehicleModal(vehicle = null) {
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

        // Listener para el submit del formulario
        this.formHandler = async (e) => {
            if (e.target.id === 'vehicle-form') {
                e.preventDefault();
                await this.handleSaveVehicle();
            }
        };

        document.addEventListener('submit', this.formHandler);
    }

    /**
     * Guardar vehículo (crear o actualizar)
     */
    async handleSaveVehicle() {
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
            
            // Recargar datos y re-renderizar
            await this.loadData();
            this.view.render(this.getData());
            this.setupEventListeners();
        } catch (error) {
            console.error("Error guardando vehículo:", error);
            this.view.showMessage("Error al guardar el vehículo", "error");
        }
    }

    /**
     * Cerrar modal
     */
    closeModal() {
        if (this.modal && this.modal.parentNode) {
            this.modal.remove();
        }
        this.modal = null;
        
        // Limpiar listener del formulario
        this.cleanupFormListener();
        
        // Limpiar otros modales huérfanos
        document.querySelectorAll('.modal').forEach(modal => {
            if (modal.id !== 'loginModal' && modal.id !== 'vehicleModal') {
                modal.remove();
            }
        });
    }
}