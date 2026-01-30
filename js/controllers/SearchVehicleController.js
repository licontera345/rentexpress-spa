import HeadquartersService from "../services/SedeService.js";
import VehicleCategoryService from "../services/VehicleCategoryService.js";
import VehicleService from "../services/VehicleService.js";
import AddressService from "../services/AddressService.js";
import sessionController from "./SessionController.js";

/**
 * Controlador del panel de búsqueda de vehículos
 * NO hereda de BaseController porque es un componente global
 * Se activa/desactiva independientemente de las rutas
 */
export class SearchVehicleController {
    constructor(view, catalogController) {
        this.view = view;
        this.catalogController = catalogController;
        this.router = null;
        this.headquarters = [];
        this.categories = [];
        this.isActive = false;
    }

    /**
     * Activar el panel de búsqueda
     */
    async activatePanel() {
        if (this.isActive) return;

        console.log('▶️ Activando panel de búsqueda');

        try {
            // Cargar datos si no están cargados
            if (this.headquarters.length === 0 || this.categories.length === 0) {
                await this.loadData();
            }

            // Renderizar el panel
            this.view.render({
                headquarters: this.headquarters,
                categories: this.categories
            });

            // Configurar event listeners
            this.setupEventListeners();

            // Mostrar el panel
            this.view.show();

            this.isActive = true;
            console.log('✅ Panel de búsqueda activado');
        } catch (error) {
            console.error('❌ Error activando panel de búsqueda:', error);
        }
    }

    /**
     * Desactivar el panel de búsqueda
     */
    deactivatePanel() {
        if (!this.isActive) return;

        console.log('⏹️ Desactivando panel de búsqueda');

        this.cleanupEventListeners();
        this.view.hide();

        this.isActive = false;
        console.log('✅ Panel de búsqueda desactivado');
    }

    /**
     * Cargar datos de sedes y categorías
     */
    async loadData() {
        try {
            const [hqs, cats] = await Promise.all([
                HeadquartersService.getAll(),
                VehicleCategoryService.getAll("es")
            ]);

            this.headquarters = hqs || [];
            this.categories = cats || [];

            console.log(`Cargadas ${this.headquarters.length} sedes y ${this.categories.length} categorías`);
        } catch (error) {
            console.error("Error cargando datos de búsqueda:", error);
            throw error;
        }
    }

    /**
     * Configurar event listeners
     */
    setupEventListeners() {
        const container = this.view.$container;
        if (!container) return;

        // Listener para cambios en los selectores de sede
        this.pickupChangeHandler = async (e) => {
            if (e.target.id === "pickup-headquarters") {
                await this.showHeadquarterDetails(e.target.value, "pickup-hq-details");
            }
        };

        this.returnChangeHandler = async (e) => {
            if (e.target.id === "return-headquarters") {
                await this.showHeadquarterDetails(e.target.value, "return-hq-details");
            }
        };

        container.addEventListener("change", this.pickupChangeHandler);
        container.addEventListener("change", this.returnChangeHandler);

        // Listener para el botón de búsqueda
        this.searchClickHandler = (e) => {
            if (e.target.id === "search-vehicles-btn") {
                e.preventDefault();
                this.handleSearch();
            }
        };

        container.addEventListener("click", this.searchClickHandler);

        // Mostrar detalles iniciales si hay valores seleccionados
        const pickup = document.getElementById("pickup-headquarters");
        const returnHq = document.getElementById("return-headquarters");

        if (pickup?.value) {
            this.showHeadquarterDetails(pickup.value, "pickup-hq-details");
        }
        if (returnHq?.value) {
            this.showHeadquarterDetails(returnHq.value, "return-hq-details");
        }
    }

    /**
     * Limpiar event listeners
     */
    cleanupEventListeners() {
        const container = this.view.$container;
        if (!container) return;

        if (this.pickupChangeHandler) {
            container.removeEventListener("change", this.pickupChangeHandler);
        }
        if (this.returnChangeHandler) {
            container.removeEventListener("change", this.returnChangeHandler);
        }
        if (this.searchClickHandler) {
            container.removeEventListener("click", this.searchClickHandler);
        }
    }

    /**
     * Mostrar detalles de una sede
     */
    async showHeadquarterDetails(hqId, detailsElementId) {
        const detailsElement = document.getElementById(detailsElementId);
        if (!detailsElement) return;

        if (!hqId) {
            this.view.hideDetails(detailsElementId);
            return;
        }

        // Buscar la sede en los datos cargados
        const hq = this.headquarters.find(h => h.id == hqId);
        if (!hq) {
            this.view.hideDetails(detailsElementId);
            return;
        }

        let addressData = null;

        // Intentar cargar la dirección si hay token
        if (hq.addressId) {
            const token = sessionController.getToken();
            if (token) {
                try {
                    addressData = await AddressService.findById(hq.addressId, token);
                } catch (error) {
                    console.error("Error cargando dirección:", error);
                }
            }
        }

        // Renderizar los detalles
        this.view.showDetails(detailsElementId, {
            name: hq.name,
            address: addressData
        });
    }

    /**
     * Manejar la búsqueda de vehículos
     */
    async handleSearch() {
        const params = this.view.getSearchParams();

        console.log('🔍 Buscando vehículos con parámetros:', params);

        try {
            const results = await VehicleService.search({
                currentHeadquartersId: params.pickupHeadquartersId,
                activeStatus: true,
                pageNumber: 1,
                pageSize: 25
            });

            console.log(`✅ Encontrados ${results.results?.length || 0} vehículos`);

            // Pasar resultados al controlador del catálogo
            if (this.catalogController) {
                this.catalogController.displaySearchResults(results.results || []);
            }
        } catch (error) {
            console.error("❌ Error en búsqueda:", error);
            
            if (this.catalogController) {
                this.catalogController.displaySearchResults([]);
            }
        }
    }
}