/**
 * Controlador base con el ciclo de vida estándar
 * Todos los controladores heredan de esta clase
 */
export class BaseController {
    constructor(view) {
        this.view = view;
        this.router = null; // Se inyecta después
        this.isActive = false;
    }

    /**
     * Ciclo de vida: Activar el controlador
     * Se llama cuando el usuario navega a esta ruta
     */
    async activate() {
        if (this.isActive) {
            console.log(`⚠️ ${this.constructor.name} ya está activo`);
            return;
        }

        console.log(`▶️ Activando ${this.constructor.name}`);

        try {
            // 1. Cargar datos si es necesario
            await this.loadData();

            // 2. Renderizar la vista
            this.view.render(this.getData());

            // 3. Configurar event listeners
            this.setupEventListeners();

            // 4. Mostrar la vista
            this.view.show();

            this.isActive = true;
            console.log(`✅ ${this.constructor.name} activado`);
        } catch (error) {
            console.error(`❌ Error activando ${this.constructor.name}:`, error);
            this.handleError(error);
        }
    }

    /**
     * Ciclo de vida: Desactivar el controlador
     * Se llama cuando el usuario navega a otra ruta
     */
    deactivate() {
        if (!this.isActive) return;

        console.log(`⏹️ Desactivando ${this.constructor.name}`);

        // Limpiar event listeners
        this.cleanupEventListeners();

        // Ocultar la vista
        this.view.hide();

        this.isActive = false;
        console.log(`✅ ${this.constructor.name} desactivado`);
    }

    /**
     * Cargar datos necesarios para la vista
     * Debe ser sobrescrito por subclases si necesitan datos
     */
    async loadData() {
        // Sobrescribir en subclases si es necesario
    }

    /**
     * Obtener datos para pasar a la vista
     * Debe ser sobrescrito por subclases
     */
    getData() {
        return {};
    }

    /**
     * Configurar event listeners
     * Debe ser sobrescrito por subclases
     */
    setupEventListeners() {
        // Sobrescribir en subclases
    }

    /**
     * Limpiar event listeners
     * Debe ser sobrescrito por subclases si agregan listeners
     */
    cleanupEventListeners() {
        // Sobrescribir en subclases si es necesario
    }

    /**
     * Manejar errores
     */
    handleError(error) {
        console.error('Error en controlador:', error);
        alert('Ha ocurrido un error. Por favor, intenta de nuevo.');
    }

    /**
     * Navegar a otra ruta
     */
    navigateTo(path) {
        if (this.router) {
            this.router.goTo(path);
        } else {
            console.error('Router no disponible');
        }
    }
}