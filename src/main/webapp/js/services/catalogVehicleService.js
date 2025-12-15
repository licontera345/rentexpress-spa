import Global from "../utils/variables.js";

const CatalogVehicleService = {
    
    getVehicles: function() { 
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Global.API + "/vehicles/open/search?pageNumber=1&pageSize=25",
                async: true,
                dataType: "json",
                statusCode: {
                    200: function(data) {
                        resolve(data);
                    },
                    500: function() {
                        reject("Error downloading catalogue");
                    }
                }
            });
        });
    },

    searchVehicles: function(criteria) {
        return new Promise((resolve, reject) => {
            // Construir URL con parámetros
            let url = Global.API + "/vehicles/open/search?";
            
            const params = [];
            
            // Parámetros obligatorios
            params.push(`pageNumber=${criteria.pageNumber || 1}`);
            params.push(`pageSize=${criteria.pageSize || 50}`);
            
            // Filtros opcionales
            if (criteria.vehicleId) {
                params.push(`vehicleId=${criteria.vehicleId}`);
            }
            if (criteria.vehicleStatusId) {
                params.push(`vehicleStatusId=${criteria.vehicleStatusId}`);
            }
            if (criteria.categoryId) {
                params.push(`categoryId=${criteria.categoryId}`);
            }
            if (criteria.currentHeadquartersId) {
                params.push(`currentHeadquartersId=${criteria.currentHeadquartersId}`);
            }
            if (criteria.brand) {
                params.push(`brand=${encodeURIComponent(criteria.brand)}`);
            }
            if (criteria.model) {
                params.push(`model=${encodeURIComponent(criteria.model)}`);
            }
            if (criteria.licensePlate) {
                params.push(`licensePlate=${encodeURIComponent(criteria.licensePlate)}`);
            }
            if (criteria.vinNumber) {
                params.push(`vinNumber=${encodeURIComponent(criteria.vinNumber)}`);
            }
            if (criteria.manufactureYearFrom) {
                params.push(`manufactureYearFrom=${criteria.manufactureYearFrom}`);
            }
            if (criteria.manufactureYearTo) {
                params.push(`manufactureYearTo=${criteria.manufactureYearTo}`);
            }
            if (criteria.dailyPriceMin) {
                params.push(`dailyPriceMin=${criteria.dailyPriceMin}`);
            }
            if (criteria.dailyPriceMax) {
                params.push(`dailyPriceMax=${criteria.dailyPriceMax}`);
            }
            if (criteria.currentMileageMin) {
                params.push(`currentMileageMin=${criteria.currentMileageMin}`);
            }
            if (criteria.currentMileageMax) {
                params.push(`currentMileageMax=${criteria.currentMileageMax}`);
            }
            if (criteria.activeStatus !== undefined) {
                params.push(`activeStatus=${criteria.activeStatus}`);
            }
            
            url += params.join('&');
            
            console.log("URL de búsqueda:", url);
            
            $.ajax({
                type: "GET",
                url: url,
                async: true,
                dataType: "json",
                statusCode: {
                    200: function(data) {
                        resolve(data);
                    },
                    204: function() {
                        resolve({ results: [], total: 0 });
                    },
                    400: function() {
                        reject("Criterios de búsqueda inválidos");
                    },
                    500: function() {
                        reject("Error al buscar vehículos");
                    }
                }
            });
        });
    }
};

export default CatalogVehicleService;