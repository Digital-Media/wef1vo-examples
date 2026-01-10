"use strict";

function showInfo() {
    // Zugriff auf Eigenschaften
    console.log("URL: " + document.URL);
    console.log("Zuletzt geändert: " + document.lastModified);

    // Ändern einer Eigenschaft
    document.title = "Neuer Titel gesetzt!";
    alert("Der Titel des Tabs wurde geändert.");
}