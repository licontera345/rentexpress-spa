const sessionController = {
    currentView: "",
    setLoggedInUser: function (user, token) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        localStorage.setItem("token", token);
    },


    logOut: function () {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("token");
    },


    isLoggedIn: function () {
        let token = localStorage.getItem("token");
        let user = localStorage.getItem("loggedInUser");
        return token != null && user != null;
    },

    
    getLoggedInUser: function () {
        let user = localStorage.getItem("loggedInUser");
        return JSON.parse(localStorage.getItem("loggedInUser"));
    },


    setToken: function (token) {
        localStorage.setItem("token", token);
    },


    getToken: function () {
        return localStorage.getItem("token");
    },

};

export default sessionController;