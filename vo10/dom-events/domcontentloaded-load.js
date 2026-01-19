"use strict";

/**
 * Diese Funktion wird aufgerufen, sobald die HTML-Struktur (DOM) steht.
 * Sie macht die Seite "interaktiv", auch wenn Bilder noch fehlen.
 */
function initInteractions() {
    const statusBox = document.querySelector("#status");
    const btn = document.querySelector("#actionButton");
    const img = document.querySelector("#demoImage");

    statusBox.textContent = "DOMContentLoaded gefeuert: Struktur ist bereit.";
    statusBox.style.backgroundColor = "#e0f7fa"; // Hellblau

    // Listener anhängen möglich, da das HTML-Element existiert
    btn.addEventListener("click", function () {
        window.alert("Button funktioniert, obwohl das Bild evtl. noch lädt!");
    });

    img.addEventListener("click", event => {
        console.log("Bild wurde angeklickt:", event.currentTarget.src);
    });
}

/**
 * Diese Funktion läuft erst, wenn alles (auch Bilder/CSS) geladen ist.
 */
function finalizePage() {
    const statusBox = document.querySelector("#status");
    const img = document.querySelector("#demoImage");

    // Erst jetzt kennen wir die echte Größe des Bildes
    const width = img.naturalWidth;
    const height = img.naturalHeight;

    statusBox.textContent += ` | Load gefeuert: Bild geladen (${width}x${height}px).`;
    statusBox.style.backgroundColor = "#c8e6c9"; // Hellgrün
    statusBox.style.border = "2px solid green";
}

// Für Logik: Warten auf den DOM-Baum
document.addEventListener("DOMContentLoaded", initInteractions);

// Warten auf externe Ressourcen (Bilder, Styles)
window.addEventListener("load", finalizePage);


// Mit anonymer Funktionen (einmal mit klassisch, einmal mit Arrow Function):
/*document.addEventListener("DOMContentLoaded", function () {
    window.alert("DOMContentLoaded-Event ausgelöst!");
    initInteractions();
});*/

/*window.addEventListener("load", () => {
    window.alert("load-Event ausgelöst!");
    finalizePage();
});*/