"use strict";

function initialize() {
    const map = L.map("map").setView([47.61, 13.783], 8);

    // Add a tile layer: we use OpenStreetMap here
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            map.setView([lat, lng], 16);

            L.marker([lat, lng]).addTo(map)
                .bindPopup("Du bist hier!")
                .openPopup();
        }, () => {
            handleLocationError(true, map);
        });
    } else {
        // Browser unterstützt keine Geolocation
        handleLocationError(false, map);
    }
}

// Error handling
function handleLocationError(browserHasGeolocation, map) {
    const message = browserHasGeolocation ?
        "Fehler: Der Geolocation-Dienst ist fehlgeschlagen." :
        "Fehler: Dein Browser unterstützt keine Geolocation.";

    L.popup()
        .setLatLng(map.getCenter())
        .setContent(message)
        .openOn(map);
}

// Start the map
initialize();