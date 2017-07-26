module.exports =  function(){

    this.listar = function(connection, callback){
        connection.query("SELECT * FROM produto ORDER BY data_cadastro", callback);
    }

    this.listarGrupos = function(connection, callback){
        connection.query("SELECT * FROM grupo", callback);
    }

    this.consultaPorId = function(connection, id, callback){
        connection.query("SELECT * FROM produto WHERE id = " + id, callback);
    }

    this.salvar = function(connection, objeto, callback){

        const data_atual = new Date();
        let data = new Date(data_atual);

        var sql = `INSERT INTO produto (nome, descricao, preco, cor, tamanho, data_cadastro, grupo_id) VALUES
         ('${objeto.nome}', '${objeto.descricao}', ${objeto.preco}, '${objeto.cor}', '${objeto.tamanho}', '${data_atual}', ${objeto.grupo})`;

        console.log(sql);

        connection.query(sql, callback);
    }

    this.remover = function(connection, objeto, callback){

        var string = "DELETE FROM produto WHERE id = " + objeto.id;

        connection.query(string, callback);
    }

    this.filtrar = function(connection, objeto, callback){

        var sql = `SELECT * FROM produto p WHERE 1 = 1 `;

        if(objeto.nome){
            sql = sql + ` AND p.nome LIKE '%${objeto.nome}%'`;
        }

        if(objeto.descricao){
            sql = sql + ` AND p.descricao LIKE '%${objeto.descricao}%'`;
        }

        if(objeto.preco){
           sql = sql + ` AND p.preco = ${objeto.preco}`;
        }

        if(objeto.cor){
            sql = sql + ` AND p.cor LIKE '%${objeto.cor}%'`;
        }

        if(objeto.tamanho){
            sql = sql + ` AND p.tamanho LIKE '%${objeto.tamanho}%'`;
        }

        console.log(sql);
        connection.query(sql, callback);
    }

    return this;
}
