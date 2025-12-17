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
        this.updateUI();
        this.setupGlobalListeners();  
        this.setupFormListeners();  
    }

    updateUI() {
        const isLogged = sessionController.isLoggedIn();

        const btnLogin = document.getElementById("btnLogin");
        const btnLogout = document.getElementById("btnLogout");
        const logoutView = document.getElementById("logoutFromView");

        if (btnLogin) btnLogin.style.display = isLogged ? "none" : "inline-block";
        if (btnLogout) btnLogout.style.display = isLogged ? "inline-block" : "none";
        if (logoutView) logoutView.style.display = isLogged ? "block" : "none";

        // Si está logueado, cerramos el modal por si estaba abierto
        if (isLogged && this.modal) {
            this.modal.classList.remove("active");
        }
    }

    setupGlobalListeners() {
        const btnLogin = document.getElementById("btnLogin");
        if (btnLogin) {
            btnLogin.addEventListener("click", (e) => {
                e.preventDefault();
                this.modal?.classList.add("active");
                this.view.render();
            });
        }

        // Cerrar modal con la X
        const closeBtn = this.modal?.querySelector(".btn-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                this.modal.classList.remove("active");
            });
        }

        // Cerrar modal clicando fuera
        if (this.modal) {
            this.modal.addEventListener("click", (e) => {
                if (e.target === this.modal) {
                    this.modal.classList.remove("active");
                }
            });
        }

        // Botón Logout del header
        const btnLogout = document.getElementById("btnLogout");
        if (btnLogout) {
            btnLogout.addEventListener("click", (e) => {
                e.preventDefault();
                sessionController.logOut();
                this.updateUI();
                if (this.router) this.router.goTo('home');
            });
        }

        // Botón Cerrar Sesión dentro del modal
        const logoutView = document.getElementById("logoutFromView");
        if (logoutView) {
            logoutView.addEventListener("click", () => {
                sessionController.logOut();
                this.updateUI();
                if (this.router) this.router.goTo('home');
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
                    this.updateUI();

                    // Cerrar modal tras login exitoso
                    this.modal?.classList.remove("active");

                    // Opcional: ir al catálogo
                    // if (this.router) this.router.goTo('catalog');
                } catch (error) {
                    if (out) {
                        out.textContent = "Error: " + (error.message || "Credenciales inválidas");
                        out.style.color = "red";
                    }
                }
            }
        });
    }

    show() {
        this.modal?.classList.add("active");
        this.view.render();
    }

    hide() {
        this.modal?.classList.remove("active");
    }
}