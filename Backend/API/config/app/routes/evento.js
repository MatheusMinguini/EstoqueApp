var dbConnection = require('../infra/dbConnection');
var eventoBanco = require("../infra/eventosBanco")();


module.exports = function rotas(app){

    app.get("/produtos", function(request, response){
        var connection = dbConnection();

        eventoBanco.listar(connection, function(erro, result){
          response.send(result);
          if(erro != null) console.log(erro);
        });

        connection.end();
    });

    app.get("/info", function(request, response){
        var connection = dbConnection();

        eventoBanco.getInfo(connection, function(erro, result){
          response.send(result);
          if(erro != null) console.log(erro);
        });

        connection.end();
    });

    app.get("/grupos", function(request, response){

        var connection = dbConnection();

        eventoBanco.listarGrupos(connection, function(erro, result){
          response.send(result);
          if(erro != null) console.log(erro);
        });

        connection.end();
    });

    app.get("/gruposInserir", function(request, response){

        var connection = dbConnection();

        let genero = request.query.genero;

        eventoBanco.listarGruposInserir(connection, genero, function(erro, result){
          response.send(result);
          if(erro != null) console.log(erro);
        });
        connection.end();
    });

    app.get("/cores", function(request, response){

        var connection = dbConnection();

        eventoBanco.listarCores(connection, function(erro, result){
          response.send(result);
          if(erro != null) console.log(erro);

        });

        connection.end();
    });

    app.get("/tamanhos", function(request, response){

        var connection = dbConnection();

        eventoBanco.listarTamanhos(connection, function(erro, result){
          response.send(result);
          if(erro != null) console.log(erro);

        });

        connection.end();
    });

    app.get("/consulta", function(request, response){
        var id = request.query.id;

        var connection = dbConnection();

        eventoBanco.consultaPorId(connection, id, function(erro, result){
          response.send(result);
          if(erro != null) console.log(erro);
        });

        connection.end();
    });

    app.get("/verificaDuplicidadeNome", function(request, response){
        let nome = request.query.nome;

        let connection = dbConnection();

        eventoBanco.existeDuplicidadeNome(connection, nome, function(erro, result){
          response.send(result);
          if(erro != null) console.log(erro);
        });

        connection.end();
    });


    app.post("/salvar", function(request, response){

      var produto = request.body;

      var connection = dbConnection();

      eventoBanco.salvar(connection, produto, function(erro, result){
        response.send(result);
        if(erro != null) console.log(erro);
      });

      connection.end();
    });

    app.post("/remover", function(request, response){

      var produto = request.body;

      var connection = dbConnection();

      eventoBanco.remover(connection, produto, function(erro, result){
        response.send(result);
        if(erro != null) console.log(erro);
      });

      connection.end();
    });

    app.post("/filtrar", function(request, response){

      var produto = request.body;

      var connection = dbConnection();

      eventoBanco.filtrar(connection, produto, function(erro, result){
        response.send(result);
        if(erro != null) console.log(erro);
      });

      connection.end();
    });

    app.post("/filtrarPorDescricao", function(request, response){

      var produto = request.body;

      var connection = dbConnection();

      eventoBanco.filtrarPorDescricao(connection, produto, function(erro, result){
        response.send(result);
        if(erro != null) console.log(erro);
      });

      connection.end();
    });
}
