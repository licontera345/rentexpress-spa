import Global from "../utils/variables.js";

const SedeService = {
    
    getAll: function() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Global.API + "/headquarters/open",
                async: true,
                dataType: "json",
                statusCode: {
                    200: function(data) {
                        resolve(data);
                    },
                    204: function() {
                        resolve([]);
                    },
                    500: function() {
                        reject("Error al obtener las sedes");
                    }
                }
            });
        });
    },

    getById: function(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Global.API + "/headquarters/open/" + id,
                async: true,
                dataType: "json",
                statusCode: {
                    200: function(data) {
                        resolve(data);
                    },
                    404: function() {
                        reject("Sede no encontrada");
                    },
                    400: function() {
                        reject("ID de sede inválido");
                    },
                    500: function() {
                        reject("Error al obtener la sede");
                    }
                }
            });
        });
    }
};

export default SedeService;