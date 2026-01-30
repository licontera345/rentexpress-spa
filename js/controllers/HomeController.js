import { BaseController } from './BaseController.js';

/**
 * Controlador de la página de inicio
 * Responsabilidades:
 * - Mostrar página de bienvenida
 * - Mostrar panel de búsqueda
 */
export class HomeController extends BaseController {
    constructor(view, searchController) {
        super(view);
        this.searchController = searchController;
    }

    /**
     * No necesita cargar datos adicionales
     */
    async loadData() {
        // La vista Home no necesita datos especiales
        // El panel de búsqueda se gestiona por SearchController
    }

    /**
     * Activar también el panel de búsqueda
     */
    async activate() {
        await super.activate();
        
        // Activar el panel de búsqueda si existe
        if (this.searchController) {
            await this.searchController.activatePanel();
        }
    }

    /**
     * Desactivar también el panel de búsqueda
     */
    deactivate() {
        // Desactivar el panel de búsqueda si existe
        if (this.searchController) {
            this.searchController.deactivatePanel();
        }
        
        super.deactivate();
    }

    getData() {
        return {
            title: 'Bienvenido a RentExpress',
            subtitle: 'Tu solución de alquiler de vehículos'
        };
    }
}