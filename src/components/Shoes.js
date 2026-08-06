import { db } from "../firebase-config.js";
import { collection, getDocs, addDoc } from "firebase/firestore";


export const displayShoesProducts = async () => {
    const container = document.getElementById("shoes-products-container");
    const menscontainer = document.getElementById("mens-shoes-container");
    if (!container || !menscontainer) {
        console.error("One or more required elements were not found in the html dom");
        return;
    }

    try {
        const querySnapshot = await getDocs(collection(db, "shoesCollection"));

        if (querySnapshot.empty) {
            container.innerHTML = "<p>Error loading our product catalog. Please try again later.</p>";
            return;
        }

        container.innerHTML= "";
        menscontainer.innerHTML= "";
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
            if (product.category === "Women's Shoes") {
                container.innerHTML += productCardHTML;
            } else if (product.category === "Men's Shoes") {
                menscontainer.innerHTML += productCardHTML;
            }
        });
    } catch (error) {
        console.error("Error fetching items from database:", error);
    }
};   

export async function database() {
    try {
        const productsCollection = collection(db, "shoesCollection");
        for (const product of shoeProducts) {
            const docRef = await addDoc(productsCollection, product)
            console.log(`Product added sucessfully with ID: ${docRef.id}`)
        }
        alert("All products have successfully added into Firestone!")
    } catch (error) {
        console.error("Error adding products to database:", error)
    }
}

// database();