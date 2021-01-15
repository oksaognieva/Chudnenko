// maps
function initMap() {
  
  var markers = ($('#map').attr('data-adresses')).split(' ; ');


  // map center
  var latMax = -10000, lngMax = -10000;
  for (var i = 0; i < markers.length; i++) {
    if (latMax < Number((markers[i].split(','))[0])) latMax = Number((markers[i].split(','))[0]);
    if (lngMax < Number((markers[i].split(','))[1])) lngMax = Number((markers[i].split(','))[1]);
  }
  var latMin = latMax, lngMin = lngMax;
  for (var i = 0; i < markers.length; i++) {
    if (latMin > Number((markers[i].split(','))[0])) latMin = Number((markers[i].split(','))[0]);
    if (lngMin > Number((markers[i].split(','))[1])) lngMin = Number((markers[i].split(','))[1]);
  }
  var center = {
    lat: ((latMin + latMax)/2),
    lng: ((lngMin + lngMax)/2)
  };

  // create map
  var mapZoom = Number($('#map').attr("data-zoom"));
  if (($('#map').attr("data-zoom")) === undefined || ($('#map').attr("data-zoom")) == "")
    mapZoom = 6;
  var map = new google.maps.Map(
    document.getElementById('map'),
    {zoom: mapZoom, center: center, styles: mapStyles}
  );

  // markers
  for (var i in markers) {
    var url = {
      lat: Number((markers[i].split(','))[0]),
      lng: Number((markers[i].split(','))[1])
    };
    var marker = new google.maps.Marker({position: url, map: map});
  }
}
