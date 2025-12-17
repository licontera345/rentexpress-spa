export class Router {
    constructor(routes) {
        this.routes = routes; // Map: {'home': controller, 'reservations': controller}
        this.currentController = null;
        this.publicRoutes = ['home', 'catalog']; // Rutas públicas
        
        // Escuchar cambios en el hash
        window.addEventListener('hashchange', () => this.route());
    }

    // Método público para navegar
    goTo(path) {
        window.location.hash = path;
    }

    // Método principal de enrutamiento
    route() {
        // Obtener la ruta actual (por defecto 'home')
        const path = window.location.hash.slice(1) || 'home';
        const controller = this.routes[path];

        // Verificar si la ruta existe
        if (!controller) {
            console.error(`Ruta no encontrada: ${path}`);
            this.goTo('home'); // Redirigir a home
            return;
        }

        // Verificar autenticación para rutas privadas
        if (!this.isPublicRoute(path) && !this.isAuthenticated()) {
            console.warn(`Acceso denegado a ruta privada: ${path}`);
            alert('Debes iniciar sesión para acceder a esta sección');
            this.goTo('home'); // Redirigir a home
            return;
        }

        // Si hay un controlador activo diferente, ocultarlo
        if (this.currentController && this.currentController !== controller) {
            this.currentController.hide();
        }

        // Actualizar y mostrar el nuevo controlador
        this.currentController = controller;
        this.currentController.init();
        this.currentController.show();
    }

    // Verificar si es una ruta pública
    isPublicRoute(path) {
        return this.publicRoutes.includes(path);
    }

    // Verificar si el usuario está autenticado
    isAuthenticated() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('loggedInUser');
        return token !== null && user !== null;
    }

    // Obtener tipo de usuario (user o employee)
    getUserType() {
        const user = localStorage.getItem('loggedInUser');
        if (!user) return null;
        
        try {
            const userData = JSON.parse(user);
            return userData.loginType; // 'user' o 'employee'
        } catch (e) {
            return null;
        }
    }

    // Verificar permisos por tipo de usuario
    hasPermission(path) {
        const userType = this.getUserType();
        
        // Rutas solo para empleados
        const employeeRoutes = ['manage-vehicles', 'manage-rentals', 'reports'];
        
        // Rutas solo para usuarios
        const userRoutes = ['my-reservations', 'my-profile'];
        
        if (employeeRoutes.includes(path) && userType !== 'employee') {
            return false;
        }
        
        if (userRoutes.includes(path) && userType !== 'user') {
            return false;
        }
        
        return true;
    }
}