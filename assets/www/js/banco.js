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

	//PRODUTOS
	console.log("Configurando tabela PRODUTO...")
	tx.executeSql("CREATE TABLE IF NOT EXISTS PRODUTO " +
			"(" +
			"ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"NOME VARCHAR(100), " +
			"CODIGO_BARRAS VARCHAR(100), " +
			"IMAGEM TEXT" +
			")");
	
	//PRECOS DOS PRODUTOS
	console.log("Configurando tabela PRODUTO_PRECOS...")
	tx.executeSql("CREATE TABLE IF NOT EXISTS PRODUTO_PRECOS " +
			"(" +
			"ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"PRECO DECIMAL(10,2), " +
			"DATA DATETIME, " +
			"LONGITUDE REAL, " +
			"LATITUDE REAL, " +
			"PRODUTO_ID INTEGER, " +
			"FOREIGN KEY(PRODUTO_ID) REFERENCES PRODUTO(ID)" +
			")");
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
					        $('#listaTodosProdutos').append('<li> <img src="' + results.rows.item(i).IMAGEM + '" widht="100%" length="50%"> <br/> <a href="#">' + 
					        		results.rows.item(i).NOME + '<ul> <li> R$:' + results.rows.item(i).PRECO + ' - ' + results.rows.item(i).CODIGO_BARRAS + '</li> </ul> </a> </li>');
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