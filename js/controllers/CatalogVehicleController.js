import { CatalogVehicleView } from "../views/CatalogVehicleView.js";

export class CatalogVehicleController {
    constructor(view, detailController, router) {
        this.view = view;
        this.detailController = detailController;
        this.router = router;
    }

    init() {
        this.view.hide();
    }

    displaySearchResults(vehicles) {
        this.view.render(vehicles);

        if (vehicles && vehicles.length > 0) {
            const catalogSection = document.querySelector("#catalog-section");
            if (catalogSection) {
                catalogSection.scrollIntoView({ behavior: "smooth" });
            }
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        document.querySelectorAll(".catalog-item").forEach(item => {
            item.onclick = () => {
                const vehicleId = item.dataset.vehicleId;
                this.detailController.showDetail(vehicleId);
            };
        });
    }

    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }
}