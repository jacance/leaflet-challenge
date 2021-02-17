// Create our initial map object
var myMap = L.map("mapid", {
    center: [39.3210, -111.0937],
    zoom: 6
  });


// Add a tile layer to map (background map image)
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);


// Map legend
var legend = L.control({ position: "bottomright"});
legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Magnitude</h4>"
    div.innerHTML += '<i style="background: #00ff00"></i><span>-10-10</span><br>';
    div.innerHTML += '<i style="background: #ccff66"></i><span>10-30</span><br>';
    div.innerHTML += '<i style="background: #ffcc66"></i><span>30-50</span><br>';
    div.innerHTML += '<i style="background: #ffcc00"></i><span>50-70</span><br>';
    div.innerHTML += '<i style="background: #ff9900"></i><span>70-90</span><br>';
    div.innerHTML += '<i style="background: #00ff00"></i><span>90+</span><br>';

    return div;
};
legend.addTo(myMap)


// Url for analysis
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Function for returning colors based on depth
function colorFunction(depth) {
    if (depth > -10 && depth < 10) {
        return "#00ff00"
    }else if (depth >= 10 && depth < 30) {
        return "#ccff66"
    }else if (depth >= 30 && depth < 50) {
        return "#ffcc66"
    }else if (depth >= 50 && depth < 70) {
        return "#ffcc00"
    }else if (depth >= 70 && depth < 90) {
        return "#ff9900"
    }else {
        return "#ff3300"}
};


d3.json(queryUrl, function(response) {
    // Create entire geoJSON layer to be applied to map
    L.geoJSON(response, {

        // Defines what to do with each point in JSON
        pointToLayer: function (feature, latlng) {

            var depth = feature.geometry.coordinates[2]
            var mag = feature.properties.mag

            // Circle marker applied for each feature
            return L.circleMarker(latlng, {
                color: "black",

                // Fill color based on depth with function
                fillColor: colorFunction(depth),
                fillOpacity: .9,
                radius: mag * 4,
                weight: 1,
          })
        },
        // Function to click each feature for more pop up information
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<b>Place:</b> " + feature.properties.place + "<br><b>Magnitude:</b> " + feature.properties.mag +
             "<br><b>Depth:</b> " + feature.geometry.coordinates[2]);
          },


        // 
    // Add entire geoJSON layer to map
    }).addTo(myMap);

    

});

