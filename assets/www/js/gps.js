// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
var onSuccess = function(position) {
//	var element = document.getElementById('geolocal');
//	
//	var url = "http://maps.google.com/maps/api/staticmap?center=" + position.coords.latitude + "," + position.coords.longitude + "&zoom=13&size=320x480&maptype=roadmap&key=MyGoogleMapsAPIKey&sensor=true";
//    $('#geomapa').attr('src', url);

	initializeGmap(position.coords.latitude, position.coords.longitude );
	
//    element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
//					    'Longitude: '          + position.coords.longitude             + '<br />' +
//					    'Altitude: '           + position.coords.altitude              + '<br />' +
//					    'Accuracy: '           + position.coords.accuracy              + '<br />' +
//					    'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
//					    'Heading: '            + position.coords.heading               + '<br />' +
//					    'Speed: '              + position.coords.speed                 + '<br />' +
//					    'Timestamp: '          + new Date(position.timestamp)          + '<br />' +
//					    'URL: '          	   + url						           + '<br />';
    
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

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