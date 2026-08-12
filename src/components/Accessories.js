import { db } from "../firebase-config.js";
import { collection, getDocs, addDoc } from "firebase/firestore";



export const displayAccessoriesProducts = async () => {
    // DOM elements
    const womensContainer = document.getElementById("womens-accessories-container");
    const mensContainer = document.getElementById("mens-accessories-container");

    // Ensuring page has loaded completely
    if (!womensContainer || !mensContainer) {
        console.error("One or more required elements were not found in the html dom");
        return;
    }

    try {
        const querySnapshot = await getDocs(collection(db, "accessoriesCollection"));

        womensContainer.innerHTML= "";
        mensContainer.innerHTML= "";
        
        if (querySnapshot.empty) {
            womensContainer.innerHTML = "<p>Error loading our product catalog. Please try again later.</p>";
            mensContainer.innerHTML = "<p>Error loading our product catalog. Please try again later.</p>";
            return;
        }
        
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
                            <button class="add-to-cart-btn" data-id="${doc.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.imageURL}">Add to cart</button>
                        </div>
                    </div>
                </div>
            `;

            // Organising product cards according to container 
            if (product.category === "Women's Accessories") {
                womensContainer.innerHTML += productCardHTML;
            } else if (product.category === "Mens Accessories") {
                mensContainer.innerHTML += productCardHTML;
            }
            
        });
    } catch (error) {
        console.error("Error fetching items from database:", error);
    }
};   