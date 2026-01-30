/**
 * Router simplificado y predecible
 * Responsabilidades:
 * - Detectar cambios de ruta
 * - Validar permisos
 * - Activar el controlador correspondiente
 */
export class Router {
    constructor(routes, layoutManager) {
        this.routes = routes;
        this.layoutManager = layoutManager;
        this.currentController = null;
        
        // Rutas públicas (sin autenticación)
        this.publicRoutes = ['home', 'catalog'];
        
        // Rutas por rol
        this.employeeRoutes = ['manage-vehicles'];
        this.userRoutes = [];

        // Escuchar cambios de hash
        window.addEventListener('hashchange', () => this.route());
    }

    /**
     * Navegar a una ruta
     */
    goTo(path) {
        window.location.hash = path;
    }

    /**
     * Procesar la ruta actual
     */
    route() {
        const path = window.location.hash.slice(1) || 'home';
        const controller = this.routes[path];

        console.log(`📍 Routing to: ${path}`);

        // Validar que la ruta existe
        if (!controller) {
            console.error(`❌ Ruta no encontrada: ${path}`);
            this.goTo('home');
            return;
        }

        const isAuthenticated = this.isAuthenticated();
        const isPublic = this.publicRoutes.includes(path);

        // Actualizar layout según autenticación
        if (this.layoutManager) {
            this.layoutManager.updateLayout(isAuthenticated);
        }

        // Validar acceso a rutas privadas
        if (!isPublic && !isAuthenticated) {
            console.warn(`⚠️ Acceso denegado a ruta privada: ${path}`);
            alert('Debes iniciar sesión para acceder a esta sección');
            this.goTo('home');
            return;
        }

        // Validar permisos por rol
        if (!isPublic && isAuthenticated && !this.hasPermission(path)) {
            console.warn(`⚠️ Sin permisos para: ${path}`);
            alert('No tienes permisos para acceder a esta sección');
            this.goTo('home');
            return;
        }

        // Desactivar controlador anterior
        if (this.currentController && this.currentController !== controller) {
            this.currentController.deactivate();
        }

        // Activar nuevo controlador
        this.currentController = controller;
        this.currentController.activate();

        console.log(`✅ Ruta cargada: ${path}`);
    }

    /**
     * Verificar si el usuario está autenticado
     */
    isAuthenticated() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('loggedInUser');
        return token !== null && user !== null;
    }

    /**
     * Obtener tipo de usuario
     */
    getUserType() {
        const user = localStorage.getItem('loggedInUser');
        if (!user) return null;

        try {
            const userData = JSON.parse(user);
            return userData.loginType;
        } catch (e) {
            return null;
        }
    }

    /**
     * Verificar permisos para una ruta
     */
    hasPermission(path) {
        const userType = this.getUserType();

        if (this.employeeRoutes.includes(path) && userType !== 'employee') {
            return false;
        }

        if (this.userRoutes.includes(path) && userType !== 'user') {
            return false;
        }

        return true;
    }
}