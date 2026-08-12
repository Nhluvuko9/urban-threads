import { db, auth } from "../firebase-config.js";
import { collection, 
    onSnapshot,
    doc,
    deleteDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
    const cartProductsList = document.getElementById('cartItemsList');
    const totalPrice = document.getElementById('total-price');
    if(user) {
        showCart(user.uid);
    } else {
        if (cartProductsList) {
            cartProductsList.innerHTML = "<p>Please sign in to view your cart.</p>";
        }
        if (totalPrice) {
            totalPrice.textContent = "0.00";
        }
    }
});

// Cart display
export const showCart = (userId) => {
    const cartProductsList = document.getElementById('cartItemsList');
    const totalPrice = document.getElementById('total-price');
    if (!cartProductsList) {
        console.error('Cart container not found; aborting showCart.');
        return;
    }

    const cartRef = collection(db, "users", userId, "cart");

    onSnapshot(cartRef, (snapshot) => {
        console.log("Cart items found", snapshot.size);
        cartProductsList.innerHTML = "";

        if(snapshot.empty) {
            cartProductsList.innerHTML = "<p>Your cart is empty.</p>";
            if (totalPrice) totalPrice.textContent = "0.00";
            return;
        }
        
        let standardPriceTotal = 0;

        snapshot.forEach((docSnap) => {
            const product = docSnap.data();

            const productSubtotal = product.price * product.quantity;
            standardPriceTotal += productSubtotal;

            // Cart product structure
            const cartProduct = document.createElement('div');
            cartProduct.className = "cartSummary";
            cartProduct.innerHTML = `
                <img src="${product.imageURL}" alt="${product.name}" class="cart-product-img">
                <div class="cart-product-details">
                    <h4>${product.name}</h4>
                    <p>Price: R${product.price.toFixed(2)}</p>
                    <p>Quantity: ${product.quantity}</p>
                    <p>Subtotal: R${productSubtotal.toFixed(2)}</p>
                </div>
                <button class="remove-btn" data-id="${product.id}">Delete</button>
            `;
            cartProductsList.appendChild(cartProduct);
        });
        
        if (totalPrice) {
            totalPrice.textContent = standardPriceTotal.toFixed(2);
        }
    });
};

document.addEventListener('click', async (event) => {
    const removeBtn = event.target.closest('.remove-btn');
    if (!removeBtn) return;

    const user = auth.currentUser;
    if(!user) {
        console.log("User not authenticated.");
        return;
    }

    const productId = removeBtn.getAttribute('data-id');
    if (!productId) {
        console.log ("No productId found.");
        return;
    }

    try {
        await deleteDoc(doc(db,'users', user.uid, 'cart', productId));
        alert(`Item ${productId} successfully deleted!`)

    } catch (error) {
        console.error("Error deleting cart item:", error);
    }

});



