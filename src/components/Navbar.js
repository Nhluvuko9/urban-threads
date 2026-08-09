const firebaseConfig = {
  apiKey: "AIzaSyB4F31clzqEAEmNG9ena5fy6ob3eCCxRzk",
  authDomain: "urban-threads-nhluvuko.firebaseapp.com",
  projectId: "urban-threads-nhluvuko",
  storageBucket: "urban-threads-nhluvuko.firebasestorage.app",
  messagingSenderId: "276110476778",
  appId: "1:276110476778:web:47f9226eb63f0311b21e93",
  measurementId: "G-6M6KG2923V"
};

if (!firebase.app.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();

// DOM elements
const authLink = document.getElementById("authLink");
const accountTooltip = document.getElementById("accountTooltip");

// Handle dynamic click event 
let currentUser = null;

auth.onAuthStateChange((user) => {
    if(user) {
        currentUser = user;
        const userName = user.email.split('@')[0];
        accountTooltip.textContent = `Hello, ${username}`;
        authLink.removeAttribute('href');
    } else {
        currentUser = null;
        accountTooltip.textContent = "Sign in";
        authLink.setAttribute('href', 'login.html');
    }
});

// Handle account icon 
authLink.addEventListener('click', (event) => {
    if (currentUser) {
        event.preventDefault();
        auth.signOut()
        .then(() => {
            alert("Successfully signed out!");
            window.location.reload();
        })
        .catch((error) => {
        console.error("Sign out failed:", error.message);
        });
    }
})