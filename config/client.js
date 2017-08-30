var prop = require("./properties");
var request = require("request");
global.token_atual = "";




function doGet(rota,responseCallBack){
    objRequisicao = {
        url : rota, 
        headers: { 
        "Authorization" : "Bearer " + token_atual}};
request.get(objRequisicao, function(error, resp, body) {
     console.log(objRequisicao);
       if(!error && resp.statusCode / 100 == 2){
          var retorno = JSON.parse(body);
         setTimeout(function () {
               responseCallBack.send(retorno);
        }, 200);
       }else if (resp.statusCode == 401){
           console.log(error + " = " + resp.statusCode);
            getToken();
            setTimeout(function () {
               doGet(rota,responseCallBack);
        }, 400);
         
       }
    })
}
    


function getToken(){
request.post({url: prop.token_url + prop.grant_type, headers: prop.header_auth},function(error, response, body){
var token = JSON.parse(body);
global.token_atual = token.access_token;
})};

function getUsuarioGlive(globoID ,response){
   var rota = prop.get_usuario_url + globoID;
    doGet(rota, response);
};

module.exports.getUsuario = getUsuarioGlive;



