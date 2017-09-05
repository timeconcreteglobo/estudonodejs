var   express = require('express'), 
      bodyParser = require('body-parser'),
      client = require("./config/client");
      routesUsuario = require("./routes/usuario");


var app = express();


app.use(bodyParser.json());
app.use(routesUsuario);   


var server = app.listen(4000, function() {
      console.log("Servidor rodando na porta 4000...");
});


