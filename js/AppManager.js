import { Router } from "./Router.js";
import { LayoutManager } from "./layouts/LayoutManager.js";

// Views
import { HomeView } from "./views/HomeView.js";
import { LoginView } from "./views/LoginView.js";
import { CatalogVehicleView } from "./views/CatalogVehicleView.js";
import { SearchVehicleView } from "./views/SearchVehicleView.js";
import { VehicleDetailView } from "./views/VehicleDetailView.js";
import { ManageVehiclesView } from "./views/ManageVehiclesView.js";

// Controllers
import { HomeController } from "./controllers/HomeController.js";
import { LoginController } from "./controllers/LoginController.js";
import { CatalogVehicleController } from "./controllers/CatalogVehicleController.js";
import { SearchVehicleController } from "./controllers/SearchVehicleController.js";
import { VehicleDetailController } from "./controllers/VehicleDetailController.js";
import { ManageVehiclesController } from "./controllers/ManageVehiclesController.js";

export class AppManager {
    constructor() {
        this.init();
    }

    init() {
        console.log("Inicializando AppManager...");

        //Crear todas las vistas
        const homeView = new HomeView();
        const loginView = new LoginView();
        const catalogView = new CatalogVehicleView();
        const searchView = new SearchVehicleView();
        const detailView = new VehicleDetailView();
        const manageVehiclesView = new ManageVehiclesView();

        //Crear el controlador del modal de detalle
        const detailController = new VehicleDetailController(detailView, null);

        //Crear controladores que dependen del modal
        const catalogController = new CatalogVehicleController(catalogView, detailController, null);

        //Crear los demás controladores
        const homeController = new HomeController(homeView, null);
        const loginController = new LoginController(loginView, null);
        const searchController = new SearchVehicleController(searchView, catalogController, null);
        const manageVehiclesController = new ManageVehiclesController(manageVehiclesView, null);

        //Crear LayoutManager
        const layoutManager = new LayoutManager(loginController, null);

        //Crear el router SOLO con las rutas que existen
        const router = new Router({
            home: homeController,
            catalog: catalogController,
            'manage-vehicles': manageVehiclesController
        }, layoutManager);

        //Inyectar el router en todos los controladores y en layoutManager
        homeController.router = router;
        catalogController.router = router;
        loginController.router = router;
        searchController.router = router;
        detailController.router = router;
        manageVehiclesController.router = router;
        layoutManager.router = router;

        //Inicializar componentes globales
        loginController.init();
        searchController.init();
        detailController.init();

        //Iniciar el routing
        router.route();

        console.log("AppManager inicializado correctamente");
    }
}