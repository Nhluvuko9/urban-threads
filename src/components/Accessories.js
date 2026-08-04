import { db } from "../firebase-config.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

const accessoryProducts = [
    {
        name: "Retro mesh sneakers",
        price: 99.90,
        category: "Womens Shoes",
        description: "Mesh upper with cow-print trim and rubber sole",
        imageURL: "https://i.pinimg.com/1200x/d4/f0/e6/d4f0e64579ad08dcdf508e1edb8128cc.jpg"
    },
    {
        name: "Classic suede sneakers",
        price: 69.90,
        category: "Women's Shoes",
        description: "Classic pink suede design with comfortable cushioning",
        imageURL: "https://i.pinimg.com/1200x/5e/36/99/5e3699d529d130830ce70380a9816a58.jpg"
    },
    {
        name: "Runner mesh sneakers",
        price: 89.90,
        category: "Women's Shoes",
        description: "Olive and espresso mesh upper with rubber sole and cushioned insole",
        imageURL: "https://i.pinimg.com/736x/27/6a/e2/276ae2517cb1f0e3b4d853db00480e33.jpg"
    },
    {
        name: "Rodeo muse fringe heel",
        price: 90.00,
        category: "Women's Shoes",
        description: "Natural cow-print pattern with fringe detail and suede trim heel",
        imageURL: "https://i.pinimg.com/736x/76/00/ed/7600eddd42650f02e21a0ecb0dae07b6.jpg"
    },
    {
        name: "Leather-upper sandals",
        price: 75.90,
        category: "Women's Shoes",
        description: "Elegant pastel blueleather upper with silver detail and elasticated ankle strap",
        imageURL: "https://i.pinimg.com/1200x/92/5a/7f/925a7f0e75ab778fe0c556f42bb79af9.jpg"
    },
    {
        name: "Studded pony-hair knee-high boots",
        price: 170.00,
        category: "Women's Shoes",
        description: "Mixed suede and leather knee-high boots with studded detail and stiletto heel",
        imageURL: "https://i.pinimg.com/1200x/8c/05/7c/8c057c34da11ed1d284954117d10657b.jpg"
    },
];

export const displayAccessoriesProducts = async () => {
    const container = document.getElementById("accessories-container");
    if (!container) {
        console.error("The element #accessories-container was not found in the html dom");
        return;
    }

    try {
        const querySnapshot = await getDocs(collection(db, "accessoriesCollection"));

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