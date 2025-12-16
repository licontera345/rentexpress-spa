import Config from "../config/Config.js";

const AddressService = {

    findById(id, token) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(Config.ADDRESSES.BY_ID(id)),
                headers: { Authorization: "Bearer " + token },
                dataType: "json",
                //success y error en vez de statusCode
                statusCode: {
                    200: data => resolve(data),
                    400: () => reject("ID de dirección inválido"),
                    404: () => reject("Dirección no encontrada"),
                    500: () => reject("Error al obtener la dirección")
                }
            });
        });
    },

    create(address, token) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: Config.getFullUrl(Config.ADDRESSES.CREATE),
                contentType: "application/json",
                data: JSON.stringify(address),
                headers: { Authorization: "Bearer " + token },
                dataType: "json",
                statusCode: {
                    201: data => resolve(data),
                    400: () => reject("Datos de dirección inválidos"),
                    500: () => reject("Error al crear la dirección")
                }
            });
        });
    },

    update(id, address, token) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "PUT",
                url: Config.getFullUrl(Config.ADDRESSES.UPDATE(id)),
                contentType: "application/json",
                data: JSON.stringify(address),
                headers: { Authorization: "Bearer " + token },
                dataType: "json",
                statusCode: {
                    200: data => resolve(data),
                    400: () => reject("Datos inválidos"),
                    404: () => reject("Dirección no encontrada"),
                    500: () => reject("Error al actualizar la dirección")
                }
            });
        });
    },

    delete(id, token) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "DELETE",
                url: Config.getFullUrl(Config.ADDRESSES.DELETE(id)),
                headers: { Authorization: "Bearer " + token },
                statusCode: {
                    200: () => resolve(true),
                    400: () => reject("ID inválido"),
                    404: () => reject("Dirección no encontrada"),
                    500: () => reject("Error al eliminar la dirección")
                }
            });
        });
    }

};

export default AddressService;