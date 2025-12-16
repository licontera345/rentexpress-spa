import LoginController from "./controllers/loginController.js";
import HomeController from "./controllers/homeController.js";
import CatalogVehicleController from "./controllers/catalogVehicleController.js";
import VehicleDetailController from "./controllers/vehicleDetailController.js";
import SearchVehicleController from "./controllers/searchVehicleController.js";
import sessionController from "./controllers/sessionController.js";

const App = {

    init() {
        console.log("Inicializando aplicación RentExpress");
        
        // Inicializar controladores en orden
        HomeController.init();
        SearchVehicleController.init();
        CatalogVehicleController.init();
        LoginController.init();
        VehicleDetailController.init();
        
        console.log("Aplicación inicializada correctamente");
    }

};

window.addEventListener("DOMContentLoaded", function () {
    console.log("DOM cargado, iniciando aplicación...");
    App.init();
});