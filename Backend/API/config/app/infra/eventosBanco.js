module.exports =  function(){

    this.listar = function(connection, callback){
        connection.query("SELECT * FROM produto ORDER BY data_cadastro", callback);
    }

    this.listarGrupos = function(connection, callback){
        connection.query("SELECT * FROM grupo", callback);
    }

    this.listarCores = function(connection, callback){
        connection.query("SELECT DISTINCT(cor) as c FROM produto ORDER BY c", callback);
    }

    this.listarTamanhos = function(connection, callback){
        connection.query("SELECT DISTINCT(tamanho) as t FROM produto ORDER BY t", callback);
    }

    this.consultaPorId = function(connection, id, callback){
        connection.query("SELECT * FROM produto WHERE id = " + id, callback);
    }

    this.salvar = function(connection, objeto, callback){

        const data_atual = new Date();
        let data_banco = data_atual.toISOString().substring(0, 10);

        // var sql = `INSERT INTO produto (nome, descricao, preco, cor, tamanho, data_cadastro, grupo_id, genero) VALUES
        //  ('${objeto.nome}', '${objeto.descricao}', ${objeto.preco}, '${objeto.cor}', '${objeto.tamanho}', '${data_atual}', ${objeto.grupo}, '${objeto.genero}')`;

        var sql = `INSERT INTO produto (nome, descricao, preco, cor, tamanho, data_cadastro, genero) VALUES
         ('${objeto.nome}', '${objeto.descricao}', ${objeto.preco}, '${objeto.cor}', '${objeto.tamanho}', '${data_banco}', '${objeto.genero}')`;

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

        if(objeto.grupo){
            sql = sql + ` AND p.grupo_id = ${objeto.grupo}%`;
        }

        if(objeto.genero){
            sql = sql + ` AND p.genero LIKE '%${objeto.genero}%'`;
        }

        if(objeto.data_cadastro){
            sql = sql + ` AND p.data_cadastro = '${objeto.data_cadastro}'`;
        }
        console.log(sql);
        connection.query(sql, callback);
    }

    return this;
}
