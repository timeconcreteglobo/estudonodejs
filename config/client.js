var prop = require("./properties");
var request = require("request");
token_atual = "";
responseBody = "";


function msgInfo(mensagem, codigo) {
    this.mensagem = mensagem;
    this.codigo = codigo;
}

function doGet(rota, responseCallBack) {
    objRequisicao = {
        url: rota,
        headers: {
            "Authorization": "Bearer " + token_atual
        }
    };
    request.get(objRequisicao, function (error, resp, body) {
        if (!error) {
            console.log("Requisicao GET  efetuada para : " + objRequisicao.url + " Retorno = " + resp.statusCode);
        } else {
            console.log("Erro ao efetuar Requisicao para : " + objRequisicao.url + " ERROR: " + error);
        }

        console.log(resp.headers.via);

        if (!error && resp.statusCode / 100 == 2) {
            var retorno = JSON.parse(body);

            responseCallBack.send(traduzUsuario(retorno));
        } else if (resp.statusCode == 401) {
            getToken();
            doGet(rota, responseCallBack);
        } else if (resp.statusCode == 403) {
            if (resp.headers.via && resp.headers.via.includes("GATEWAY response")) {
                responseCallBack.send(new msgInfo("Erro no acesso a rota no backstage", 403));
            } else {
                responseCallBack.send(new msgInfo("Usuario não encontrado", 403));
            }

        }

    });
}


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



