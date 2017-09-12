var router = require('express').Router();
var client = require("../config/client");

router.get('/', function(request, response){
    console.log("passou");
response.send('ALOU FUNCIONOU');
});

router.get("/usuario/email/:email",function(request, response){
      console.log("Chamando get por email"); 
      client.getUsuarioPorEmail(request.params.email, response);
 });

 router.get("/usuario/login/:login",function(request, response){
       client.getUsuarioPorUsername(request.params.login, response);
 });

 router.get("/usuario/:globoID",function(request, response){
       client.getUsuario(request.params.globoID, response);
 });


module.exports = router;