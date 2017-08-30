var express = require('express'), 
http = require("http"),
bodyParser = require("body-parser")
client = require("./config/client");
routes = require("./routes");


var app = express();

app.use(bodyParser.json());
app.use(routes);


prop = require("./config/properties");
app.get("/token", function(request, response){
response.send("teste");
});


app.get("/usuario/:globoID",function(request, response){
       client.getUsuario(request.params.globoID, response);
 });


var server = app.listen(4000, function(){
console.log("Servidor rodando na porta 4000");
});







