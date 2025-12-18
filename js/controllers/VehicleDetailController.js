import VehicleService from "../services/VehicleService.js";
import { VehicleDetailView } from "../views/VehicleDetailView.js";

export class VehicleDetailController {
    constructor(view, router) {
        this.view = view;
        this.router = router;
        this.init();
    }

    init() {
        this.setupModalListeners();
    }

    setupModalListeners() {
        const modal = document.getElementById("vehicleModal");
        if (!modal) return;

        modal.onclick = (e) => {
            if (e.target.classList.contains("btn-close") || e.target === modal) {
                modal.classList.remove("active");
            }
        };
    }

    async showDetail(vehicleId) {
        const modal = document.getElementById("vehicleModal");
        if (!modal) return;

        modal.classList.add("active");

        try {
            const vehicle = await VehicleService.findById(vehicleId);
            this.view.render(vehicle);
        } catch (error) {
            console.error("Error cargando vehículo:", error);
            modal.classList.remove("active");
        }
    }

    show() {}

    hide() {}
}