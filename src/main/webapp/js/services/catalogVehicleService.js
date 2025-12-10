import Global from "../utils/variables.js";

const CatalogVehicleService = {
getVehicles : function(){ 
      return new Promise((resolve, reject) => {
        $.ajax({
          type: "GET",
          url: Global.API + "/vehicles/open/search?pageNumber=1&pageSize=25",
          async: true,
          dataType: "json", // expected response data
          statusCode: {
            200: function(data) {
                resolve(data);},
            500: function() {reject("Error downloading catalogue");}
          }
        });
      });
    },

    // getVehicles() {
    //     return fetch(Global.API + "/vehicles/open/search?pageNumber=1&pageSize=25")
    //         .then(function (response) {
    //             if (!response.ok) {
    //                 throw new Error("Error al cargar el catálogo");
    //             }
    //             return response.json();
    //         })
    //         .then(function (data) {
    //             if (data && Array.isArray(data.results)) {
    //                 return data.results;
    //             } else {
    //                 return [];
    //             }
    //         });
    // }

};

export default CatalogVehicleService;