import Config from "../config/Config.js";

const VehicleService = {

    findById(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(Config.VEHICLES.BY_ID(id)),
                dataType: "json",
                statusCode: {
                    200: data => resolve(data),
                    400: () => reject("ID de vehículo inválido"),
                    404: () => reject("Vehículo no encontrado"),
                    500: () => reject("Error al obtener el vehículo")
                }
            });
        });
    },

    create(vehicle, token) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: Config.getFullUrl(Config.VEHICLES.CREATE),
                contentType: "application/json",
                data: JSON.stringify(vehicle),
                headers: { Authorization: "Bearer " + token },
                dataType: "json",
                statusCode: {
                    201: data => resolve(data),
                    400: () => reject("Datos de vehículo inválidos"),
                    500: () => reject("Error al crear el vehículo")
                }
            });
        });
    },

    update(id, vehicle, token) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "PUT",
                url: Config.getFullUrl(Config.VEHICLES.UPDATE(id)),
                contentType: "application/json",
                data: JSON.stringify(vehicle),
                headers: { Authorization: "Bearer " + token },
                dataType: "json",
                statusCode: {
                    200: data => resolve(data),
                    400: () => reject("Datos inválidos"),
                    404: () => reject("Vehículo no encontrado"),
                    500: () => reject("Error al actualizar el vehículo")
                }
            });
        });
    },

    delete(id, token) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "DELETE",
                url: Config.getFullUrl(Config.VEHICLES.DELETE(id)),
                headers: { Authorization: "Bearer " + token },
                statusCode: {
                    200: () => resolve(true),
                    400: () => reject("ID inválido"),
                    404: () => reject("Vehículo no encontrado"),
                    500: () => reject("Error al eliminar el vehículo")
                }
            });
        });
    },

    search(criteria) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(Config.VEHICLES.SEARCH),
                data: criteria,
                dataType: "json",
                statusCode: {
                    200: data => resolve(data),
                    204: () => resolve({ results: [] }),
                    400: () => reject("Criterios inválidos"),
                    500: () => reject("Error en la búsqueda")
                }
            });
        });
    }

};

export default VehicleService;