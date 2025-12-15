import SedeService from "../services/sedeService.js";
import VehicleCategoryService from "../services/vehicleCategoryService.js";
import CatalogVehicleService from "../services/catalogVehicleService.js";
import CatalogVehicleController from "./catalogVehicleController.js";
import SearchVehicleView from "../views/searchVehicleView.js";

const SearchVehicleController = {

    headquarters: [],
    categories: [],

    /**
     * Inicializa el controlador de búsqueda
     */
    init: async function() {
        console.log("Inicializando SearchController");
        
        // Verificar que el contenedor exista
        const container = document.querySelector("#search-panel");
        if (!container) {
            console.error("Contenedor #search-panel no encontrado");
            return;
        }
        
        try {
            await this.loadInitialData();
            this.setupEventListeners();
            console.log("SearchController inicializado correctamente");
        } catch (error) {
            console.error("Error inicializando SearchController:", error);
            if (SearchVehicleView.showError) {
                SearchVehicleView.showError("Error al cargar los datos iniciales");
            }
        }
    },

    /**
     * Carga los datos iniciales (sedes y categorías)
     */
    loadInitialData: async function() {
        try {
            console.log("Cargando datos iniciales...");
            
            // Cargar sedes
            this.headquarters = await SedeService.getAll();
            console.log("Sedes cargadas:", this.headquarters.length);

            // Cargar categorías
            this.categories = await VehicleCategoryService.getAll('es');
            console.log("Categorías cargadas:", this.categories.length);

            // Renderizar la vista
            SearchVehicleView.render(this.headquarters, this.categories);
            console.log("Vista de búsqueda renderizada");

        } catch (error) {
            console.error("Error cargando datos iniciales:", error);
            throw error;
        }
    },

    /**
     * Configura los event listeners
     */
    setupEventListeners: function() {
        console.log("Configurando event listeners de búsqueda");

        // Evento para mostrar detalles de sede de recogida
        const pickupHQ = document.getElementById("pickup-headquarters");
        if (pickupHQ) {
            pickupHQ.addEventListener("change", () => {
                console.log("Cambio en sede de recogida");
                SearchVehicleView.showHeadquarterDetails(pickupHQ, "pickup-hq-details");
                this.updateReturnDateMin();
            });
        } else {
            console.warn("Select pickup-headquarters no encontrado");
        }

        // Evento para mostrar detalles de sede de devolución
        const returnHQ = document.getElementById("return-headquarters");
        if (returnHQ) {
            returnHQ.addEventListener("change", () => {
                console.log("Cambio en sede de devolución");
                SearchVehicleView.showHeadquarterDetails(returnHQ, "return-hq-details");
            });
        } else {
            console.warn("Select return-headquarters no encontrado");
        }

        // Evento para actualizar fecha mínima de devolución
        const pickupDate = document.getElementById("pickup-date");
        if (pickupDate) {
            pickupDate.addEventListener("change", () => {
                console.log("Cambio en fecha de recogida");
                this.updateReturnDateMin();
            });
        } else {
            console.warn("Input pickup-date no encontrado");
        }

        // Evento del botón de búsqueda
        const searchBtn = document.getElementById("search-vehicles-btn");
        if (searchBtn) {
            searchBtn.addEventListener("click", () => {
                console.log("Click en botón de búsqueda");
                this.handleSearch();
            });
        } else {
            console.warn("Botón search-vehicles-btn no encontrado");
        }

        console.log("Event listeners configurados");
    },

    /**
     * Actualiza la fecha mínima de devolución
     */
    updateReturnDateMin: function() {
        const pickupDate = document.getElementById("pickup-date")?.value;
        const returnDateInput = document.getElementById("return-date");
        
        if (pickupDate && returnDateInput) {
            returnDateInput.min = pickupDate;
            
            // Si la fecha de devolución es anterior a la de recogida, actualizarla
            if (returnDateInput.value && returnDateInput.value < pickupDate) {
                returnDateInput.value = pickupDate;
            }
        }
    },

    /**
     * Maneja la búsqueda de vehículos
     */
    handleSearch: async function() {
        console.log("Iniciando búsqueda de vehículos");
        
        // Limpiar errores previos
        SearchVehicleView.clearError();

        // Obtener parámetros de búsqueda
        const params = SearchVehicleView.getSearchParams();
        console.log("Parámetros de búsqueda:", params);

        // Validar parámetros
        if (!SearchVehicleView.validateSearchParams(params)) {
            return;
        }

        try {
            // Deshabilitar botón de búsqueda
            const searchBtn = document.getElementById("search-vehicles-btn");
            if (searchBtn) {
                searchBtn.disabled = true;
                searchBtn.textContent = "Buscando...";
            }

            // Construir criterios de búsqueda
            const searchCriteria = {
                currentHeadquartersId: params.pickupHeadquartersId,
                activeStatus: true,
                pageNumber: 1,
                pageSize: 50
            };

            // Agregar categoría si está seleccionada
            if (params.categoryId) {
                searchCriteria.categoryId = params.categoryId;
            }

            console.log("Criterios de búsqueda:", searchCriteria);

            // Realizar búsqueda
            const results = await CatalogVehicleService.searchVehicles(searchCriteria);
            console.log("Resultados obtenidos:", results);

            // Guardar parámetros de búsqueda en el controlador de catálogo
            CatalogVehicleController.setSearchParams(params);

            // Mostrar resultados
            CatalogVehicleController.displaySearchResults(results.results || []);

            // Habilitar botón de búsqueda
            if (searchBtn) {
                searchBtn.disabled = false;
                searchBtn.textContent = "Buscar";
            }

        } catch (error) {
            console.error("Error en la búsqueda:", error);
            SearchVehicleView.showError("Error al buscar vehículos: " + error);
            
            // Habilitar botón de búsqueda
            const searchBtn = document.getElementById("search-vehicles-btn");
            if (searchBtn) {
                searchBtn.disabled = false;
                searchBtn.textContent = "Buscar";
            }
        }
    }
};

export default SearchVehicleController;