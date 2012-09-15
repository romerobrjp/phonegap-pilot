var db;

function erro(e) {
	console.log("transacao erro");
	alert(e);
}

function finallyy() {
	console.log("transacao finally");
}

function configurarBanco() {
	db = window.openDatabase("phonegapProject", "1.0", "phonegapProject", (1024 * 1024) * 5);

	if (db) {
		db.transaction(gerarTabelas, erro, finallyy);
	}
}

function gerarTabelas(tx) {
	//CRIANDO AS TABELAS
	console.log("---transacao iniciada---");
	
	//PRODUTOS
	console.log("Configurando tabela PRODUTO...")
	
	tx.executeSql("DROP TABLE IF EXISTS PRODUTO");
	tx.executeSql("CREATE TABLE IF NOT EXISTS PRODUTO " +
			"(" +
			"ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"NOME VARCHAR(100), " +
			"CODIGO_BARRAS VARCHAR(100), " +
			"IMAGEM BLOB" +
			")");
	
	//PRECOS DOS PRODUTOS
	console.log("Configurando tabela PRODUTO_PRECOS...")
	tx.executeSql("CREATE TABLE IF NOT EXISTS PRODUTO_PRECOS " +
			"(" +
			"ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"PRECO DECIMAL(10,2), " +
			"DATA DATE, " +
			"LONGITUDE REAL, " +
			"LATITUDE REAL, " +
			"PRODUTO_ID INTEGER, " +
			"FOREIGN KEY(PRODUTO_ID) REFERENCES PRODUTO(ID)" +
			")");
	
	console.log("---transacao finalizada---");
}

function testarConsultaBanco() {
	if (db) {
		db.transaction(
			function(tx) {
				var sql = "SELECT * FROM PRODUTO";				
				tx.executeSql(
					sql, 
					[], 
					function consultaSucesso(tx, results) {
						var len = results.rows.length;
					    console.log("Tabela PRODUTO tem: " + len + " linha(s).");
					    for (var i=0; i<len; i++) {
					        $('#resultados_index').append('<li> <a href="#">' + results.rows.item(i).NOME + ' - R$:' + results.rows.item(i).PRECO + '</a> </li>');
					    }
					    $('#resultados_index').listview('refresh');
					},
					function(err) {
						alert('Erro no executeSQL: ' + err.code + ' - ' + err.message);
					}
				)
			},
			function errorCB(err) {
			    alert("Erro no db.transaction: " + err.code + ' - ' + err.message);
			    return false;
			},
			function successCB() {
			    console.log("Success!");
			    return true;
			}
		);	
	}
}

function produtoCadastrar(nome, preco, codigo_barras, preco, long, lati) {
	var produtoId = pesquisarProdutoIdPorNome(nome);
	
	if (db) {
		var sql = "INSERT INTO PRODUTO (NOME, PRECO, CODIGO_BARRAS) VALUES (" + nome + ", " + preco + ", " + codigo_barras + ")";
		
		db.transaction(
			function(tx) {
				tx.executeSql(sql);
			}
		);
	}
	
	if (db) {
		var sql = "INSERT INTO PRODUTO_PRECOS (PRECO, LONGITUDE, LATITUDE, PRODUTO_ID) VALUES (" + preco + ", " + long + ", " + lati + ", " + produtoId + ")";
		
		db.transaction(
			function(tx) {
				tx.executeSql(sql);
			}
		);
	}
	
	alert("Produto cadastrado com sucesso!");
	$.mobile.changePage( "index.html", { transition: "slideup"} );
}

function pesquisarProdutoIdPorNome(nome) {
	if (db) {
		db.transaction(
			function(tx) {
				var sql = "SELECT * FROM PRODUTO WHERE NOME LIKE '%" + nome + "%'";				
				tx.executeSql(
					sql, 
					[], 
					function consultaSucesso(tx, results) {
						var len = results.rows.length;
					    for (var i=0; i<len; i++) {
					        produto { id: results.rows.item(i).ID };
					    }
					    return produto.id;
					},
					function(err) {
						alert('Erro no executeSQL: ' + err.code + ' - ' + err.message);
					}
				)
			},
			function errorCB(err) {
			    alert("Erro no db.transaction: " + err.code + ' - ' + err.message);
			    return false;
			},
			function successCB() {
			    console.log("Success!");
			    return true;
			}
		);	
	}
}

function produtoListarTodos() {
	if (db) {
		db.transaction(
			function(tx) {
				var sql = "SELECT * FROM PRODUTO";				
				tx.executeSql(
					sql, 
					[], 
					function consultaSucesso(tx, results) {
						var len = results.rows.length;
					    console.log("Tabela PRODUTO tem: " + len + " linha(s).");
					    for (var i=0; i<len; i++) {
					        $('#listaTodosProdutos').append('<li> <a href="#">' + results.rows.item(i).NOME + ' - R$:' + 
					        		results.rows.item(i).PRECO + '</a> </li>');
					    }
					    $('#listaTodosProdutos').listview('refresh');
					},
					function(err) {
						alert('Erro no executeSQL: ' + err.code + ' - ' + err.message);
					}
				)
			},
			function errorCB(err) {
			    console.log("Erro no db.transaction: " + err.code + ' - ' + err.message);
			    return false;
			},
			function successCB() {
			    console.log("Sucesso!");
			    return true;
			}
		);	
	}
}


$(function() {
	configurarBanco();
});