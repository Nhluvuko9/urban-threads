import { db } from "../firebase-config.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

// const accessoryProducts = [
//     {
//         name: " Minimalist leather belt",
//         price: 49.99,
//         category: "Women's Accessories",
//         description: "Classic cognac leather buckle-less belt ",
//         imageURL: "https://i.pinimg.com/736x/02/d6/d0/02d6d00309eb1e9d451c63ecc5f371c4.jpg"
//     },
//     {
//         name: "Aviator sunglasses",
//         price: 45.90,
//         category: "Women's Accessories",
//         description: "Tortoise shell avaiator sunglasses",
//         imageURL: "https://i.pinimg.com/1200x/65/d6/74/65d674596cece2e11cae49c5c31a26c3.jpg"
//     },
//     {
//         name: "Bracelet",
//         price: 59.90,
//         category: "Mens Accessories",
//         description: "Stainless steel cuban link bracelet with lobster clasp",
//         imageURL: "https://i.pinimg.com/1200x/aa/62/21/aa62213e1d95f7deb786996a4fe77b1d.jpg"
//     },
//     {
//         name: "Baseball cap",
//         price: 49.99,
//         category: "Mens Accessories",
//         description: "Two-tone New York Yankees baseball cap",
//         imageURL: "https://i.pinimg.com/736x/38/f1/d9/38f1d98233d7dd925dc7cce4149c327a.jpg"
//     },
//     {
//         name: "Mochi bag",
//         price: 139.99,
//         category: "Women's Accessories",
//         description: "Royal blue suede mochi bag",
//         imageURL: "https://i.pinimg.com/1200x/a1/c5/42/a1c54266c86db3f9e6f23586edd5fc5c.jpg"
//     },
//     {
//         name: "Shoulder bag",
//         price: 99.90,
//         category: "Women's Accessories",
//         description: " Olive green, ruched, slouchy shoulder bag",
//         imageURL: "https://i.pinimg.com/1200x/51/24/fd/5124fdd32c6892de67698f0252b20ed7.jpg"
//     },
    
    
// ];

export const displayAccessoriesProducts = async () => {
    const womensContainer = document.getElementById("womens-accessories-container");
    const mensContainer = document.getElementById("mens-accessories-container");
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
                            <span class="product-price">R${product.price.toFixed(2)}</span>
                            <button class="add-to-cart-btn" data-id="${doc.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.imageURL}">Add to cart</button>
                        </div>
                    </div>
                </div>
            `;

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

export async function database() {
    try {
        const productsCollection = collection(db, "accessoriesCollection");
        for (const product of accessoryProducts) {
            const docRef = await addDoc(productsCollection, product)
            console.log(`Product added sucessfully with ID: ${docRef.id}`)
        }
        alert("All products have successfully added into Firestone!")
    } catch (error) {
        console.error("Error adding products to database:", error)
    }
}

// database();