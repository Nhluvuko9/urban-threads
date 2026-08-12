import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc,
    getDoc,
    setDoc,
    updateDoc,
    increment
 } from "firebase/firestore";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

let currentUserId = null;

// Current user information
onAuthStateChanged(auth, (user) => {
    if(user) {
        currentUserId = user.uid;
        console.log("User logged in:", currentUserId);
        // updateShoppingCart();
    } else {
        currentUserId = null;
        console.log("No User logged in.");
        // updateCartItems(0);
    }
});

// Add to cart functions
document.addEventListener('click', async (event) => {
    const button = event.target.closest(".add-to-cart-btn");
   
    if (!button) {
        return;
    }

    if (!currentUserId) {
        alert("Please sign in to add item to your cart.")
        window.location.href = "login.html";
        return;
    } 

    // Product info from button
    const productId = button.getAttribute('data-id');
    const productName = button.getAttribute('data-name');
    const productPrice = Number(button.getAttribute('data-price'));
    const productImage = button.getAttribute('data-image');
    
    if (!productId || !productName || !productPrice || !productImage) {
        alert("Unable to add item to your cart.");
        return;
    }
    
    const cartItemRef = db.collection('users').doc(currentUserId).collection('cart').doc(productId);

    // Adding item to cart and quantity of item in cart 
    try {
        const doc = await cartItemRef.get();
            if(doc.exists) {
                await cartItemRef.update ({
                    quantity: firebase.firestore.FieldValue.increment(1)
                });
            } else {
                await cartItemRef.set({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    imageURL: productImage,
                    quantity: 1
                });
            }
            alert(`${productName} added to cart!`);
            // updateShoppingCart();
        } catch(error) {
        alert("Error updating cart:" + error.message);
    }   
});

