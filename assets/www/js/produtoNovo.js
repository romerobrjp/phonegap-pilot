var imagem;

function tirarFoto() {
	navigator.camera.getPicture(
		function(imageData) {
			$("#produtoImagem").css('display', 'block');
			$("#produtoImagem").attr('src', "data:image/jpeg;base64," + imageData);
			imagem = imageData;
		},
		function(message) {
			alert('Captura de imagem falhou: ' + message);
		},
		{
			quality: 100,
			targetWidth: 120,
			destinationType: Camera.DestinationType.DATA_URL
		}
	);
}

function lerCodigoBarras() {
	window.plugins.barcodeScanner.scan(
		function(result) {
			$("#codigoBarras").val(result.text);
		}, 
		function(error) {
			alert("Scanning failed: " + error);
		}
	);
}



function produtoCadastrar(nome, codigo_barras, imagem, preco, longi, lati) {
	if (db) {
		var sql = "INSERT INTO PRODUTO (NOME, CODIGO_BARRAS, IMAGEM) VALUES ('" + nome + "', '" + codigo_barras + "', '" + imagem + "')";
		db.transaction(
				function(tx) {
					tx.executeSql(sql);
				},
				function errorCB(err) {
					alert("Erro ao inserir Produto: " + err.code + ' - ' + err.message);
					return false;
				},
				function successCB() {
					alert("Sucesso ao inserir tabela Produto!");
					return true;
				});
	}
	
	var produtoId = pesquisarProdutoIdPorCodigoBarras(codigo_barras);
	
	if (db) {
		alert("produtoId existe! Inserindo na segunda tabela!");
		alert(preco + " - " + longi + " - " + lati + " - " + produtoId); 
		var sql = "INSERT INTO PRODUTO_PRECOS (PRECO, DATA, LONGITUDE, LATITUDE, PRODUTO_ID) VALUES (" + preco + ", date('now'), " + longi + ", " + lati + ", " + produtoId + ")";
		db.transaction(
				function(tx) {
					tx.executeSql(sql);
					alert("EXECUTOU INSERT PRODUTO NA SEGUNDA TABELA");
				},
				function errorCB(err) {
					alert("Erro ao inserir Produto: " + err.code + ' - ' + err.message);
					return false;
				},
				function successCB() {
					console.log("Sucesso ao inserir tabela Produto!");
					return true;
				}
		);
	}
	
	alert("Produto cadastrado com sucesso!");
	
	$.mobile.changePage( "index.html", { transition: "slideup"} );
}

function pesquisarProdutoIdPorCodigoBarras(codigo_barras) {
	if (db) {
		db.transaction(function(tx) {
			var sql = "SELECT * FROM PRODUTO WHERE CODIGO_BARRAS = '" + codigo_barras + "'";
			tx.executeSql(
					sql, 
					[], 
					function consultaSucesso(tx, results) {
						var len = results.rows.length;
						for (var i=0; i<len; i++) {
							return results.rows.item(i).ID;
						}
					},
					function(err) {
						alert('Erro no executeSQL: ' + err.code + ' - ' + err.message);
					})
				}, function errorCB(err) {
					alert("Erro no db.transaction: " + err.code + ' - ' + err.message);
					return false;
				}, function successCB() {
					console.log("Sucesso na consulta de ID por Codgio de Barras!");
					return true;
				});
	}
}