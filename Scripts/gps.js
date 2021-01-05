var x = document.getElementById("coords");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + 
  "<br>Longitude: " + position.coords.longitude;
  var markerMe = L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap);
  markerMe.bindTooltip("Das bist du!");
}
