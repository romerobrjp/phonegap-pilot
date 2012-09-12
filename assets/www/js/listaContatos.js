var contatos;

function onSuccess(contatos) {
    alert('contatos.length + ' contatos encontrados.');
    
    for (int i=0; i < contatos.length; i++) {
    	$('#listaContatos').append('<li> <a href="#">' + contatos.name + '</a> </li>');
    }
    	
};

function onError(contactError) {
    alert('DEU ÁGUIA!');
};

function onDeviceReady() {
	var options = new ContactFindOptions();
	options.filter = "Manoel";
	var fields = ["displayName", "name"];
	navigator.contacts.find(fields, onSuccess, onError, options);
}

document.addEventListener("deviceready", onDeviceReady, false);