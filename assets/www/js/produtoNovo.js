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
			targetWidth: 80,
		    destinationType: Camera.DestinationType.DATA_URL
		}
	);
}

function lerCodigoBarras() {
	window.plugins.barcodeScanner.scan( 
		function(result) {
			alert("We got a barcode\n" +
				"Result: " + result.text + "\n" +
				"Format: " + result.format + "\n" +
				"Cancelled: " + result.cancelled);
		}, 
		function(error) {
			alert("Scanning failed: " + error);
		}
	);
}