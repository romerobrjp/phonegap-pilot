function initializeGmap(lat, lng) {
	var mapdiv = document.getElementById("mapa_container");
	var myLatlng = new google.maps.LatLng(lat,lng);
	var mapOptions = {
		center: myLatlng,
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	
	var map = new google.maps.Map(mapdiv,mapOptions);
	
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title:"Hello World!"
	});		
}