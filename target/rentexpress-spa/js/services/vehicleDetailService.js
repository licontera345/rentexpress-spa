import Global from "../utils/variables.js";

const VehicleDetailService = {
    getVehicleById: function(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Global.API + "/vehicles/open/" + id,
                async: true,
                dataType: "json",
                statusCode: {
                    200: function(data) { resolve(data); },
                    404: function() { reject("Vehículo no encontrado"); },
                    400: function() { reject("ID de vehículo inválido"); },
                    500: function() { reject("Error al obtener el vehículo"); }
                }
            });
        });
    }
};

export default VehicleDetailService;