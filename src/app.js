import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { displayProducts } from "./components/Products.js";
import { displayMensProducts } from "./components/MensCollection.js";
import { router, navigateTo } from "./Router.js";
import { database } from "./components/MensCollection.js";

const seedButton = document.getElementById("seed-btn");
if (seedButton) {
    seedButton.addEventListener("click", () => {
        seedButton.disabled = true;
        seedButton.innerText = "Uploading data...";
        database();
    });
}

document.addEventListener("click", (event) => {
    if(event.target.matches("[data-link]")) {
        event.preventDefault();
        navigateTo(event.target.getAttribute("href"));
    }
});

window.addEventListener("popstate", router);

window.addEventListener("DOMContentLoader", router);

displayProducts();
console.log("displayProducts has been executed")
displayMensProducts();
console.log("displayMensProducts has been executed")

console.log("Firebase Auth and Database are successfully attached to our application code!");
