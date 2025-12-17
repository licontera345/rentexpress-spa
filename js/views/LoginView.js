export class LoginView {
    constructor() {
        this.containerSelector = "#login-view";
        this.$container = document.querySelector(this.containerSelector);
    }

    render() {
        if (!this.$container) return;

        const html = `
            <div class="login-form">
                <p>Tipo de acceso:</p>
                <label>
                    <input type="radio" name="loginType" value="user" checked> Usuario
                </label>
                <label>
                    <input type="radio" name="loginType" value="employee"> Empleado
                </label>
                <br><br>

                UserName: <input type="text" id="username"><br><br>
                Password: <input type="password" id="password"><br><br>

                <button id="loginButton">Login</button>
                <br><br>
                <div id="login-result"></div>
            </div>
        `;

        this.$container.innerHTML = html;
    }

    show() {if (this.$container) this.$container.style.display = "block"; }

    hide() {if (this.$container) this.$container.style.display = "none";}
}