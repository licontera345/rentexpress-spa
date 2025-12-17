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
        this.view.$container.addEventListener("change", (e) => {
            if (e.target.id === "pickup-headquarters") {
                this.view.showHeadquarterDetails(e.target, "pickup-hq-details");
            }
            if (e.target.id === "return-headquarters") {
                this.view.showHeadquarterDetails(e.target, "return-hq-details");
            }
        });

        this.view.$container.addEventListener("click", (e) => {
            if (e.target.id === "search-vehicles-btn") {
                e.preventDefault();
                this.handleSearch();
            }
        });

        const pickup = document.getElementById("pickup-headquarters");
        const returnHq = document.getElementById("return-headquarters");

        if (pickup && pickup.value) {
            this.view.showHeadquarterDetails(pickup, "pickup-hq-details");
        }
        if (returnHq && returnHq.value) {
            this.view.showHeadquarterDetails(returnHq, "return-hq-details");
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

            this.catalogController.displaySearchResults(results.results || []);
        } catch (error) {
            console.error("Error en búsqueda:", error);
            this.catalogController.displaySearchResults([]);
        }
    }

    show() { this.view.show(); }
    hide() { this.view.hide(); }
}