import Config from "../config/Config.js";

const CityService = {

    findAll() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(Config.CITIES.ALL),
                dataType: "json",
                statusCode: {
                    200: data => resolve(data),
                    204: () => resolve([]),
                    500: () => reject("Error al obtener las ciudades")
                }
            });
        });
    },

    findById(id, token) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(Config.CITIES.BY_ID(id)),
                headers: { Authorization: "Bearer " + token },
                dataType: "json",
                statusCode: {
                    200: data => resolve(data),
                    400: () => reject("ID de ciudad inválido"),
                    404: () => reject("Ciudad no encontrada"),
                    500: () => reject("Error al obtener la ciudad")
                }
            });
        });
    },

    findByProvinceId(provinceId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(Config.CITIES.BY_PROVINCE(provinceId)),
                dataType: "json",
                statusCode: {
                    200: data => resolve(data),
                    204: () => resolve([]),
                    400: () => reject("ID de provincia inválido"),
                    500: () => reject("Error al obtener las ciudades")
                }
            });
        });
    },

    create(city) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: Config.getFullUrl(Config.CITIES.CREATE),
                contentType: "application/json",
                data: JSON.stringify(city),
                dataType: "json",
                statusCode: {
                    201: data => resolve(data),
                    400: () => reject("Datos de ciudad inválidos"),
                    500: () => reject("Error al crear la ciudad")
                }
            });
        });
    },

    update(id, city) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "PUT",
                url: Config.getFullUrl(Config.CITIES.UPDATE(id)),
                contentType: "application/json",
                data: JSON.stringify(city),
                dataType: "json",
                statusCode: {
                    200: data => resolve(data),
                    400: () => reject("Datos inválidos"),
                    404: () => reject("Ciudad no encontrada"),
                    500: () => reject("Error al actualizar la ciudad")
                }
            });
        });
    },

    delete(id) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "DELETE",
                url: Config.getFullUrl(Config.CITIES.DELETE(id)),
                statusCode: {
                    200: () => resolve(true),
                    400: () => reject("ID inválido"),
                    404: () => reject("Ciudad no encontrada"),
                    500: () => reject("Error al eliminar la ciudad")
                }
            });
        });
    }

};

export default CityService;