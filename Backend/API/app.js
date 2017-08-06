var app = require('./config/express')();
var rotas = require('./config/app/routes/evento')(app);

app.listen(21035, function(){
	console.log("Server running");
});
