import { SearchVehicleView } from "../views/SearchVehicleView.js";
import HeadquartersService from "../services/SedeService.js";
import VehicleCategoryService from "../services/VehicleCategoryService.js";
import VehicleService from "../services/VehicleService.js";

export class SearchVehicleController {
    constructor(view, catalogController, router) {
        this.view = view;
        this.catalogController = catalogController;
        this.router = router;
    }

    async init() {
        try {
            const [hqs, cats] = await Promise.all([
                HeadquartersService.getAll(),
                VehicleCategoryService.getAll("es")
            ]);

            this.view.render(hqs, cats);
            this.setupListeners();
        } catch (error) {
            console.error("Error cargando datos iniciales:", error);
        }
    }

    setupListeners() {
        const pickupSelect = document.getElementById("pickup-headquarters");
        const returnSelect = document.getElementById("return-headquarters");
        const searchBtn = document.getElementById("search-vehicles-btn");

        if (pickupSelect) {
            pickupSelect.onchange = (e) =>
                this.view.showHeadquarterDetails(e.target, "pickup-hq-details");
        }
        if (returnSelect) {
            returnSelect.onchange = (e) =>
                this.view.showHeadquarterDetails(e.target, "return-hq-details");
        }
        if (searchBtn) {
            searchBtn.onclick = () => this.handleSearch();
        }
    }

    async handleSearch() {
        const params = this.view.getSearchParams();

        try {
            const results = await VehicleService.search({
                currentHeadquartersId: params.pickupHeadquartersId,
                activeStatus: true,
                pageNumber: 1,
                pageSize: 25
            });

            // Usamos la instancia inyectada
            this.catalogController.displaySearchResults(results.results || []);
            
            // Opcional: navegar al catálogo
            // this.router?.goTo('catalog');
        } catch (error) {
            console.error("Error en búsqueda:", error);
            this.catalogController.displaySearchResults([]);
        }
    }

    show() { this.view.show(); }
    hide() { this.view.hide(); }
}