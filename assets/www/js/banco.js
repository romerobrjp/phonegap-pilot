var db;

function gerarTabelas(tx) {
	//CRIANDO AS TABELAS
	console.log("---transação iniciada---");
	
	//PRODUTOS
	tx.executeSql('DROP TABLE IF EXISTS PRODUTO');
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
//	tx.executeSql("CREATE TABLE IF NOT EXISTS PRODUTO_PRECOS " +
//			"(" +
//			"ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
//			"VALOR DECIMAL(10,2), " +
//			"DATA DATE, POSICAO VARCHAR(100)," +
//			"PRODUTO_ID INTEGER," +
//			"FOREIGN KEY(PRODUTO_ID) REFERENCES PRODUTO(ID)" +
//			")");
	
	//POSICAO
//	tx.executeSql("CREATE TABLE IF NOT EXISTS PRECO_POCISAO " +
//			"(" +
//			"ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
//			"LONGITUDE REAL, " +
//			"LATITUDE REAL, " +
//			"PRECO_ID INTEGER, " +
//			"FOREIGN KEY(PRECO_ID) REFERENCES PRODUTO_PRECOS(ID)" +
//			")");
	
	console.log("---transação finalizada---");
}

function erro(e) {
	console.log("transação erro");
	alert(e);
}

function finallyy() {
	console.log("transação finally");
}

function configuraBanco() {
	db = window.openDatabase("phonegapProject", "1.0", "phonegapProject", (1024 * 1024) * 5);

	if (db) {
		db.transaction(gerarTabelas, erro, finallyy);
	}
}

function consultaBanco() {
	if (db) {
		db.transaction(
			function(tx) {
				var sql = "SELECT * FROM PRODUTO";				
				tx.executeSql(
					sql, 
					[], 
					function consultaSucesso(tx, results) {
						var len = results.rows.length;
					    alert("Tabela PRODUTO tem: " + len + " linha(s).");
					    for (var i=0; i<len; i++) {
					        alert("Row = " + i + " ID = " + results.rows.item(i).nome + " Data =  " + results.rows.item(i).preco);
					    }						
					},
					function(err) {
						alert('Aguia no executeSQL: ' + err.code + ' - ' + err.message);
					}
				)
			},
			function errorCB(err) {
			    alert("Error processing SQL: " + err.code + ' - ' + err.message);
			},
			function successCB() {
			    alert("Success!");
			}
		);	
	}
}

$(function() {
	configuraBanco();
	consultaBanco();
});