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

/**
 * Gestor principal de la aplicación
 * Responsabilidades:
 * - Crear todas las vistas y controladores
 * - Inyectar dependencias
 * - Inicializar el router
 */
export class AppManager {
    constructor() {
        this.init();
    }

    init() {
        console.log("🚀 Inicializando AppManager...");

        // ========================================
        // 1. CREAR VISTAS (solo renderizado)
        // ========================================
        const homeView = new HomeView();
        const loginView = new LoginView();
        const catalogView = new CatalogVehicleView();
        const searchView = new SearchVehicleView();
        const detailView = new VehicleDetailView();
        const manageVehiclesView = new ManageVehiclesView();

        // ========================================
        // 2. CREAR CONTROLADORES GLOBALES (modales y componentes)
        // ========================================
        
        // Modal de login
        const loginController = new LoginController(loginView);

        // Modal de detalle de vehículo
        const detailController = new VehicleDetailController(detailView);

        // Panel de búsqueda (componente global)
        const catalogController = new CatalogVehicleController(catalogView, detailController);
        const searchController = new SearchVehicleController(searchView, catalogController);

        // ========================================
        // 3. CREAR CONTROLADORES DE RUTAS
        // ========================================
        
        // Home (con panel de búsqueda)
        const homeController = new HomeController(homeView, searchController);

        // Gestión de vehículos (solo empleados)
        const manageVehiclesController = new ManageVehiclesController(manageVehiclesView);

        // ========================================
        // 4. CREAR LAYOUT MANAGER
        // ========================================
        const layoutManager = new LayoutManager(loginController);

        // ========================================
        // 5. CREAR ROUTER CON LAS RUTAS
        // ========================================
        const router = new Router({
            'home': homeController,
            'catalog': catalogController,
            'manage-vehicles': manageVehiclesController
        }, layoutManager);

        // ========================================
        // 6. INYECTAR ROUTER EN TODOS LOS CONTROLADORES
        // ========================================
        homeController.router = router;
        catalogController.router = router;
        loginController.router = router;
        searchController.router = router;
        detailController.router = router;
        manageVehiclesController.router = router;
        layoutManager.router = router;

        // ========================================
        // 7. INICIAR EL ROUTING
        // ========================================
        router.route();

        console.log("✅ AppManager inicializado correctamente");
        console.log("📌 Rutas disponibles:", Object.keys(router.routes));
    }
}