"use strict";

// Merkt sich, ob Fehler aufgetreten sind
let hasErrors = false;

function isValid(event) {
    // Validierung der Formularfelder und setzen von hasErrors auf true, wenn ein Fehler passiert ist
    document.querySelector("input").value === "" ? hasErrors = true : hasErrors = false;

    if (hasErrors) {
        window.alert("Absenden verhindert");
        event.preventDefault();
    }
}

// Zuweisen der Funktion auf submit-Handler des Formulars
document.getElementById("dataform").addEventListener("submit", isValid);