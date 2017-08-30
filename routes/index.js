var router = require('express').Router();
var client = require("../config/client");

router.get('/', function(request, response){
    console.log("passou");
response.send('ALOU FUNCIONOU');
});

router.get("/usuario/:globoID",function(request, response){
       client.getUsuario(request.params.globoID, response);
 });


module.exports = router;