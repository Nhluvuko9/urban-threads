import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    collection,
    onSnapshot
 } from "firebase/firestore";
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';

let currentUserId = null;
let cartListner = null;

// Keep cart quantity in navbar updated
onAuthStateChanged(auth, (user) => {
    const cartQuantity = document.getElementById('cart-quantity');
    if(user) {
        currentUserId = user.uid;
        console.log("User logged in:", currentUserId);

        const cartRef = collection(db, 'users', user.uid, 'cart');
        cartListner = onSnapshot(cartRef, (snapshot) => {
            let totalQty = 0;
            snapshot.forEach((d) => {
                const data = d.data();
                totalQty += Number(data.quantity || 0);
            });
            if (cartQuantity) cartQuantity.textContent = totalQty;
        });
    } else {
        currentUserId = null;
        console.log("No User logged in.");
        if (cartListner) {
            cartListner();
            cartListner = null;
        }

        if (cartQuantity) cartQuantity.textContent = 0;
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
    
    if (!productId || !productName || isNaN(productPrice) || !productImage) {
        alert("Unable to add item to your cart.");
        return;
    }
    
    const cartItemRef = doc(db, 'users', currentUserId, 'cart', productId);

    // Adding item to cart and incrementing quantity if exists
    try {
        const cartSnap = await getDoc(cartItemRef);
        if (cartSnap.exists()) {
            await updateDoc(cartItemRef, { quantity: increment(1) });
        } else {
            await setDoc(cartItemRef, {
                id: productId,
                name: productName,
                price: productPrice,
                imageURL: productImage,
                quantity: 1
            });
        }
        alert(`${productName} added to cart!`);
    } catch (error) {
        alert("Error updating cart:" + (error.message || error));
    }
});

window.handleAddToCart = async (button) => {
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

    console.log("Attemp to add products:", {productId, productName, productPrice, productImage});

    if (!productId || !productName || isNaN(productPrice) || !productImage) {
        alert("Unable to add item to your cart.");
        return;
    }

    const cartItemRef = doc(db, 'users', currentUserId, 'cart', productId);

    // Adding item to cart and incrementing quantity if exists
    try {
        const cartSnap = await getDoc(cartItemRef);
        if (cartSnap.exists()) {
            await updateDoc(cartItemRef, { quantity: increment(1) });
        } else {
            await setDoc(cartItemRef, {
                id: productId,
                name: productName,
                price: productPrice,
                imageURL: productImage,
                quantity: 1
            });
        }
        alert(`${productName} added to cart!`);
    } catch (error) {
        alert("Error updating cart:" + (error.message || error));
    }
};