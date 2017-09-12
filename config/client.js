var prop = require("./properties");
var request = require("request");
var axios = require("axios");
var token_atual = "";
var responseBody = "";
var authHeader = {timeout: 5000,headers: {"Authorization": "Bearer " + token_atual}};

function msgInfo(mensagem, codigo) {
    this.mensagem = mensagem;
    this.codigo = codigo;
}

function atualizaTokenNoHeader(token){
    console.log("atualizaTokenNoHeader()");
    authHeader.headers.Authorization = `Bearer ${token}`;
}

function getUsuarioPorEmail(login, responseCallBack) {
    console.log("getUsuarioPorEmail()");
    var rota = prop.get_usuario_email_url + login;
    return axios.get(rota, authHeader)
        .then(function(response){
            console.log("getUsuarioPorEmail  --- then()");
            responseCallBack.send(response.data);
        }).catch(function(error){
            console.log("getUsuarioPorEmail  -- catch()");
            if (error.response.status == 401){
                getToken().then(function(response){
                    console.log("Token obtido: ", response.data.access_token);
                    atualizaTokenNoHeader(response.data.access_token);
                    getUsuarioPorEmail(login, responseCallBack);
                }).catch(function(error){
                    console.log('Erro ao buscar o token: '+error);
                });
            } else { 
                console.log('Erro não tratado: '+error);
                responseCallBack.send(error.response.data);
            }   
        });
};

function getToken() {
    console.log("getToken()");
    return axios.post(prop.token_url + prop.grant_type, {}, prop.header_auth);
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