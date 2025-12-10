const LOGINVIEW = {

    container: "#login-view",

    render() {
        const c = document.querySelector(this.container);
        if (!c) {
            return;
        }
        const html = `
            Tipo de acceso:
            <br>
            <label>
                <input type="radio" name="loginType" value="user" checked> Usuario
            </label>
            <label>
                <input type="radio" name="loginType" value="employee"> Empleado
            </label>
            <br><br>

            UserName: <input type="text" id="username">
            <br><br>

            Password: <input type="password" id="password">
            <br><br>

            <button id="loginButton">Login</button>
            
            <br><br>
            <div id="login-result"></div>
        `;
        c.innerHTML = html;
    }
};

export default LOGINVIEW;
