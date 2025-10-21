"use strict";

// Merkt sich, ob Fehler aufgetreten sind
let hasErrors = false;

function isValid(event) {
    // Validierung der Formularfelder und setzen von hasErrors auf true, wenn ein Fehler passiert ist

    if (hasErrors) {
        event.preventDefault();
    }
}

// Zuweisen der Funktion auf submit-Handler des Formulars
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("dataform").addEventListener("submit", isValid);
});
