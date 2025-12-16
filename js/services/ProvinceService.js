import Config from "../config/Config.js";

const ProvinceService = {

    findAll() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(Config.PROVINCES.ALL),
                dataType: "json",
                statusCode: {
                    200: data => resolve(data),
                    204: () => resolve([]),
                    500: () => reject("Error al obtener las provincias")
                }
            });
        });
    },

    findById(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(Config.PROVINCES.BY_ID(id)),
                dataType: "json",
                statusCode: {
                    200: data => resolve(data),
                    400: () => reject("ID de provincia inválido"),
                    404: () => reject("Provincia no encontrada"),
                    500: () => reject("Error al obtener la provincia")
                }
            });
        });
    },

    create(province, token) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: Config.getFullUrl(Config.PROVINCES.CREATE),
                contentType: "application/json",
                data: JSON.stringify(province),
                headers: { Authorization: "Bearer " + token },
                dataType: "json",
                statusCode: {
                    201: data => resolve(data),
                    400: () => reject("Datos de provincia inválidos"),
                    500: () => reject("Error al crear la provincia")
                }
            });
        });
    },

    update(id, province, token) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "PUT",
                url: Config.getFullUrl(Config.PROVINCES.UPDATE(id)),
                contentType: "application/json",
                data: JSON.stringify(province),
                headers: { Authorization: "Bearer " + token },
                dataType: "json",
                statusCode: {
                    200: data => resolve(data),
                    400: () => reject("Datos inválidos"),
                    404: () => reject("Provincia no encontrada"),
                    500: () => reject("Error al actualizar la provincia")
                }
            });
        });
    },

    delete(id, token) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "DELETE",
                url: Config.getFullUrl(Config.PROVINCES.DELETE(id)),
                headers: { Authorization: "Bearer " + token },
                statusCode: {
                    200: () => resolve(true),
                    400: () => reject("ID inválido"),
                    404: () => reject("Provincia no encontrada"),
                    500: () => reject("Error al eliminar la provincia")
                }
            });
        });
    }

};

export default ProvinceService;