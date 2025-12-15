import CatalogVehicleService from "../services/catalogVehicleService.js";
import CatalogVehicleView from "../views/catalogVehicleView.js";
import VehicleDetailController from "./vehicleDetailController.js";

const CatalogVehicleController = {

    init() {
        this.loadCatalog();
        
    },

    async loadCatalog() {
        try {
            const vehicles = await CatalogVehicleService.getVehicles();
            CatalogVehicleView.render(vehicles.results);
            setTimeout(() => this.setupEventListeners(), 100);
        } catch (error) {
            console.error("Error cargando catálogo:", error);
            CatalogVehicleView.renderError("No se pudo cargar el catálogo");
        }
    },

    setupEventListeners() {
        const items = document.querySelectorAll('.catalog-item');
        
        if (items.length === 0) {
            console.warn("No se encontraron items del catálogo para agregar listeners");
            return;
        }
        
        items.forEach(item => {
            item.addEventListener('click', () => {
                const vehicleId = item.getAttribute('data-vehicle-id');
                if (vehicleId) {
                    console.log("Click en vehículo ID:", vehicleId);
                    VehicleDetailController.showDetail(vehicleId);
                } else {
                    console.error("Item sin vehicleId:", item);
                }
            });
        });
        
        console.log(`Event listeners agregados a ${items.length} vehículos`);
    }

};

export default CatalogVehicleController;