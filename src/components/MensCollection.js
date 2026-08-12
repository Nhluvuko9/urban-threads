import { db } from "../firebase-config.js";
import { collection, getDocs, addDoc } from "firebase/firestore";


export const displayMensProducts = async () => {
    // DOM element
    const Container = document.getElementById("mens-products-container");

    // Ensuring page has loaded completely
    if (!Container) {
        console.error("The element #mens-products-container was not found in the html dom");
        return;
    }

    try {
        const querySnapshot = await getDocs(collection(db, "mensCollection"));

        if (querySnapshot.empty) {
            Container.innerHTML = "<p>Error loading our product catalog. Please try again later.</p>";
            return;
        }

        Container.innerHTML= "";

        // Firebase product loop 
        querySnapshot.forEach((doc) => {
            const product = doc.data();

            // HTML for product card display
            const productCardHTML = `
                <div class="product-card" data-id="${doc.id}">
                    <img src="${product.imageURL}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-footer">
                            <span class="product-price">R${product.price.toFixed(2)}</span>
                            <button class="add-to-cart-btn" 
                                    data-id="${doc.id}" 
                                    data-name="${product.name}" 
                                    data-price="${product.price}" 
                                    data-image="${product.imageURL}"
                                    onclick="handleAddToCart(this)">
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // Organising product cards in container
            if (product.category === "Hoodies and Jackets") {
                Container.innerHTML += productCardHTML;
            }
        });
    } catch (error) {
        console.error("Error fetching items from database:", error);
    }
};