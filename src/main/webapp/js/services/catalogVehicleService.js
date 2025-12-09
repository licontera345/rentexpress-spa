import Global from "../utils/variables.js";

const CatalogVehicleService = {

    getVehicles() {
        return fetch(Global.API + "/vehicles/open/search?pageNumber=1&pageSize=25")
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Error al cargar el catálogo");
                }
                return response.json();
            })
            .then(function (data) {
                if (data && Array.isArray(data.results)) {
                    return data.results;
                } else {
                    return [];
                }
            });
    }

};

export default CatalogVehicleService;