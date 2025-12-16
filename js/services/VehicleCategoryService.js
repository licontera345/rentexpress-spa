import Config from "../config/Config.js";

const VehicleCategoryService = {   
    getAll: function(isoCode = 'es') {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(Config.VEHICLE_CATEGORIES.ALL(isoCode)),
                async: true,
                dataType: "json",
                statusCode: {
                    200: function(data) {
                        resolve(data);
                    },
                    204: function() {
                        resolve([]);
                    },
                    400: function() {
                        reject("Código de idioma inválido");
                    },
                    500: function() {
                        reject("Error al obtener las categorías");
                    }
                }
            });
        });
    },

    getById: function(id, isoCode = 'es') {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(Config.VEHICLE_CATEGORIES.BY_ID(id, isoCode)),
                async: true,
                dataType: "json",
                statusCode: {
                    200: function(data) {
                        resolve(data);
                    },
                    404: function() {
                        reject("Categoría no encontrada");
                    },
                    400: function() {
                        reject("ID de categoría inválido");
                    },
                    500: function() {
                        reject("Error al obtener la categoría");
                    }
                }
            });
        });
    }
};

export default VehicleCategoryService;