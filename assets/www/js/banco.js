

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
	
	//PRECOS DOS PRODUTOS
	tx.executeSql("CREATE TABLE IF NOT EXISTS PRODUTO_PRECOS " +
			"(" +
			"ID INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"VALOR DECIMAL(10,2), " +
			"DATA DATE, POSICAO VARCHAR(100)," +
			"PRODUTO_ID INTEGER," +
			"FOREIGN KEY(PRODUTO_ID) REFERENCES PRODUTO(ID)"
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
	console.log("transação final");
}

function setupDB() {
	var db = window.openDatabase("phonegapProject", "1.0", "phonegapProject", (1024 * 1024) * 5);

	if (db) {
		console.log("---BANCO EXISTE---");
		alert("---BANCO EXISTE---");
		db.transaction(exec, erro, finallyy);
		alert("---BANCO EXISTE---");
	}
}

$(function() {
	setupDB();
	
	var sql = "PRAGMA FOREIGN_KEYS";
	
	if (db) {
		db.transaction(function(tx) {
			tx.executeSql(
					sql, 
					[], 
					function(tx, resultado) {
						alert("Num resultados: " + resultado.rows.length);
						
						if (!resultSet.rowsAffected) {
							  console.log('No rows affected!');
							  alert('No rows affected!');
							  return false;
							}
					}, 
					function(err) {
							alert('aguia geral na transaction' + +err.code);
					}
			)
		)}
	}
}