export class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentController = null;
        this.publicRoutes = ['home', 'catalog'];

        window.addEventListener('hashchange', () => this.route());
        this.route();
    }

    goTo(path) {
        window.location.hash = path;
    }

    route() {
        const path = window.location.hash.slice(1) || 'home';
        const controller = this.routes[path];

        if (!controller) {
            console.error(`Ruta no encontrada: ${path}`);
            this.goTo('home');
            return;
        }

        // Verificar autenticación para rutas privadas
        if (!this.isPublicRoute(path) && !this.isAuthenticated()) {
            console.warn(`Acceso denegado a ruta privada: ${path}`);
            alert('Debes iniciar sesión para acceder a esta sección');
            this.goTo('home');
            return;
        }

        // Ocultar controlador anterior
        if (this.currentController && this.currentController !== controller) {
            this.currentController.hide();
        }

        this.currentController = controller;
        this.currentController.init();
        this.currentController.show();
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

        const employeeRoutes = ['manage-vehicles', 'manage-rentals', 'reports'];
        const userRoutes = ['my-reservations', 'my-profile'];

        if (employeeRoutes.includes(path) && userType !== 'employee') return false;
        if (userRoutes.includes(path) && userType !== 'user') return false;

        return true;
    }
}