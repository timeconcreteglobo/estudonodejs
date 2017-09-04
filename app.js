var express = require('express'), 
http = require("http"),
bodyParser = require("body-parser")
client = require("./config/client");
routes = require("./routes");


var app = express();

app.use(bodyParser.json());
app.use(routes);   


var server = app.listen(4000, function(){
console.log("Servidor rodando na porta 4000");
});







