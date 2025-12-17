import LoginService from "../services/LoginService.js";
import sessionController from "./SessionController.js";

export class LoginController {
    constructor(view, router) {
        this.view = view;
        this.router = router;
    }

    init() {
        this.view.render();
        this.updateUI();
        this.setupListeners();
    }

    updateUI() {
        const isLogged = sessionController.isLoggedIn();

        const btnLogin = document.getElementById("btnLogin");
        const btnLogout = document.getElementById("btnLogout");
        const loginSec = document.querySelector('.login-section');
        const catalogSec = document.querySelector('.catalog-section');
        const logoutView = document.getElementById("logoutFromView");

        if (btnLogin) btnLogin.style.display = isLogged ? "none" : "inline-block";
        if (btnLogout) btnLogout.style.display = isLogged ? "inline-block" : "none";
        if (loginSec) loginSec.style.display = isLogged ? "none" : "block";
        if (catalogSec) catalogSec.style.gridColumn = isLogged ? "1 / -1" : "auto";
        if (logoutView) logoutView.style.display = isLogged ? "block" : "none";
    }

    setupListeners() {
        // Usamos this.view.$container para delegar eventos (más seguro después de render)
        if (!this.view.$container) return;

        this.view.$container.onclick = async (e) => {
            const id = e.target.id;

            if (id === "loginButton") {
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

                    // Opcional: ir al catálogo o home después de login
                    // this.router?.goTo('catalog');
                } catch (error) {
                    if (out) {
                        out.textContent = "Error: " + (error.message || "Credenciales inválidas");
                        out.style.color = "red";
                    }
                }
            }

            if (id === "btnLogout" || id === "logoutFromView") {
                sessionController.logOut();
                this.updateUI();
                if (this.router) {
                    this.router.goTo('home');
                }
            }
        };
    }

    show() {
        this.view.show();
    }

    hide() {
        this.view.hide();
    }
}