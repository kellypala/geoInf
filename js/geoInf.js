$(function () {

    mapboxgl.accessToken = 'pk.eyJ1Ijoia3BhbGEiLCJhIjoiY2picWYxcXFlMDJzcDMycjZ4YTluN3V0ayJ9.CkFeFkTB1oVk8-BXK27uSw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [6.65, 46.7833333],
        zoom: 10,
    }); 

    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    }));
    map.addControl(new mapboxgl.NavigationControl());
    



});
