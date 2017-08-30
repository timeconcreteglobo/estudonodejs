var client_id = "s6ZscywElv1DSRnV06kKsA==";
var client_secret = "evcOp0XX413KBmuQmlLQBg==";
var auth = "Basic "+ new Buffer(client_id + ":" + client_secret).toString("base64");
var token_url = "https://accounts.backstage.qa01.globoi.com/token";
var grant_type = "?grant_type=client_credentials";
var header_auth = {
    "Authorization" : auth
};
var glive_url = "https://glive.backstage.qa01.globoi.com/";
var get_usuario_url = glive_url + "v2/users/";


module.exports = {
    client_id : client_id,
    client_secret : client_secret,
    auth : auth,
    token_url : token_url,
    grant_type : grant_type ,
    header_auth : header_auth,
    glive_url :  glive_url,
    get_usuario_url : get_usuario_url
};