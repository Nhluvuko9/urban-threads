import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { database } from "./components/Products.js";

const seedButton = document.getElementById("seed-btn");
if (seedButton) {
    seedButton.addEventListener("click", () => {
        seedButton.disabled = true;
        seedButton.innerText = "Uploading data...";
        database();
    });
}

console.log("Firebase Auth and Database are successfully attached to our application code!");
