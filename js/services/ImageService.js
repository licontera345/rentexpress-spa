import Config from "../config/Config.js";

/**
 * Servicio para gestionar imágenes de vehículos y avatares
 */
const ImageService = {

    // ==================== CACHÉ GLOBAL ====================
    _imageCache: new Map(),        // vehicleId → array completo de nombres de imágenes
    _thumbCache: new Map(),        // vehicleId → primera imagen (thumbnail)
    _cacheTimestamp: 0,
    _cacheDuration: 10 * 60 * 1000, // 10 minutos de caché (ajustable)

    /**
     * Lista todas las imágenes de un vehículo con caché inteligente
     */
    listVehicleImages(vehicleId) {
        const now = Date.now();

        // Devolver desde caché si está disponible y no ha expirado
        if (this._imageCache.has(vehicleId) && 
            now - this._cacheTimestamp < this._cacheDuration) {
            return Promise.resolve(this._imageCache.get(vehicleId));
        }

        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: Config.getFullUrl(`/open/file/vehicle/${vehicleId}`),
                dataType: "json",
                success: (data) => {
                    const images = data || [];
                    this._imageCache.set(vehicleId, images);
                    if (images.length > 0) {
                        this._thumbCache.set(vehicleId, images[0]);
                    }
                    this._cacheTimestamp = now;
                    resolve(images);
                },
                error: (xhr) => {
                    console.warn(`Error listando imágenes del vehículo ${vehicleId}: ${xhr.status}`);
                    // En caso de rate limit o error, devolvemos array vacío para no romper la UI
                    this._imageCache.set(vehicleId, []);
                    resolve([]);
                }
            });
        });
    },

    /**
     * Obtiene solo el thumbnail (más eficiente para listas grandes)
     */
    getVehicleThumbnail(vehicleId) {
        if (this._thumbCache.has(vehicleId)) {
            return Promise.resolve(this._thumbCache.get(vehicleId));
        }
        return this.listVehicleImages(vehicleId).then(images => 
            images.length > 0 ? images[0] : null
        );
    },

    /**
     * Invalida todo el caché (usar después de subir o eliminar imagen)
     */
    invalidateCache() {
        this._imageCache.clear();
        this._thumbCache.clear();
        this._cacheTimestamp = 0;
        console.log("Caché de imágenes invalidado");
    },

    // ==================== MÉTODOS EXISTENTES ====================

    getVehicleImageUrl(vehicleId, imageName) {
        return Config.getFullUrl(`/open/file/vehicle/${vehicleId}/${imageName}`);
    },

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

    // Avatares (sin cambios)
    getUserAvatarUrl(userId) {
        return Config.getFullUrl(`/open/file/user-avatar/${userId}`);
    },

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

    getEmployeeAvatarUrl(employeeId) {
        return Config.getFullUrl(`/open/file/employee-avatar/${employeeId}`);
    },

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