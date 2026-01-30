import LoginService from "../services/LoginService.js";
import sessionController from "./SessionController.js";

/**
 * Controlador del modal de login
 * NO hereda de BaseController porque es un modal (componente global)
 */
export class LoginController {
    constructor(view) {
        this.view = view;
        this.router = null;
        this.modal = document.getElementById("loginModal");
        
        this.initialize();
    }

    /**
     * Inicializar el controlador
     */
    initialize() {
        // Renderizar la vista
        this.view.render();

        // Configurar listeners del modal
        this.setupModalListeners();

        // Configurar listeners del formulario
        this.setupFormListeners();
    }

    /**
     * Configurar listeners del modal
     */
    setupModalListeners() {
        if (!this.modal) {
            console.error('Modal de login no encontrado');
            return;
        }

        // Cerrar con botón X
        const closeBtn = this.modal.querySelector(".btn-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                this.hideModal();
            });
        }

        // Cerrar con click fuera del modal
        this.modal.addEventListener("click", (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });
    }

    /**
     * Configurar listeners del formulario
     */
    setupFormListeners() {
        const container = this.view.$container;
        if (!container) return;

        container.addEventListener("click", async (e) => {
            if (e.target.id === "loginButton") {
                e.preventDefault();
                await this.handleLogin();
            }
        });
    }

    /**
     * Manejar el proceso de login
     */
    async handleLogin() {
        const username = document.getElementById("username")?.value.trim();
        const password = document.getElementById("password")?.value;
        const type = document.querySelector('input[name="loginType"]:checked')?.value || "user";

        // Validar campos
        if (!username || !password) {
            this.showError("Por favor, completa usuario y contraseña");
            return;
        }

        console.log(`🔐 Intentando login como ${type}: ${username}`);

        try {
            // Llamar al servicio de login
            const data = (type === "user")
                ? await LoginService.loginUser({ username, password })
                : await LoginService.loginEmployee({ username, password });

            // Guardar sesión
            sessionController.setLoggedInUser({ username, loginType: type }, data.token);

            console.log("✅ Login exitoso");

            // Cerrar modal
            this.hideModal();

            // Recargar la ruta actual para aplicar el layout privado
            if (this.router) {
                this.router.route();
            }
        } catch (error) {
            console.error("❌ Error en login:", error);
            this.showError("Error: " + (error.message || "Credenciales inválidas"));
        }
    }

    /**
     * Manejar el logout
     */
    handleLogout() {
        console.log("🚪 Cerrando sesión");

        sessionController.logOut();
        
        this.hideModal();

        // Ir a home y recargar layout
        if (this.router) {
            this.router.goTo('home');
        }

        console.log("✅ Logout exitoso");
    }

    /**
     * Mostrar mensaje de error
     */
    showError(message) {
        const out = document.getElementById("login-result");
        if (out) {
            out.textContent = message;
            out.style.color = "red";
        }
    }

    /**
     * Limpiar mensaje de error
     */
    clearError() {
        const out = document.getElementById("login-result");
        if (out) {
            out.textContent = "";
        }
    }

    /**
     * Mostrar el modal
     */
    showModal() {
        if (this.modal) {
            this.modal.classList.add("active");
            this.clearError();
            
            // Limpiar campos
            const username = document.getElementById("username");
            const password = document.getElementById("password");
            if (username) username.value = "";
            if (password) password.value = "";
        }
    }

    /**
     * Ocultar el modal
     */
    hideModal() {
        if (this.modal) {
            this.modal.classList.remove("active");
            this.clearError();
        }
    }
}