import Config from "../config/Config.js";

const LoginService = {

  loginUser: function (credentials) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: "POST",
        url: Config.getFullUrl(Config.AUTH.LOGIN_USER),
        data: JSON.stringify(credentials),
        contentType: "application/json",
        statusCode: {
          200: function (data) { resolve(data); },
          400: function () { reject("faltan datos"); },
          401: function () { reject("usuario o contraseña incorrectos"); },
          500: function () { reject("error de autenticación"); }
        }
      });
    });
  },

  loginEmployee: function (credentials) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        type: "POST",
        url: Config.getFullUrl(Config.AUTH.LOGIN_EMPLOYEE),
        data: JSON.stringify(credentials),
        contentType: "application/json",
        statusCode: {
          200: function (data) { resolve(data); },
          400: function () { reject("faltan datos"); },
          401: function () { reject("usuario o contraseña incorrectos"); },
          500: function () { reject("error de autenticación"); }
        }
      });
    });
  }

};

export default LoginService;