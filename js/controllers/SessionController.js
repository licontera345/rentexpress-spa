export class SessionController {
    setLoggedInUser(user, token) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        localStorage.setItem("token", token);
    }

    logOut() {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("token");
    }

    isLoggedIn() {
        return localStorage.getItem("token") !== null && localStorage.getItem("loggedInUser") !== null;
    }

    getLoggedInUser() {
        const user = localStorage.getItem("loggedInUser");
        return user ? JSON.parse(user) : null;
    }

    getToken() {
        return localStorage.getItem("token");
    }
}

export default new SessionController();