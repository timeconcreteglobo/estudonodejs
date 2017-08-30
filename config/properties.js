exports.client_id = "s6ZscywElv1DSRnV06kKsA==";
exports.client_secret = "evcOp0XX413KBmuQmlLQBg==";
exports.auth = "Basic "+ new Buffer(client_id + ":" + client_secret).toString("base64");
exports.token_url = "https://accounts.backstage.qa01.globoi.com/token";
exports.grant_type = "?grant_type=client_credentials";
exports.header_auth = {
    "Authorization" : auth
};


// module.exports = {
//     client_id : client_id,
//     client_secret : client_secret,
//     auth : auth,
//     token_url : token_url,
//     grant_type : grant_type ,
//     header_auth : header_auth 
// };