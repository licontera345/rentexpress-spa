import CatalogVehicleService from "../services/catalogVehicleService.js";
import CatalogVehicleView from "../views/catalogVehicleView.js";
import VehicleDetailController from "./vehicleDetailController.js";

const CatalogVehicleController = {

    searchParams: null,

    init() {
        console.log("CatalogVehicleController inicializado");
        CatalogVehicleView.hide();
    },

    /**
     * Guarda los parámetros de búsqueda
     */
    setSearchParams(params) {
        this.searchParams = params;
        console.log("Parámetros de búsqueda guardados:", this.searchParams);
    },

    /**
     * Muestra los resultados de una búsqueda
     */
    displaySearchResults(vehicles) {
        console.log("Mostrando resultados de búsqueda:", vehicles.length);
        
        // Mostrar mensaje si no hay resultados
        if (!vehicles || vehicles.length === 0) {
            CatalogVehicleView.renderEmpty("No se encontraron vehículos disponibles para las fechas y sede seleccionadas.");
            return;
        }
        
        // Renderizar vehículos
        CatalogVehicleView.render(vehicles);
        
        // Configurar event listeners
        setTimeout(() => this.setupEventListeners(), 100);
        
        // Scroll al catálogo
        const catalogSection = document.querySelector('#catalog-section');
        if (catalogSection) {
            catalogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    setupEventListeners() {
        const items = document.querySelectorAll('.catalog-item');
        
        if (items.length === 0) {
            console.warn("No se encontraron items del catálogo para agregar listeners");
            return;
        }
        
        items.forEach(item => {
            item.addEventListener('click', () => {
                const vehicleId = item.getAttribute('data-vehicle-id');
                if (vehicleId) {
                    console.log("Click en vehículo ID:", vehicleId);
                    VehicleDetailController.showDetail(vehicleId);
                } else {
                    console.error("Item sin vehicleId:", item);
                }
            });
        });
        
        console.log(`Event listeners agregados a ${items.length} vehículos`);
    }
};

export default CatalogVehicleController;