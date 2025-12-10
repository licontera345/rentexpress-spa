import LOGINVIEW from "../views/loginView.js";
import LoginService from "../services/loginService.js";
import sessionController from "../controllers/sessionController.js";

const LoginController = {

    init() {
        LOGINVIEW.render();
        this.updateNavButtons();
        this.setupEventListeners();
    },
    updateNavButtons() {
        const btnLogin = document.getElementById("btnLogin");
        const btnLogout = document.getElementById("btnLogout");

        if (sessionController.isLoggedIn()) {
            if (btnLogin) btnLogin.style.display = "none";
            if (btnLogout) btnLogout.style.display = "block";
        } else {
            if (btnLogin) btnLogin.style.display = "block";
            if (btnLogout) btnLogout.style.display = "none";
        }
    },


    setupEventListeners() {
        const loginButton = document.getElementById("loginButton");
        const btnLogout = document.getElementById("btnLogout");
        const logoutFromView = document.getElementById("logoutFromView");

       if (loginButton) {
            loginButton.addEventListener("click", async () => {

                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;
                const loginType = document.querySelector('input[name="loginType"]:checked').value; 

                const credentials = {
                    username: username,
                    password: password
                };

                try {
                    let data;

                    if (loginType === "user") {
                        data = await LoginService.loginUser(credentials);
                    } else {
                        data = await LoginService.loginEmployee(credentials);
                    }

                    // Guardar en sessionController
                    sessionController.setLoggedInUser(
                        { username: username, loginType: loginType },
                        data.token
                    );

                    const out = document.getElementById("login-result");
                    if (out) {
                        out.textContent = "LOGIN EXITOSO" + username;
                        console.log("TOKEN: " + data.token);

                    }
                    this.updateNavButtons();
                    


                    setTimeout(() => {
                        window.location.href = "#home";
                        const btnHome = document.getElementById("btnHome");
                        if (btnHome) btnHome.click();
                    }, 1000);

                } catch (error) {
                    const out = document.getElementById("login-result");
                    if (out) {
                        out.textContent = "ERROR DE LOGIN: " + error;
                    }
                }


            });


        }

        if (btnLogout) {
            btnLogout.addEventListener("click", () => {
                this.logout();
            });
        }

        if (logoutFromView) {
            logoutFromView.addEventListener("click", (e) => {
                this.logout();
            });
        }
    },
    logout() {
        sessionController.logOut();
        this.updateNavButtons();
        LOGINVIEW.render();
        this.setupEventListeners();

        window.location.href = "#login";
        const btnLogin = document.getElementById("btnLogin");
        if (btnLogin) btnLogin.click();

        console.log("Usuario deslogueado");

    }


};

export default LoginController;
