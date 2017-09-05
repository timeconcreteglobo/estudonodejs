var prop = require("./properties");
var request = require("request");
var axios = require("axios");
token_atual = "";
responseBody = "";


function msgInfo(mensagem, codigo) {
    this.mensagem = mensagem;
    this.codigo = codigo;
}



function doGetAxios(rota) {

    var responseGlive;

    authHeader = {
        timeout: 5000,
        headers: {
            "Authorization": "Bearer " + token_atual
        }
    };

    axios.get(rota, authHeader)
        .then(function (response) {
            responseGlive = response;
        }).catch(function (error) {
            response = error.response;
            errorHeader = response.headers.via;
            statusCode = response.status;
            if (statusCode == 401) {
                getToken();
                // LEMBRETE
                //PARAMOS NO PROBLEMA DA SINCRONIZACAO DA BUSCA DO TOKEN DE ACORDO COM A PROMISE
                doGetAxios(rota);
            }
        })


    console.log(responseGlive);

}




function getToken() {
    request.post({ url: prop.token_url + prop.grant_type, headers: prop.header_auth }, function (error, response, body) {
        var token = JSON.parse(body);
        token_atual = token.access_token;
        console.log("Token obtido" + token_atual);
    })
};

function getToken() {
    request.post({ url: prop.token_url + prop.grant_type, headers: prop.header_auth }, function (error, response, body) {
        var token = JSON.parse(body);
        token_atual = token.access_token;
    })
};

function getUsuarioGlive(globoID, responseCallBack) {
    var rota = prop.get_usuario_url + globoID;
    doGet(rota, responseCallBack);
};

function getUsuarioPorUsername(username, responseCallBack) {
    var rota = prop.get_usuario_username_url + username;
    doGet(rota, responseCallBack);


};

function getUsuarioPorEmail(login, responseCallBack) {
    var rota = prop.get_usuario_email_url + login;
    doGetAxios(rota);

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



