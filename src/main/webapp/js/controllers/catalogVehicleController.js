import CatalogVehicleService from "../services/catalogVehicleService.js";
import CatalogVehicleView from "../views/catalogVehicleView.js";

const CatalogVehicleController = {

    init() {
        CatalogVehicleView.renderLoading();
        this.loadCatalog();
    },

    async loadCatalog() {
        try {
           const vehicles = await CatalogVehicleService.getVehicles();
           CatalogVehicleView.render(vehicles.results);
        }catch (error) {
            CatalogVehicleView.renderError("No se pudo cargar el catálogo");
            return; 
        }

        // CatalogVehicleService.getVehicles()
        //     .then(function (vehicles) {
        //         CatalogVehicleView.render(vehicles);
        //     })
        //     .catch(function () {
        //         CatalogVehicleView.renderError("No se pudo cargar el catálogo");
        //     });
    }

};

export default CatalogVehicleController;