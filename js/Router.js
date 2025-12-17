/**
 * Router mejorado con soporte para layouts
 */
export class Router {
    constructor(routes, layoutManager) {
        this.routes = routes;
        this.layoutManager = layoutManager;
        this.currentController = null;
        this.publicRoutes = ['home', 'catalog'];
        this.employeeRoutes = ['manage-vehicles', 'manage-rentals', 'reports'];
        this.userRoutes = ['my-reservations', 'my-profile'];

        window.addEventListener('hashchange', () => this.route());
        this.route();
    }

    goTo(path) {
        window.location.hash = path;
    }

    route() {
        const path = window.location.hash.slice(1) || 'home';
        const controller = this.routes[path];

        console.log(`🔀 Routing to: ${path}`);

        if (!controller) {
            console.error(` Ruta no encontrada: ${path}`);
            this.goTo('home');
            return;
        }

        const isAuthenticated = this.isAuthenticated();
        const isPublic = this.isPublicRoute(path);

        // Actualizar layout según autenticación
        if (this.layoutManager) {
            this.layoutManager.updateLayout(isAuthenticated);
        }

        // Verificar autenticación para rutas privadas
        if (!isPublic && !isAuthenticated) {
            console.warn(`Acceso denegado a ruta privada: ${path}`);
            alert('Debes iniciar sesión para acceder a esta sección');
            this.goTo('home');
            return;
        }

        // Verificar permisos según rol
        if (!isPublic && isAuthenticated && !this.hasPermission(path)) {
            console.warn(`Sin permisos para: ${path}`);
            alert('No tienes permisos para acceder a esta sección');
            this.goTo('home');
            return;
        }

        // Ocultar controlador anterior
        if (this.currentController && this.currentController !== controller) {
            this.currentController.hide();
        }

        // Activar nuevo controlador
        this.currentController = controller;
        this.currentController.init();
        this.currentController.show();

        console.log(`Ruta cargada: ${path}`);
    }

    isPublicRoute(path) {
        return this.publicRoutes.includes(path);
    }

    isAuthenticated() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('loggedInUser');
        return token !== null && user !== null;
    }

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

    hasPermission(path) {
        const userType = this.getUserType();

        // Rutas solo para empleados
        if (this.employeeRoutes.includes(path) && userType !== 'employee') {
            return false;
        }

        // Rutas solo para usuarios
        if (this.userRoutes.includes(path) && userType !== 'user') {
            return false;
        }

        return true;
    }
}