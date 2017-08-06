var mysql = require('mysql');

module.exports = function connection(){
    
    var connection = mysql.createConnection({
            host : 'mysql.procurala.kinghost.net',
            user : 'procurala',
            password : 'Node123',
            database : 'procurala'
    });

    return connection;
}