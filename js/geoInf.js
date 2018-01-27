$(function () {

    mapboxgl.accessToken = 'pk.eyJ1Ijoia3BhbGEiLCJhIjoiY2picWYxcXFlMDJzcDMycjZ4YTluN3V0ayJ9.CkFeFkTB1oVk8-BXK27uSw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/kpala/cjcx3co3d0s2q2rs1xrum5ah2',
        center: [6.65, 46.7833333],
        zoom: 10,
    }); 

    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    }));
    map.addControl(new mapboxgl.NavigationControl());
    



});
