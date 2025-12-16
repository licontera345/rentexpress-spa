import LOGINVIEW from "../views/LoginView.js";
import LoginService from "../services/LoginService.js";
import sessionController from "./SessionController.js";

const LoginController = {
    init() {
        LOGINVIEW.render();
        this.updateUI();
        this.setupEventListeners();
    },

    updateUI() {
        const isLogged = sessionController.isLoggedIn();
        
        document.getElementById("btnLogin").style.display = isLogged ? "none" : "inline-block";
        document.getElementById("btnLogout").style.display = isLogged ? "inline-block" : "none";

        const loginSec = document.querySelector('.login-section');
        const catalogSec = document.querySelector('.catalog-section');
        const logoutView = document.getElementById("logoutFromView");

        if (loginSec) loginSec.style.display = isLogged ? "none" : "block";
        if (catalogSec) catalogSec.style.gridColumn = isLogged ? "1 / -1" : "auto";
        if (logoutView) logoutView.style.display = isLogged ? "block" : "none";
    },

    setupEventListeners() {
        document.body.onclick = async (e) => {
            const id = e.target.id;

            if (id === "loginButton") {
                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;
                const type = document.querySelector('input[name="loginType"]:checked').value;
                const out = document.getElementById("login-result");

                try {
                    const data = (type === "user") 
                        ? await LoginService.loginUser({ username, password })
                        : await LoginService.loginEmployee({ username, password });

                    sessionController.setLoggedInUser({ username, loginType: type }, data.token);
                    this.updateUI();
                } catch (error) {
                    out.textContent = "Error: " + error.message;
                    out.style.color = "red";
                }
            }

            if (id === "btnLogout" || id === "logoutFromView") {
                sessionController.logOut();
                this.init(); // Reinicia todo
            }
        };
    }
};

export default LoginController;