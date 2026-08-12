import { auth } from "../firebase-config.js";
import { onAuthStateChanged, signOut } from "firebase/auth";

// DOM elements
const authLink = document.getElementById("authLink");
const accountTooltip = document.getElementById("accountTooltip");

// Handle dynamic click event 
let currentUser = null;

onAuthStateChanged(auth, (user) => {
    if (accountTooltip) {
        if(user) {
            currentUser = user;
            const userName = user.email ? user.email.split('@')[0] : 'User';
            accountTooltip.textContent = `Hello, ${userName}`;
            if (authLink) authLink.removeAttribute('href');
        } else {
            currentUser = null;
            accountTooltip.textContent = "Sign in";
            if (authLink) authLink.setAttribute('href', 'login.html');
        }
    }
});

// Handle account icon 
if (authLink) {
    authLink.addEventListener('click', async (event) => {
        if (currentUser) {
            event.preventDefault();
            try {
                await signOut(auth);
                alert("Successfully signed out!");
                window.location.reload();
            } catch (error) {
                console.error("Sign out failed:", error.message);
            }
        }
    });
}