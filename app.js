var express = require('express'), 
http = require("http"),
bodyParser = require("body-parser")
token = require("./config/token");
routes = require("./routes");


var app = express();

app.use(bodyParser.json());
app.use(routes);


prop = require("./config/properties");
app.get("/token", function(request, response){ 
response.send(prop.client_id);
});


var server = app.listen(4000, function(){

console.log("Servidor rodando na porta 4000");
});







