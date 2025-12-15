import LOGINVIEW from "../views/loginView.js";
import LoginService from "../services/loginService.js";
import sessionController from "./sessionController.js";

const LoginController = {

    init() {
        console.log("Inicializando LoginController");
        LOGINVIEW.render();
        this.updateNavButtons();
        this.updateLoginVisibility();
        // Esperar a que el DOM se actualice
        setTimeout(() => this.setupEventListeners(), 100);
    },

    updateNavButtons() {
        const btnLogin = document.getElementById("btnLogin");
        const btnLogout = document.getElementById("btnLogout");

        if (sessionController.isLoggedIn()) {
            if (btnLogin) btnLogin.style.display = "none";
            if (btnLogout) btnLogout.style.display = "inline-block";
        } else {
            if (btnLogin) btnLogin.style.display = "inline-block";
            if (btnLogout) btnLogout.style.display = "none";
        }
    },

    updateLoginVisibility() {
        const loginSection = document.querySelector('.login-section');
        const catalogSection = document.querySelector('.catalog-section');
        const logoutFromView = document.getElementById("logoutFromView");

        if (sessionController.isLoggedIn()) {
            // Ocultar login y expandir catálogo
            if (loginSection) loginSection.style.display = "none";
            if (catalogSection) catalogSection.style.gridColumn = "1 / -1";
            if (logoutFromView) logoutFromView.style.display = "block";
        } else {
            // Mostrar login y catálogo normal
            if (loginSection) loginSection.style.display = "block";
            if (catalogSection) catalogSection.style.gridColumn = "auto";
            if (logoutFromView) logoutFromView.style.display = "none";
        }
    },

    setupEventListeners() {
        const loginButton = document.getElementById("loginButton");
        const btnLogout = document.getElementById("btnLogout");
        const logoutFromView = document.getElementById("logoutFromView");

        console.log("Configurando event listeners del login");
        console.log("loginButton encontrado:", !!loginButton);
        console.log("btnLogout encontrado:", !!btnLogout);
        console.log("logoutFromView encontrado:", !!logoutFromView);

        if (loginButton) {
            loginButton.addEventListener("click", async () => {
                console.log("Click en loginButton");

                const usernameInput = document.getElementById("username");
                const passwordInput = document.getElementById("password");
                const loginTypeInput = document.querySelector('input[name="loginType"]:checked');

                if (!usernameInput || !passwordInput || !loginTypeInput) {
                    console.error("Faltan campos del formulario");
                    return;
                }

                const username = usernameInput.value;
                const password = passwordInput.value;
                const loginType = loginTypeInput.value;

                if (!username || !password) {
                    const out = document.getElementById("login-result");
                    if (out) out.textContent = "Por favor complete todos los campos";
                    return;
                }

                const credentials = {
                    username: username,
                    password: password
                };

                try {
                    console.log("Intentando login como:", loginType);
                    let data;

                    if (loginType === "user") {
                        data = await LoginService.loginUser(credentials);
                    } else {
                        data = await LoginService.loginEmployee(credentials);
                    }

                    console.log("Login exitoso, guardando sesión");

                    // Guardar en sessionController
                    sessionController.setLoggedInUser(
                        { username: username, loginType: loginType },
                        data.token
                    );

                    const out = document.getElementById("login-result");
                    if (out) {
                        out.textContent = "LOGIN EXITOSO: " + username;
                        out.style.color = "green";
                    }

                    console.log("TOKEN guardado:", data.token);

                    // Actualizar visibilidad
                    this.updateNavButtons();
                    this.updateLoginVisibility();

                } catch (error) {
                    console.error("Error en login:", error);
                    const out = document.getElementById("login-result");
                    if (out) {
                        out.textContent = "ERROR DE LOGIN: " + error;
                        out.style.color = "red";
                    }
                }
            });
        } else {
            console.error("No se encontró el botón #loginButton");
        }

        if (btnLogout) {
            btnLogout.addEventListener("click", () => {
                console.log("Click en btnLogout");
                this.logout();
            });
        }

        if (logoutFromView) {
            logoutFromView.addEventListener("click", () => {
                console.log("Click en logoutFromView");
                this.logout();
            });
        }
    },

    logout() {
        console.log("Cerrando sesión");
        sessionController.logOut();
        this.updateNavButtons();
        this.updateLoginVisibility();
        LOGINVIEW.render();
        setTimeout(() => this.setupEventListeners(), 100);
    }
};

export default LoginController;