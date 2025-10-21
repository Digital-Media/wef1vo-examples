"use strict";

function valChange() {
    window.alert(this.options[this.selectedIndex].value + " wurde ausgewählt");
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("choice").addEventListener("change", valChange);
});
