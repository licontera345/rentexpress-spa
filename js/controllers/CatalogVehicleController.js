import CatalogVehicleView from "../views/CatalogVehicleView.js";
import VehicleDetailController from "./VehicleDetailController.js";

const CatalogVehicleController = {
    init() {
        CatalogVehicleView.hide();
    },

    setSearchParams(params) {
        this.searchParams = params;
    },

    displaySearchResults(vehicles) {
        CatalogVehicleView.render(vehicles);
        if (vehicles?.length > 0) {
            document.querySelector("#catalog-section").scrollIntoView({ behavior: "smooth" });
            this.setupEventListeners();
        }
    },

    setupEventListeners() {
        document.querySelectorAll(".catalog-item").forEach(item => {
            item.onclick = () => VehicleDetailController.showDetail(item.dataset.vehicleId);
        });
    }
};

export default CatalogVehicleController;