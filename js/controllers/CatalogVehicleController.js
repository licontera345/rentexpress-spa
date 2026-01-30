import { BaseController } from './BaseController.js';
import VehicleService from "../services/VehicleService.js";

/**
 * Controlador del catálogo de vehículos
 * Responsabilidades:
 * - Mostrar listado de vehículos
 * - Manejar clicks en vehículos para ver detalles
 */
export class CatalogVehicleController extends BaseController {
    constructor(view, detailController) {
        super(view);
        this.detailController = detailController;
        this.vehicles = [];
    }

    /**
     * Cargar todos los vehículos al activar la vista
     */
    async loadData() {
        try {
            const response = await VehicleService.search({
                activeStatus: true,
                pageNumber: 1,
                pageSize: 50
            });

            this.vehicles = response.results || [];
            console.log(`📦 Cargados ${this.vehicles.length} vehículos`);
        } catch (error) {
            console.error('Error cargando vehículos:', error);
            this.vehicles = [];
        }
    }

    getData() {
        return {
            vehicles: this.vehicles
        };
    }

    /**
     * Configurar listeners para clicks en vehículos
     */
    setupEventListeners() {
        const container = this.view.$container;
        if (!container) return;

        this.clickHandler = (e) => {
            const vehicleItem = e.target.closest('.catalog-item');
            if (vehicleItem) {
                const vehicleId = vehicleItem.dataset.vehicleId;
                if (vehicleId) {
                    this.showVehicleDetail(vehicleId);
                }
            }
        };

        container.addEventListener('click', this.clickHandler);
    }

    cleanupEventListeners() {
        const container = this.view.$container;
        if (!container) return;

        if (this.clickHandler) {
            container.removeEventListener('click', this.clickHandler);
        }
    }

    /**
     * Mostrar detalles de un vehículo
     */
    showVehicleDetail(vehicleId) {
        if (this.detailController) {
            this.detailController.showDetail(vehicleId);
        }
    }

    /**
     * Mostrar resultados de búsqueda (llamado desde SearchController)
     * Este método NO sigue el ciclo de vida normal
     */
    displaySearchResults(vehicles) {
        this.vehicles = vehicles;
        
        // Renderizar los resultados
        this.view.render({ vehicles: this.vehicles });
        
        // Mostrar la vista
        this.view.show();

        // Configurar listeners si no están configurados
        if (!this.clickHandler) {
            this.setupEventListeners();
        }

        // Scroll al catálogo
        const catalogSection = document.querySelector("#catalog-section");
        if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: "smooth" });
        }

        console.log(`📋 Mostrando ${vehicles.length} resultados de búsqueda`);
    }
}