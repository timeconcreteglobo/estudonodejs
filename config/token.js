var request = require("request");
var prop = require("./properties")

var getToken = request.post({url: prop.token_url + prop.grant_type, headers: prop.header_auth},function(error, response, body){
    console.log("Efetuando requisicao para obter token")
    var token = JSON.parse(body);
    console.log(prop.header_auth);
    console.log(token);
});


module.exports = getToken;



