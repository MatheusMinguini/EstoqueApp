var mysql = require('mysql');

module.exports = function connection(){
    
    //AMBIENTE PRODUÇÃO
    // var connection = mysql.createConnection({
    //         host : 'mysql.procurala.kinghost.net',
    //         user : 'procurala',
    //         password : 'Node123',
    //         database : 'procurala'
    // });


    //AMBIENTE DESENVOLVIMENTO
    var connection = mysql.createConnection({
            host : '127.0.0.1',
            user : 'root',
            password : '',
            database : 'procura_estoque'
    });

    return connection;
}