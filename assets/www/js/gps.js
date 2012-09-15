function initializeGmap(lat, lng, div_alvo) {
	var mapdiv = document.getElementById(div_alvo);
	var myLatlng = new google.maps.LatLng(lat,lng);
	var mapOptions = {
		center: myLatlng,
		zoom: 14,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	
	var map = new google.maps.Map(mapdiv,mapOptions);
	
	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title:"Hello World!"
	});		
}