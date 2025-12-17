import { PublicLayout } from "./PublicLayout.js";
import { PrivateLayout } from "./PrivateLayout.js";

/**
 * Gestiona el cambio entre layouts público y privado
 */
export class LayoutManager {
    constructor(loginController, router) {
        this.publicLayout = new PublicLayout();
        this.privateLayout = new PrivateLayout();
        this.loginController = loginController;
        this.router = router;
        this.currentLayout = null;
    }

    /**
     * Cambia al layout público
     */
    switchToPublic() {
        if (this.currentLayout === 'public') return;

        // Ocultar layout privado si estaba activo
        if (this.currentLayout === 'private') {
            this.privateLayout.hide();
        }

        // Renderizar y mostrar layout público
        this.publicLayout.render();
        this.publicLayout.setupEventListeners(this.loginController);
        this.publicLayout.show();

        this.currentLayout = 'public';
        
        // Ajustar clases del main para layout público
        const main = document.querySelector("main");
        if (main) {
            main.classList.remove("main-with-sidebar");
            main.classList.add("main-full-width");
        }
    }

    /**
     * Cambia al layout privado
     */
    switchToPrivate() {
        if (this.currentLayout === 'private') {
            // Solo actualizar sidebar para reflejar ruta activa
            this.privateLayout.setupEventListeners(
                () => this.handleLogout(), 
                this.router
            );
            return;
        }

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

        this.currentLayout = 'private';

        // Ajustar clases del main para layout privado (con sidebar)
        const main = document.querySelector("main");
        if (main) {
            main.classList.remove("main-full-width");
            main.classList.add("main-with-sidebar");
        }
    }

    /**
     * Maneja el logout
     */
    handleLogout() {
        if (this.loginController) {
            this.loginController.handleLogout();
        }
    }

    /**
     * Actualiza el layout según el estado de autenticación
     */
    updateLayout(isAuthenticated) {
        if (isAuthenticated) {
            this.switchToPrivate();
        } else {
            this.switchToPublic();
        }
    }
}