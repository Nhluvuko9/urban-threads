import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { router, navigateTo } from "./Router.js";
import { database } from "./components/MensCollection.js";
import { homePage } from "./components/Home.js";

// const seedButton = document.getElementById("seed-btn");
// if (seedButton) {
//     seedButton.addEventListener("click", () => {
//         seedButton.disabled = true;
//         seedButton.innerText = "Uploading data...";
//         database();
//     });
// }

document.addEventListener("click", (event) => {
    const link = event.target.matches("[data-link]");
    if(link) {
        event.preventDefault();
        navigateTo(event.target.getAttribute("href"));
    }
});

window.addEventListener("popstate", router);

window.addEventListener("DOMContentLoaded", router);

console.log("Firebase Auth and Database are successfully attached to our application code!");
