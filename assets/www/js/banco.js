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
	tx.executeSql("CREATE TABLE IF NOT EXISTS PRODUTO " +
			"(" +
			"ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"NOME VARCHAR(100), " +
			"PRECO DECIMAL(10,2), " +
			"CODIGO_BARRAS VARCHAR(100), " +
			"IMAGEM BLOB" +
			")");
	
	tx.executeSql("INSERT INTO PRODUTO(NOME, PRECO) VALUES('CAFE', 3.00)");
	
	//PRECOS DOS PRODUTOS
	console.log("Configurando tabela PRODUTO_PRECOS...")
	tx.executeSql("CREATE TABLE IF NOT EXISTS PRODUTO_PRECOS " +
			"(" +
			"ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"VALOR DECIMAL(10,2), " +
			"DATA DATE, " +
			"PRODUTO_ID INTEGER, " +
			"FOREIGN KEY(PRODUTO_ID) REFERENCES PRODUTO(ID)" +
			")");
	
	//POSICAO
	console.log("Configurando tabela PRECO_POSICAO...")
	tx.executeSql("CREATE TABLE IF NOT EXISTS PRECO_POCISAO " +
			"(" +
			"ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"LONGITUDE REAL, " +
			"LATITUDE REAL, " +
			"PRECO_ID INTEGER, " +
			"FOREIGN KEY(PRECO_ID) REFERENCES PRODUTO_PRECOS(ID)" +
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
					        alert("Row = " + i + " Nome = " + results.rows.item(i).NOME + " Preco =  " + results.rows.item(i).PRECO);
					    }						
					},
					function(err) {
						alert('Erro no executeSQL: ' + err.code + ' - ' + err.message);
					}
				)
			},
			function errorCB(err) {
			    alert("Erro no db.transaction: " + err.code + ' - ' + err.message);
			},
			function successCB() {
			    console.log("Success!");
			}
		);	
	}
}

function produtoAdicionar(nome, preco, codigo_barras) {
	if (db) {
		var sql = "INSERT INTO PRODUTO (NOME, PRECO, CODIGO_BARRAS) VALUES (" + nome + ", " + preco + ", " + codigo_barras + ")";
		
		db.transaction(
			function(tx) {
				tx.executeSql(sql);
			}
		);
	}
	
	testarConsultaBanco();
}

function pesquisaProdutoPorNome(nome) {
	if (db) {
		db.transaction(
			function(tx) {
				var sql = "SELECT * FROM PRODUTO WHERE NOME LIKE '%"+ nome + "%'";				
				tx.executeSql(
					sql, 
					[], 
					function consultaSucesso(tx, results) {
						var len = results.rows.length;
					    console.log("Tabela PRODUTO tem: " + len + " linha(s).");
					    for (var i=0; i<len; i++) {
					    	console.log("Fetch na linha " + i+1);
					        $('#resultados').append('<li> <a href="#">' + results.rows.item(i).NOME + ' - R$:' + results.rows.item(i).PRECO + '</a> </li>');
					    }						
					},
					function(err) {
						alert('Erro no executeSQL: ' + err.code + ' - ' + err.message);
					}
				)
			},
			function errorCB(err) {
			    alert("Erro no db.transaction: " + err.code + ' - ' + err.message);
			},
			function successCB() {
			    console.log("Success!");
			}
		);	
	}
}

$(function() {
	configurarBanco();
	testarConsultaBanco();
});