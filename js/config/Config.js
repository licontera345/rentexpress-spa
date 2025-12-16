/**
 * Configuración centralizada de la aplicación
 * Contiene todas las URLs de los endpoints de la API
 */
const Config = {
    // URL base de la API
    API_BASE_URL: "http://94.130.104.92:8084/rentexpress-rest-api/api",
    // API_BASE_URL: "http://localhost:8080/rentexpress-rest-api/api",

    // Endpoints de Autenticación
    AUTH: {
        LOGIN_USER: "/users/open/authenticate",
        LOGIN_EMPLOYEE: "/employees/open/authenticate"
    },

    // Endpoints de Vehículos
    VEHICLES: {
        BASE: "/vehicles",
        OPEN: "/vehicles/open",
        BY_ID: (id) => `/vehicles/open/${id}`,
        SEARCH: "/vehicles/open/search",
        CREATE: "/vehicles",
        UPDATE: (id) => `/vehicles/${id}`,
        DELETE: (id) => `/vehicles/${id}`
    },

    // Endpoints de Categorías de Vehículos
    VEHICLE_CATEGORIES: {
        ALL: (isoCode) => `/open/vehicle-categories?isoCode=${isoCode}`,
        BY_ID: (id, isoCode) => `/open/vehicle-categories/${id}?isoCode=${isoCode}`
    },

    // Endpoints de Sedes (Headquarters)
    HEADQUARTERS: {
        ALL: "/headquarters/open",
        BY_ID: (id) => `/headquarters/open/${id}`
    },

    // Endpoints de Provincias
    PROVINCES: {
        ALL: "/provinces",
        BY_ID: (id) => `/provinces/${id}`,
        CREATE: "/provinces",
        UPDATE: (id) => `/provinces/${id}`,
        DELETE: (id) => `/provinces/${id}`
    },

    // Endpoints de Ciudades
    CITIES: {
        ALL: "/cities/open",
        BY_ID: (id) => `/cities/${id}`,
        BY_PROVINCE: (provinceId) => `/cities/province/${provinceId}`,
        CREATE: "/cities",
        UPDATE: (id) => `/cities/${id}`,
        DELETE: (id) => `/cities/${id}`
    },

    // Endpoints de Direcciones
    ADDRESSES: {
        BY_ID: (id) => `/addresses/${id}`,
        CREATE: "/addresses",
        UPDATE: (id) => `/addresses/${id}`,
        DELETE: (id) => `/addresses/${id}`
    },

    // Método auxiliar para construir URLs completas
    getFullUrl(endpoint) {
        return this.API_BASE_URL + endpoint;
    }
};

export default Config;