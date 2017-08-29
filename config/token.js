var request = require("request");

var token_url = "https://accounts.backstage.qa01.globoi.com/token";
var grant_type = "?grant_type=client_credentials";


var obterToken = function getToken(){
var client_id = "s6ZscywElv1DSRnV06kKsA==";
var client_secret = "evcOp0XX413KBmuQmlLQBg==";
var auth = "Basic "+ new Buffer(client_id + ":" + client_secret).toString("base64");
var header = {
    "Authorization" : auth
};

request.post({url: token_url + grant_type, headers: header},function(error, response, body){
    console.log("Efetuando requisicao para obter token");
    var token = JSON.parse(body);
    console.log(token);

})
return token;
}


module.exports = obterToken;



