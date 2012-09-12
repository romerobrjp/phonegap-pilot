function setupDB() {
	var db = window.openDatabase("pgp", "1.0", "phonegapProject", (1024 * 1024) * 5);

	if (db) {
		console.log("---BANCO EXISTE---");
		db.transaction(exec, erro, finallyy);
	}
}

function exec(tx) {

	console.log("---transação rolando---");

	tx.executeSql("create table if not exists produto (LONGITUDE REAL, LATITUDE REAL");
	
	tx.executeSql("create table if not exists precosProduto (id integer Primary Key autoincrement, valor float(10,2), " +
			"data date, posicao varchar(100))");
	
	tx.executeSql("create table if not exists produto (id integer Primary Key autoincrement, nome varchar(100), " +
			"preco float(10,2), codigoBarras varchar(100), img varchar(255))");
	
	console.log("---transação realizada---");
}

$(function() {
	setupDB();
});