import { Router } from "./Router.js";

// Controllers
import HomeController from "./controllers/HomeController.js";
import LoginController from "./controllers/LoginController.js";
import CatalogVehicleController from "./controllers/CatalogVehicleController.js";
import SearchVehicleController from "./controllers/SearchVehicleController.js";
import VehicleDetailController from "./controllers/VehicleDetailController.js";

export class AppManager {
    constructor() {
        this.init();
    }

    init() {
        console.log("Inicializando AppManager...");

        // 1. Inicializar Router (vacío al principio)
        const router = new Router({});

        // 2. Inyectar el router en los controladores que lo necesiten
        HomeController.router = router;
        LoginController.router = router;
        CatalogVehicleController.router = router;
        SearchVehicleController.router = router;
        VehicleDetailController.router = router;

        // 3. Configurar el mapa de rutas
        const routes = {
            'home': HomeController,
            'catalog': CatalogVehicleController,
        };

        // 4. Actualizar el router con las rutas
        router.routes = routes;

        // 5. Inicializar componentes globales (que siempre están presentes)
        this.initGlobalComponents();

        // 6. Navegación inicial
        router.route();

        console.log("AppManager inicializado correctamente");
    }

    initGlobalComponents() {
        // Inicializar componentes que siempre están presentes
        LoginController.init();
        SearchVehicleController.init();
        VehicleDetailController.init();

        // Configurar navegación del header
        this.setupHeaderNavigation();
    }

    setupHeaderNavigation() {
        const nav = document.querySelector('header nav');
        if (!nav) return;

        // Agregar enlace de inicio si no existe
        const existingHome = nav.querySelector('a[href="#home"]');
        if (!existingHome) {
            const homeLink = document.createElement('a');
            homeLink.href = '#home';
            homeLink.textContent = 'Inicio';
            nav.insertBefore(homeLink, nav.firstChild);
        }
    }
}