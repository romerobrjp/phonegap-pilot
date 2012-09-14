$("#produtoNovo").live("pageshow", function(event){
});

var pictureSource;   // picture source
var destinationType; // sets the format of returned value 

// Wait for Cordova to connect with the device
//
document.addEventListener("deviceready",onDeviceReady,false);

// Cordova is ready to be used!
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

function tirarFoto() {
	navigator.camera.getPicture(
		function(imageData) {
			$("#produtoImagem").css('display', 'block');
			$("#produtoImagem").attr('src', "data:image/jpeg;base64," + imageData);
		},
		function(message) {
			alert('Captura de imagem falhou: ' + message);
		},
		{
			quality: 75,
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