import VehicleService from "../services/VehicleService.js";

/**
 * Controlador del modal de detalle de vehículo
 * NO hereda de BaseController porque es un modal (componente global)
 */
export class VehicleDetailController {
    constructor(view) {
        this.view = view;
        this.router = null;
        this.modal = document.getElementById("vehicleModal");
        this.currentVehicle = null;
        
        this.setupModalListeners();
    }

    /**
     * Configurar listeners del modal
     */
    setupModalListeners() {
        if (!this.modal) {
            console.error('Modal de vehículo no encontrado');
            return;
        }

        // Cerrar con botón X
        this.closeHandler = (e) => {
            if (e.target.classList.contains("btn-close")) {
                this.hideModal();
            }
        };

        // Cerrar con click fuera del modal
        this.outsideClickHandler = (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        };

        this.modal.addEventListener('click', this.closeHandler);
        this.modal.addEventListener('click', this.outsideClickHandler);
    }

    /**
     * Mostrar detalles de un vehículo
     */
    async showDetail(vehicleId) {
        console.log(`🚗 Mostrando detalle del vehículo ${vehicleId}`);

        try {
            // Cargar datos del vehículo
            const vehicle = await VehicleService.findById(vehicleId);
            this.currentVehicle = vehicle;

            // Renderizar en la vista
            this.view.render({ vehicle });

            // Mostrar el modal
            this.showModal();

            console.log(`✅ Detalle del vehículo mostrado`);
        } catch (error) {
            console.error('❌ Error cargando vehículo:', error);
            alert('No se pudo cargar el vehículo. Por favor, intenta de nuevo.');
        }
    }

    /**
     * Mostrar el modal
     */
    showModal() {
        if (this.modal) {
            this.modal.classList.add('active');
        }
    }

    /**
     * Ocultar el modal
     */
    hideModal() {
        if (this.modal) {
            this.modal.classList.remove('active');
        }
        this.currentVehicle = null;
    }

    /**
     * Limpiar listeners (si se destruye el controlador)
     */
    cleanup() {
        if (!this.modal) return;

        if (this.closeHandler) {
            this.modal.removeEventListener('click', this.closeHandler);
        }
        if (this.outsideClickHandler) {
            this.modal.removeEventListener('click', this.outsideClickHandler);
        }
    }
}