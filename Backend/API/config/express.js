var express = require('express');
var app = express();
var cors = require('cors')();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
	limit: '5mb',
	parameterLimit: 100000,
    extended: false 
}));

app.use(bodyParser.json({
	limit: '5mb'
}));

app.use(cors);  

app.use(express.static(`./www/imagens/imagens/`));

module.exports = function configura(){
    return app;
}


