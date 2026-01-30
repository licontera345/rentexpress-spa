import { PublicLayout } from "./PublicLayout.js";
import { PrivateLayout } from "./PrivateLayout.js";

/**
 * Gestor de layouts (público vs privado)
 * Responsabilidades:
 * - Cambiar entre layout público y privado
 * - Coordinar con el LoginController para logout
 * - Actualizar el layout según el estado de autenticación
 */
export class LayoutManager {
    constructor(loginController) {
        this.publicLayout = new PublicLayout();
        this.privateLayout = new PrivateLayout();
        this.loginController = loginController;
        this.router = null; // Se inyecta después
        this.currentLayout = null;

        console.log('🎨 LayoutManager creado');
    }

    /**
     * Actualizar el layout según el estado de autenticación
     * @param {boolean} isAuthenticated - Si el usuario está autenticado
     */
    updateLayout(isAuthenticated) {
        if (isAuthenticated) {
            this.switchToPrivate();
        } else {
            this.switchToPublic();
        }
    }

    /**
     * Cambiar a layout público
     */
    switchToPublic() {
        // No hacer nada si ya estamos en público
        if (this.currentLayout === 'public') {
            console.log('📌 Ya en layout público');
            return;
        }

        console.log('🔄 Cambiando a layout público');

        // Ocultar layout privado si estaba activo
        if (this.currentLayout === 'private') {
            this.privateLayout.hide();
        }

        // Renderizar y mostrar layout público
        this.publicLayout.render();
        this.publicLayout.setupEventListeners(() => this.handleLoginClick());
        this.publicLayout.show();

        // Ajustar el main
        const main = document.querySelector("main");
        if (main) {
            main.classList.remove("main-with-sidebar");
            main.classList.add("main-full-width");
        }

        this.currentLayout = 'public';
        console.log('✅ Layout público activado');
    }

    /**
     * Cambiar a layout privado
     */
    switchToPrivate() {
        // Si ya estamos en privado, solo actualizar listeners
        if (this.currentLayout === 'private') {
            console.log('📌 Ya en layout privado, actualizando...');
            this.privateLayout.setupEventListeners(
                () => this.handleLogout(),
                this.router
            );
            return;
        }

        console.log('🔄 Cambiando a layout privado');

        // Ocultar layout público si estaba activo
        if (this.currentLayout === 'public') {
            this.publicLayout.hide();
        }

        // Renderizar y mostrar layout privado
        this.privateLayout.render();
        this.privateLayout.setupEventListeners(
            () => this.handleLogout(),
            this.router
        );
        this.privateLayout.show();

        // Ajustar el main
        const main = document.querySelector("main");
        if (main) {
            main.classList.remove("main-full-width");
            main.classList.add("main-with-sidebar");
        }

        this.currentLayout = 'private';
        console.log('✅ Layout privado activado');
    }

    /**
     * Manejar click en el botón de login (layout público)
     */
    handleLoginClick() {
        console.log('🔐 Abriendo modal de login');
        if (this.loginController) {
            this.loginController.showModal();
        }
    }

    /**
     * Manejar logout (layout privado)
     */
    handleLogout() {
        console.log('🚪 Procesando logout');
        if (this.loginController) {
            this.loginController.handleLogout();
        }
    }
}