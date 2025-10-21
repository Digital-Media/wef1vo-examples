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

document.addEventListener("DOMContentLoaded", prepareListeners);

// Alternativ auch mit dem load-Event:
// window.addEventListener("load", prepareListeners);
