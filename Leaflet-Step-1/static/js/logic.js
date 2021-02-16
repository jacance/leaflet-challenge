var myMap = L.map("mapid", {
    center: [37.7749, -122.4194],
    zoom: 13
  });

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);


const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


d3.json(queryUrl, function(response) {
    // console.log(response)
    var feature = response.features

    // Empty arrays
    var latLong = []
    var depth = []
    var magnitude = []

    // Iterate through results for earthquake information then push to empty array
    feature.forEach(function(i) {
        var coordinates = i.geometry.coordinates
        latLong.push([coordinates[1], coordinates[0]]);
        depth.push(coordinates[2])
        var mag = i.properties.mag
        magnitude.push(mag)
    })
    console.log(latLong)
    console.log(depth)
    console.log(magnitude)

    // L.heatLayer(latLong, {
    //     radius: 20,
    //     blur: 35
    
    // }).addTo(myMap);
});

// Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.


// Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earth quake by color.
//Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.


// HINT the depth of the earth can be found as the third coordinate for each earthquake.


// Include popups that provide additional information about the earthquake when a marker is clicked.


// Create a legend that will provide context for your map data.


// Your visualization should look something like the map above.




