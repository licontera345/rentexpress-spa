import LoginController from "./controllers/loginController.js";
import HomeController from "./controllers/homeController.js";
import CatalogVehicleController from "./controllers/catalogVehicleController.js";
import VehicleDetailController from "./controllers/vehicleDetailController.js";
import sessionController from "./controllers/sessionController.js";

const App = {

    init() {
        HomeController.init();
        CatalogVehicleController.init();
        LoginController.init();
        VehicleDetailController.init();
    }

};

window.addEventListener("DOMContentLoaded", function () {
    App.init();
});