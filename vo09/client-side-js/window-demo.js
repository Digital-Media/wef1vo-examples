let myWindow = null;

function openWindow() { // Öffnet ein kleines Popup-Fenster
    myWindow = window.open("window.html", "NewWindow", "width=300, height=200");
    if (myWindow) {
        myWindow.focus();
    }
}

function closeWindow() { // Schließt das Popup-Fenster
    if (myWindow && !myWindow.closed) {
        myWindow.close();
    }
}

function checkOpen() { // Gibt den Status des Popup-Fensters aus
    alert(myWindow && !myWindow.closed ? "Fenster ist offen!" : "Fenster ist geschlossen!");
}