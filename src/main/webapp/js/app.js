import LoginController from "./controllers/loginController.js";
import HomeController from "./controllers/homeController.js";
import CatalogVehicleController from "./controllers/catalogVehicleController.js";
import sessionController from "./controllers/sessionController.js";

const App = {

    init() {
        HomeController.init();
        CatalogVehicleController.init();
        LoginController.init();
    }

};

window.addEventListener("DOMContentLoaded", function () {
    App.init();
});