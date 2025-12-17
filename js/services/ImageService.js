import Config from "../config/Config.js";

/**
 * Servicio para gestionar imágenes de vehículos y avatares
 */
const ImageService = {

    /**
     * Lista todas las imágenes de un vehículo
     * @param {number} vehicleId - ID del vehículo
     * @returns {Promise<string[]>} - Array con nombres de imágenes
     */
    listVehicleImages(vehicleId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(`/open/file/vehicle/${vehicleId}`),
                dataType: "json",
                statusCode: {
                    200: (data) => resolve(data),
                    400: () => reject("ID de vehículo requerido"),
                    500: () => reject("Error al listar imágenes del vehículo")
                }
            });
        });
    },

    /**
     * Obtiene la URL completa de una imagen de vehículo
     * @param {number} vehicleId - ID del vehículo
     * @param {string} imageName - Nombre de la imagen
     * @returns {string} - URL completa de la imagen
     */
    getVehicleImageUrl(vehicleId, imageName) {
        return Config.getFullUrl(`/open/file/vehicle/${vehicleId}/${imageName}`);
    },

    /**
     * Obtiene los datos binarios de una imagen de vehículo
     * @param {number} vehicleId - ID del vehículo
     * @param {string} imageName - Nombre de la imagen
     * @returns {Promise<Blob>} - Blob con los datos de la imagen
     */
    getVehicleImage(vehicleId, imageName) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(`/open/file/vehicle/${vehicleId}/${imageName}`),
                xhrFields: {
                    responseType: 'blob'
                },
                statusCode: {
                    200: (data) => resolve(data),
                    400: () => reject("ID de vehículo e imagen requeridos"),
                    404: () => reject("Imagen de vehículo no encontrada"),
                    500: () => reject("Error al obtener imagen del vehículo")
                }
            });
        });
    },

    /**
     * Sube una imagen para un vehículo
     * @param {number} vehicleId - ID del vehículo
     * @param {File} file - Archivo de imagen
     * @returns {Promise<string>} - Mensaje de éxito
     */
    uploadVehicleImage(vehicleId, file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject("Archivo requerido");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            $.ajax({
                type: "POST",
                url: Config.getFullUrl(`/open/file/vehicle/${vehicleId}`),
                data: formData,
                processData: false,
                contentType: false,
                statusCode: {
                    201: (data) => resolve(data),
                    400: () => reject("Archivo inválido"),
                    500: () => reject("Error al subir imagen del vehículo")
                }
            });
        });
    },

    /**
     * Elimina una imagen de un vehículo
     * @param {number} vehicleId - ID del vehículo
     * @param {string} imageName - Nombre de la imagen
     * @returns {Promise<string>} - Mensaje de éxito
     */
    deleteVehicleImage(vehicleId, imageName) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "DELETE",
                url: Config.getFullUrl(`/open/file/vehicle/${vehicleId}/${imageName}`),
                statusCode: {
                    200: (data) => resolve(data),
                    400: () => reject("ID de vehículo e imagen requeridos"),
                    500: () => reject("Error al eliminar imagen del vehículo")
                }
            });
        });
    },

    /**
     * Obtiene la URL del avatar de un usuario
     * @param {number} userId - ID del usuario
     * @returns {string} - URL completa del avatar
     */
    getUserAvatarUrl(userId) {
        return Config.getFullUrl(`/open/file/user-avatar/${userId}`);
    },

    /**
     * Obtiene el avatar de un usuario
     * @param {number} userId - ID del usuario
     * @returns {Promise<Blob>} - Blob con los datos del avatar
     */
    getUserAvatar(userId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(`/open/file/user-avatar/${userId}`),
                xhrFields: {
                    responseType: 'blob'
                },
                statusCode: {
                    200: (data) => resolve(data),
                    400: () => reject("ID de usuario requerido"),
                    404: () => reject("Avatar no encontrado"),
                    500: () => reject("Error al obtener avatar del usuario")
                }
            });
        });
    },

    /**
     * Sube un avatar para un usuario
     * @param {number} userId - ID del usuario
     * @param {File} file - Archivo de imagen
     * @returns {Promise<string>} - Mensaje de éxito
     */
    uploadUserAvatar(userId, file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject("Archivo requerido");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            $.ajax({
                type: "POST",
                url: Config.getFullUrl(`/open/file/user-avatar/${userId}`),
                data: formData,
                processData: false,
                contentType: false,
                statusCode: {
                    201: (data) => resolve(data),
                    400: () => reject("Archivo inválido"),
                    500: () => reject("Error al subir avatar del usuario")
                }
            });
        });
    },

    /**
     * Obtiene la URL del avatar de un empleado
     * @param {number} employeeId - ID del empleado
     * @returns {string} - URL completa del avatar
     */
    getEmployeeAvatarUrl(employeeId) {
        return Config.getFullUrl(`/open/file/employee-avatar/${employeeId}`);
    },

    /**
     * Obtiene el avatar de un empleado
     * @param {number} employeeId - ID del empleado
     * @returns {Promise<Blob>} - Blob con los datos del avatar
     */
    getEmployeeAvatar(employeeId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(`/open/file/employee-avatar/${employeeId}`),
                xhrFields: {
                    responseType: 'blob'
                },
                statusCode: {
                    200: (data) => resolve(data),
                    400: () => reject("ID de empleado requerido"),
                    404: () => reject("Avatar no encontrado"),
                    500: () => reject("Error al obtener avatar del empleado")
                }
            });
        });
    },

    /**
     * Sube un avatar para un empleado
     * @param {number} employeeId - ID del empleado
     * @param {File} file - Archivo de imagen
     * @returns {Promise<string>} - Mensaje de éxito
     */
    uploadEmployeeAvatar(employeeId, file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject("Archivo requerido");
                return;
            }

            const formData = new FormData();
            formData.append("file", file);

            $.ajax({
                type: "POST",
                url: Config.getFullUrl(`/open/file/employee-avatar/${employeeId}`),
                data: formData,
                processData: false,
                contentType: false,
                statusCode: {
                    201: (data) => resolve(data),
                    400: () => reject("Archivo inválido"),
                    500: () => reject("Error al subir avatar del empleado")
                }
            });
        });
    }

};

export default ImageService;