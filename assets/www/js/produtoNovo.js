alert("TIRAR FOTO");

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
    
    alert("DEVIRE READY 2");
}

function tirarFoto() {
	navigator.camera.getPicture(
		function(imageData) {
			var imagem = document.getElementById('produtoImagem');
		    imagem.src = "data:image/jpeg;base64," + imageData;
		    imagem.style.display("block");
		},
		function(message) {
			alert('Erro ao tirar foto: ' + message);
		},
		{
			quality: 50,
			targetWidth: 80,
		    destinationType: Camera.DestinationType.DATA_URL
		}
	);
}