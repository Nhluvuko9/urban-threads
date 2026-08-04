import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";


// const titlesContainer = document.getElementById("titles");
// if (!titlesContainer) {
//     console.warn("The element #titles was not found in the html dom");
// }
export const displayProducts = async (products1) => {
    const container = document.getElementById("products-container");
    if (!container) {
        console.warn("The element #products-container was not found in the html dom");
        return;
    }

    try {
        const querySnapshot = await getDocs(collection(db, "products1"));
        console.log(`Successfully fetched from database folder: ${products1}. Found ${querySnapshot.size} items.`);

        const verifyContainerExists = document.getElementById("products-container");
        if (!verifyContainerExists) return; 

        if (querySnapshot.empty) {
            container.innerHTML = "<p>Error loading our product catalog. Please try again later.</p>";
            return;
        }

        container.innerHTML= "";
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productCardHTML = `
                <div class="product-card" data-id="${doc.id}">
                    <img src="${product.imageURL}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <span class="product-category">${product.category}</span>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-footer">
                            <span class="product-price">$${product.price.toFixed(2)}</span>
                            <button class="add-to-cart-btn">Add to cart</button>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += productCardHTML;
        });
    } catch (error) {
        console.error("Error fetching items from database:", error);
    }
};

// document.addEventListener("DOMContentLoaded", () =>{
//     displayProducts();
// });


export async function database() {
    try {
        const productsCollection = collection(db, "products1");
        for (const product of products) {
            const docRef = await addDoc(productsCollection, product)
            console.log(`Product added sucessfully with ID: ${docRef.id}`)
        }
        alert("All products have successfully added into Firestone!")
    } catch (error) {
        console.error("Error adding products to database:", error)
    }
}