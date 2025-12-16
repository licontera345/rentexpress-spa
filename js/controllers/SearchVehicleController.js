import SearchVehicleView from "../views/SearchVehicleView.js";
import HeadquartersService from "../services/SedeService.js";
import VehicleCategoryService from "../services/VehicleCategoryService.js";
import VehicleService from "../services/VehicleService.js";
import CatalogVehicleController from "./CatalogVehicleController.js";

const SearchVehicleController = {
    async init() {
        const [hqs, cats] = await Promise.all([
            HeadquartersService.getAll(),
            VehicleCategoryService.getAll("es")
        ]);
        
        SearchVehicleView.render(hqs, cats);

        document.getElementById("pickup-headquarters").onchange = (e) => 
            SearchVehicleView.showHeadquarterDetails(e.target, "pickup-hq-details");
        
        document.getElementById("return-headquarters").onchange = (e) => 
            SearchVehicleView.showHeadquarterDetails(e.target, "return-hq-details");

        document.getElementById("search-vehicles-btn").onclick = () => this.handleSearch();
    },

    async handleSearch() {
        const params = SearchVehicleView.getSearchParams();

        const results = await VehicleService.search({
            currentHeadquartersId: params.pickupHeadquartersId,
            activeStatus: true,
            pageNumber: 1,
            pageSize: 25
        });

        CatalogVehicleController.setSearchParams(params);
        CatalogVehicleController.displaySearchResults(results.results || []);
    }
};

export default SearchVehicleController;