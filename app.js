var express = require('express'), 
http = require("http"),
bodyParser = require("body-parser")
token = require("./config/token");


var app = express();

app.use(bodyParser.json());
routes = require("./routes");
app.use(routes);

app.get("/token", function(request, response){ 

var token = token();

console.log(token);
response.send(token);
});


var server = app.listen(4000, function(){

console.log("Servidor rodando na porta 4000");
});







