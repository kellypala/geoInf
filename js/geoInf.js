$(function () {

    mapboxgl.accessToken = 'pk.eyJ1Ijoia3BhbGEiLCJhIjoiY2picWYxcXFlMDJzcDMycjZ4YTluN3V0ayJ9.CkFeFkTB1oVk8-BXK27uSw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [6.65, 46.7833333],
        zoom: 10,
    }); 

    var geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
    });

    map.addControl(geocoder);
    map.addControl(new mapboxgl.NavigationControl());

    map.on('load', function() {
        map.loadImage('https://cdn4.iconfinder.com/data/icons/pictype-free-vector-icons/16/home-512.png', function(error, image) {
            if (error) throw error;
            map.addImage('cabane', image);
            map.addLayer({
                "id": "cabanes",
                "type": "symbol",
                "source": {
                    "type": "geojson",
                    "data": "js/cabanes.geojson"
                },
                "layout": {
                    "icon-image": "cabane",
                    "icon-size": 0.05
                }
            });
        });

        map.addSource('single-point', {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": []
            }
        });

        map.addLayer({
            "id": "point",
            "source": "single-point",
            "type": "circle",
            "paint": {
                "circle-radius": {
                    stops: [
                            [0, 0],
                            [20, metersToPixelsAtMaxZoom(10000, map.getCenter().lat)]
                    ],
                    base: 2},
                "circle-color": "#007cbf",
                "circle-opacity" : 0.2
            },
        });

        // Listen for the `geocoder.input` event that is triggered when a user
        // makes a selection and add a symbol that matches the result.
        geocoder.on('result', function(ev) {
            map.getSource('single-point').setData(ev.result.geometry);
        });

    });

    function metersToPixelsAtMaxZoom(meters, latitude) {
        return meters / 0.075 / Math.cos(latitude * Math.PI / 180);
    }






    map.on('click', 'cabanes', function (e) {
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(e.features[0].properties.title + "<br/>Altitude : " +e.features[0].properties.elevation)
            .addTo(map);
    });


    // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
    map.on('click', 'cabanes', function (e) {
        map.flyTo({center: e.features[0].geometry.coordinates});
    });
    // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
    map.on('mouseenter', 'cabanes', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'cabanes', function () {
        map.getCanvas().style.cursor = '';

    });




});
