import LoginService from "../services/LoginService.js";
import sessionController from "./SessionController.js";

export class LoginController {
    constructor(view, router) {
        this.view = view;
        this.router = router;
        this.modal = document.getElementById("loginModal");
    }

    init() {
        this.view.render();
        this.setupModalListeners();  
        this.setupFormListeners();  
    }

    setupModalListeners() {
        // Cerrar modal con la X
        const closeBtn = this.modal?.querySelector(".btn-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                this.hide();
            });
        }

        // Cerrar modal clicando fuera
        if (this.modal) {
            this.modal.addEventListener("click", (e) => {
                if (e.target === this.modal) {
                    this.hide();
                }
            });
        }
    }

    // Eventos dentro del formulario de login
    setupFormListeners() {
        this.view.$container.addEventListener("click", async (e) => {
            if (e.target.id === "loginButton") {
                e.preventDefault();

                const username = document.getElementById("username")?.value.trim();
                const password = document.getElementById("password")?.value;
                const type = document.querySelector('input[name="loginType"]:checked')?.value || "user";
                const out = document.getElementById("login-result");

                if (!username || !password) {
                    if (out) {
                        out.textContent = "Por favor, completa usuario y contraseña";
                        out.style.color = "red";
                    }
                    return;
                }

                try {
                    const data = (type === "user")
                        ? await LoginService.loginUser({ username, password })
                        : await LoginService.loginEmployee({ username, password });

                    sessionController.setLoggedInUser({ username, loginType: type }, data.token);

                    // Cerrar modal tras login exitoso
                    this.hide();

                    // Recargar la ruta actual para aplicar el layout privado
                    if (this.router) {
                        this.router.route();
                    }

                    console.log("✅ Login exitoso");
                } catch (error) {
                    if (out) {
                        out.textContent = "Error: " + (error.message || "Credenciales inválidas");
                        out.style.color = "red";
                    }
                }
            }
        });
    }

    /**
     * Maneja el logout (llamado desde LayoutManager)
     */
    handleLogout() {
        sessionController.logOut();
        
        // Cerrar modal si estaba abierto
        this.hide();

        // Ir a home y recargar layout
        if (this.router) {
            this.router.goTo('home');
        }

        console.log("✅ Logout exitoso");
    }

    show() {
        this.modal?.classList.add("active");
        this.view.render();
    }

    hide() {
        this.modal?.classList.remove("active");
    }
}