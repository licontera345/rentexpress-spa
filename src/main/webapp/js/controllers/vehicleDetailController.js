import VehicleDetailService from "../services/vehicleDetailService.js";
import VehicleDetailView from "../views/vehicleDetailView.js";

const VehicleDetailController = {
    
    init() {
        this.setupModalListeners();
    },

    setupModalListeners() {
        const modal = document.getElementById("vehicleModal");
        const closeBtn = document.querySelector(".btn-close");

        if (!modal) {
            console.error("Modal #vehicleModal no encontrado en el DOM");
            return;
        }

        // Cerrar modal con X
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                console.log("Cerrando modal con botón X");
                modal.classList.remove("show");
            });
        } else {
            console.warn("Botón .btn-close no encontrado");
        }

        // Cerrar modal al hacer click fuera
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                console.log("Cerrando modal con click fuera");
                modal.classList.remove("show");
            }
        });
        
        console.log("Modal listeners configurados correctamente");
    },

    async showDetail(vehicleId) {
        const modal = document.getElementById("vehicleModal");
        
        if (!modal) {
            console.error("Modal no encontrado al intentar mostrar detalle");
            return;
        }

        console.log("Mostrando detalle del vehículo:", vehicleId);

        // Mostrar modal
        modal.classList.add("show");

        // Mostrar loading
        VehicleDetailView.renderLoading();

        try {
            const vehicle = await VehicleDetailService.getVehicleById(vehicleId);
            console.log("Vehículo obtenido:", vehicle);
            VehicleDetailView.render(vehicle);
        } catch (error) {
            console.error("Error obteniendo detalle del vehículo:", error);
            VehicleDetailView.renderError(error);
        }
    }
};

export default VehicleDetailController;