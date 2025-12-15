import Global from "../utils/variables.js";

const CatalogVehicleService = {
getVehicles : function(){ 
      return new Promise((resolve, reject) => {
        $.ajax({
          type: "GET",
          url: Global.API + "/vehicles/open/search?pageNumber=1&pageSize=25",
          async: true,
          dataType: "json",
          statusCode: {
            200: function(data) {
                resolve(data);},
            500: function() {reject("Error downloading catalogue");}
          }
        });
      });
    },

};

export default CatalogVehicleService;