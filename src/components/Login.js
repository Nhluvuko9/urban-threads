// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4F31clzqEAEmNG9ena5fy6ob3eCCxRzk",
  authDomain: "urban-threads-nhluvuko.firebaseapp.com",
  projectId: "urban-threads-nhluvuko",
  storageBucket: "urban-threads-nhluvuko.firebasestorage.app",
  messagingSenderId: "276110476778",
  appId: "1:276110476778:web:47f9226eb63f0311b21e93",
  measurementId: "G-6M6KG2923V"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// DOM elements
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");    
const passwordInput = document.getElementById("password");
const authStatus = document.getElementById("authStatus");
const signOutBtn = document.getElementById("signOutBtn");
const createAccBtn = document.getElementById("createAccBtn");

// Auth state change
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        updateStoreForSignedInUser(true);
        console.log("User is signed in:", user.email);
    } else {
        // User is signed out
        function updateStoreForSignedOutUser() {
            if (authStatus) authStatus.innerText = "signed Out";
        };
    }
});

// Sign in the user with Firebase
loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 
    const email = emailInput.value;
    const password = passwordInput.value;

    auth.signInWithEmailAndPassword(email, password)
    .then((userInfo) => {
        alert("Successfully logged in!");
        window.location.href = "index.html";
    })
    .catch((error) => {
        console.error("Loginfailed:", error.message);
        alert(error.message);
    });
});

createAccBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    
    if (!email || !password) {
        alert("Please enter an email and password to create an account.")
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
        alert("Account created successfully!");
        window.location.href = "index.html";
    })
    .catch((error) => {
        alert("Error creating account:" + error.message);
    });
});

// Sign out user with Firebase
signOutBtn.addEventListener('click', () => {
    auth.signOut()
    .then(() => {
        alert("Successfully signed out!");
    })
    .catch((error) => {
        console.error("Sign out error:", error.message)
    });
});

const updateStore = (isLoggedIn) => {
    if (isLoggedIn) {
        authStatus.classList.remove('hidden');
    } else {
        authStatus.classList.add('hidden');
    }
 }