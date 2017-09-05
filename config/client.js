var prop = require("./properties");
var request = require("request");
var axios = require("axios");
var token_atual = "";
var responseBody = "";


function msgInfo(mensagem, codigo) {
    this.mensagem = mensagem;
    this.codigo = codigo;
}


function doGetAxios(rota) {
    console.log("doGetAxios");
    var responseGlive;
    authHeader = {timeout: 5000,headers: {"Authorization": "Bearer " + token_atual}};

    axios.get(rota, authHeader)
        .then(function (response) {
            getToken();
        }).then(function (response) {
            responseGlive = error.response;
            errorHeader = response.headers.via;
            statusCode = response.status;
            console.log("ResponseGlive: "+responseGlive);
        });
};


function getUsuarioPorEmail(login, responseCallBack) {
    console.log("getUsuarioPorEmail");
    var rota = prop.get_usuario_email_url + login;
    var retorno = doGetAxios(rota);
    responseCallBack.send(retorno.data);
};


function getToken() {
    request.post({ url: prop.token_url + prop.grant_type, headers: prop.header_auth }, function (error, response, body) {
        var token = JSON.parse(body);
        token_atual = token.access_token;
        console.log("Token obtido: " + token_atual);
    });
};

function getUsuarioGlive(globoID, responseCallBack) {
    var rota = prop.get_usuario_url + globoID;
    doGet(rota, responseCallBack);
};

function getUsuarioPorUsername(username, responseCallBack) {
    var rota = prop.get_usuario_username_url + username;
    doGet(rota, responseCallBack);


};



function traduzUsuario(gliveResponse) {

    return usuarioTraduzido = {
        nome: gliveResponse.fullName,
        email: gliveResponse.email,
        login: gliveResponse.username,
        globoID: gliveResponse.id,
        endereco: {
            pais: gliveResponse.address.country.name,
            estado: gliveResponse.address.state.name,
            cidade: gliveResponse.address.city.name,
            bairro: gliveResponse.address.neighborhood,
            rua: gliveResponse.address.address1,
            numero: gliveResponse.address.number,
            complemento: gliveResponse.address.address2
        }
    };

}

module.exports = {
    getUsuario: getUsuarioGlive,
    getUsuarioPorUsername: getUsuarioPorUsername,
    getUsuarioPorEmail: getUsuarioPorEmail
}



