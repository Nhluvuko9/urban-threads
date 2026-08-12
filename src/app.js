import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { router, navigateTo } from "./Router.js";
import { database } from "./components/Shoes.js";
import "./index.js";

// Handle all data-links events
document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-link]");
    if (link) {
        event.preventDefault();
        navigateTo(link.getAttribute("href"));
    }
});

window.addEventListener("popstate", router);

window.addEventListener("DOMContentLoaded", router);

