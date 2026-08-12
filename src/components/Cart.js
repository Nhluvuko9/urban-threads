import { db } from "../firebase-config.js";
import { collection, 
    onSnapshot,
    doc,
    deletedoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const cartItemsList = document.getElementById('cartItemsList');
const totalPrice = document.getElementById('total-price');

onAuthStateChanged(auth, (user) => {
    if(user) {
        showCart(user.uid);
    } else {
        if (cartItemsList) {
            cartItemsList.innerHTML = "<p>Please sign in to view your cart.</p>";
        }
        if (totalPrice) {
            totalPrice.textContent = "0.00";
        }
    }
});

// Cart display
export const showCart = (userId) => {

    const cartRef = collection(db, "users", userId, "cart");

    onSnapshot(cartRef, (snapshot) => {
        console.log("Cart items found", snapshot.size);
        if (!cartItemsList) {
            console.error("Cart items not found.");
            return;
        }

        cartItemsList.innerHTML = "";

        if(snapshot.empty) {
            cartItemsList.innerHTML = "<p>Your cart is empty.</p>";                totalPrice.textContent ="0.00";
            return;
        }
        
        let standardPriceTotal = 0;

        snapshot.forEach((doc) => {
            const item = doc.data();

            const itemSubtotal = item.price * item.quantity;
            standardPriceTotal += itemSubtotal;

            // Cart item structure
            const cartItem = document.createElement('div');
            cartItem.className = "cartSummary";
            cartItem.innerHTML = `
                <img src="${item.imageURL}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Price: R${item.price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Subtotal: R${itemSubtotal.toFixed(2)}</p>
                </div>
                <button class="remove-btn" data-id="${item.id}">Delete</button>
            `;
            cartItemsList.appendChild(cartItem);
        });
        
        if (totalPrice) {
            totalPrice.textContent = standardPriceTotal.toFixed(2);
        }
    }); 
   

    db.collection('users').doc(userId).collection('cart').onSnapshot((snapshot) => {
        console.log("Cart documents", snapshot.size);

        

        

        

         
        // else {
        //     console.warn ("Element not found")
        // }
        // setupRemoveListeners(userId);
    });
};

// Delet cart items
const setupRemoveListeners = (userId) => {
    const removeBtn = document.querySelectorAll('.remove-btn');
    removeBtn.forEach((button) => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.getAttribute('data-id');
            await db.collection('users').doc(userId).collection('cart').doc(productId).delete();
        });
    });
}

document.addEventListener('click', async (event) => {
    const removeBtn = document.querySelectorAll('.remove-btn');
    if(!removeBtn) {
        return;
    }

    const user = auth.currentUser;
    if(!user) {
        return;
    }

    const productId = removeBtn.getAttribute('data-id');
    try {
        await deleteDoc (doc(db,'users', user.uid, 'cart', productId));

    } catch (error) {
        console.error("Error deleting cart item:", error);
    }

});