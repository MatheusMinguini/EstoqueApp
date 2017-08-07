module.exports =  function(){

    this.listar = function(connection, callback){
        connection.query("SELECT * FROM produto ORDER BY data_cadastro LIMIT 30", callback);
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

        let sql = this.montarSQLparaInserir(objeto);
        
        connection.query(sql, callback);
    }

    this.montarSQLparaInserir =  function(objeto){

        const data_atual = new Date();
        let data_banco = data_atual.toISOString().substring(0, 10);

        let sql = `INSERT INTO produto (nome, descricao, preco, cor, tamanho, data_cadastro, grupo_id, genero`;

        if(objeto.codigo_barras != undefined) sql = sql + `, codigo_barras`;

        if(objeto.img != undefined) sql = sql + `, img`;

        sql = sql + `)`;

        sql = sql + ` VALUES
          ('${objeto.nome}', '${objeto.descricao}', ${objeto.preco}, 
          '${objeto.cor}', '${objeto.tamanho}', '${data_banco}',
           ${objeto.grupo_id}, '${objeto.genero}'`;

        if(objeto.codigo_barras != undefined) sql = sql + `, '${objeto.codigo_barras}'`;

        if(objeto.img != undefined) sql = sql + `, '${objeto.img}'`;

        sql = sql + `)`;

        return sql; 
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

        if(objeto.codigo_barras){
            sql = sql + ` AND p.codigo_barras = '${objeto.codigo_barras}'`;
        }

        connection.query(sql, callback);
    }

    return this;
}
