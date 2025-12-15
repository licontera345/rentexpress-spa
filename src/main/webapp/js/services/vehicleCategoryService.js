import Global from "../utils/variables.js";

const VehicleCategoryService = {
    
    /**
     * Obtiene todas las categorías de vehículos
     * @param {string} isoCode - Código de idioma (por defecto 'es')
     */
    getAll: function(isoCode = 'es') {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Global.API + "/open/vehicle-categories?isoCode=" + isoCode,
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

    /**
     * Obtiene una categoría por su ID
     * @param {number} id - ID de la categoría
     * @param {string} isoCode - Código de idioma (por defecto 'es')
     */
    getById: function(id, isoCode = 'es') {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Global.API + "/open/vehicle-categories/" + id + "?isoCode=" + isoCode,
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