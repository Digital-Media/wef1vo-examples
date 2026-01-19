"use strict";

function valChange(event) {
    window.alert(`${event.currentTarget.value} wurde ausgewählt`);
}

document.getElementById("choice").addEventListener("change", valChange);