"use strict";

const contentContainer = document.getElementById("content");

const tools = ["Node.js", "Gulp", "Sass", "clean-css"];

for (const toolName of tools) {
    const card = document.createElement("p");
    card.classList.add("tool-card");
    card.textContent = `Tool: ${toolName}`;
    contentContainer.appendChild(card);
}