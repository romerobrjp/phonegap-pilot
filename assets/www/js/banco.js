var db;

function gerarTabelas(tx) {
	//CRIANDO AS TABELAS
	console.log("---transação rolando---");

	
	//PRODUTOS
	tx.executeSql("CREATE TABLE IF NOT EXISTS PRODUTO " +
			"(" +
			"ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"NOME VARCHAR(100), " +
			"PRECO DECIMAL(10,2), " +
			"CODIGO_BARRAS VARCHAR(100), " +
			"IMAGEM BLOB" +
			")");
	
	tx.executeSql("INSERT INTO PRODUTO(NOME, PRECO)" +
			"VALUES ('CAFE', 2.99");
	
	//PRECOS DOS PRODUTOS
	tx.executeSql("CREATE TABLE IF NOT EXISTS PRODUTO_PRECOS " +
			"(" +
			"ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"VALOR DECIMAL(10,2), " +
			"DATA DATE, POSICAO VARCHAR(100)," +
			"PRODUTO_ID INTEGER," +
			"FOREIGN KEY(PRODUTO_ID) REFERENCES PRODUTO(ID)" +
			")");
	
	//POSICAO
	tx.executeSql("CREATE TABLE IF NOT EXISTS PRECO_POCISAO " +
			"(" +
			"ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"LONGITUDE REAL, " +
			"LATITUDE REAL, " +
			"PRECO_ID INTEGER, " +
			"FOREIGN KEY(PRECO_ID) REFERENCES PRODUTO_PRECOS(ID)" +
			")");
	
	console.log("---transação finalizada---");
}

function erro(e) {
	console.log("transação erro");
	alert(e);
}

function finallyy() {
	console.log("transação finally");
}

function setupDB() {
	db = window.openDatabase("phonegapProject", "1.0", "phonegapProject", (1024 * 1024) * 5);

	if (db) {
		console.log("---BANCO EXISTE---");
		db.transaction(gerarTabelas, erro, finallyy);
	}
}

$(function() {
	setupDB();
	
	var sql = "SELECT * FROM CAFE";
	
	if (db) {
		db.transaction(
			function(tx) {
				tx.executeSql(
					sql, 
					[], 
					function(tx, results) {
						if (!resultSet.rowsAffected) {
						  console.log('No rows affected!');
						  alert('No rows affected!');
						  return false;
						}
						
						for (var i=0; i<len; i++){
					        console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
					        alert("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
					    }
					},
					function(err) {
							alert('aguia geral na transaction: ' + err.code);
					}
				)
			},
			function errorCB(err) {
			    alert("Error processing SQL: "+err.code);
			}
		);	
	}
});