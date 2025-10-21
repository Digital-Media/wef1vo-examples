"use strict";

function showURL(event) {
    window.alert(this.href);
    event.preventDefault();
}

function prepareListeners() {
    const links = document.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", showURL);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    window.alert("DOMContentLoaded-Event ausgelöst!");
    prepareListeners();
});

// Alternativ auch mit dem load-Event möglich:
// window.addEventListener("load", function() {
//   window.alert("load-Event ausgelöst!");
//   prepareListeners();
// };
