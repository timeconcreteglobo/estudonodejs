var router = require('express').Router();


router.get('/', function(request, response){
    console.log("passou");
response.send('ALOU FUNCIONOU');
});



module.exports = router;