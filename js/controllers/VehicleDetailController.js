import VehicleService from "../services/VehicleService.js";
import VehicleDetailView from "../views/VehicleDetailView.js";

const VehicleDetailController = {
    init() {
        const modal = document.getElementById("vehicleModal");

        modal.onclick = (e) => {
            if (e.target.classList.contains("btn-close") || e.target === modal) {
                modal.classList.remove("show");
            }
        };
    },

    async showDetail(vehicleId) {
        const modal = document.getElementById("vehicleModal");
        modal.classList.add("show");
        
        try {
            const vehicle = await VehicleService.findById(vehicleId);
            VehicleDetailView.render(vehicle);
        } catch (error) {
            modal.classList.remove("show");
        }
    }
};

export default VehicleDetailController;