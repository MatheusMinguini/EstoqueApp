var mysql = require('mysql');

module.exports = function connection(){
    
    var connection = mysql.createConnection({
            host : '127.0.0.1',
            user : 'root',
            password : '',
            database : 'procura_estoque'
    });

    return connection;
}