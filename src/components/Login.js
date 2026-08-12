import { auth } from "../firebase-config.js";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// DOM elements
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");    
const passwordInput = document.getElementById("password");
const authStatus = document.getElementById("authStatus");
const signOutBtn = document.getElementById("signOutBtn");
const createAccBtn = document.getElementById("createAccBtn");

// Auth state change
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        updateStore(true);
        console.log("User is signed in:", user.email);
    } else {
        // User is signed out
        updateStore(false);
    }
});

// Sign in the user with Firebase
if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault(); 
        const email = emailInput?.value || "";
        const password = passwordInput?.value || "";

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Successfully logged in!");
            window.location.href = "index.html";
        } catch (error) {
            console.error("Login failed:", error.message);
            alert(error.message);
        }
    });
}

// Establish new user with Firebase
if (createAccBtn) {
    createAccBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const email = emailInput?.value || "";
        const password = passwordInput?.value || "";
        
        if (!email || !password) {
            alert("Please enter an email and password to create an account.")
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Account created successfully!");
            window.location.href = "index.html";
        } catch (error) {
            alert("Error creating account:" + error.message);
        }
    });
}

// Sign out user with Firebase
if (signOutBtn) {
    signOutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            alert("Successfully signed out!");
        } catch (error) {
            console.error("Sign out error:", error.message)
        }
    });
}

const updateStore = (isLoggedIn) => {
    if (!authStatus) return;
    if (isLoggedIn) {
        authStatus.classList.remove('hidden');
    } else {
        authStatus.classList.add('hidden');
    }
}