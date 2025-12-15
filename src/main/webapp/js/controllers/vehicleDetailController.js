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
            return;
        }

        // Cerrar modal con X
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.classList.remove("show");
            });
        } else {
            console.warn("Botón .btn-close no encontrado");
        }

        // Cerrar modal al hacer click fuera
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("show");
            }
        });
        
        console.log("Modal listeners configurados correctamente");
    },

    async showDetail(vehicleId) {
        const modal = document.getElementById("vehicleModal");     
        if (!modal) {
            return;
        }
        modal.classList.add("show");

        VehicleDetailView.renderLoading();

        try {
            const vehicle = await VehicleDetailService.getVehicleById(vehicleId);
            VehicleDetailView.render(vehicle);
        } catch (error) {
            VehicleDetailView.renderError(error);
        }
    }
};

export default VehicleDetailController;