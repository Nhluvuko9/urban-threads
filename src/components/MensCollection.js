import { db } from "../firebase-config.js";
import { collection, getDocs, addDoc } from "firebase/firestore";

const mensProducts = [
    {
        name: "Oversized hoodie",
        price: 49.90,
        category: "Hoodies and Jackets",
        description: "Soft cotton hoodie in oversized fit",
        imageURL: "https://i.pinimg.com/736x/53/2c/fb/532cfb48cb3f6a8660d5b3779e550e02.jpg"
    },
    {
        name: "Zip-up hoodie",
        price: 69.90,
        category: "Hoodies and Jackets",
        description: "Blue and white pattern with zip detail",
        imageURL: "https://i.pinimg.com/736x/4f/a4/ae/4fa4ae5b1497b9837773a270c9b2dff6.jpg"
    },
    {
        name: "Oversized textured hoodie",
        price: 69.90,
        category: "Hoodies and Jackets",
        description: "Brown hoodie with textured lines",
        imageURL: "https://i.pinimg.com/1200x/6f/d1/97/6fd197af0f4b2e837be9bc9ed6aa4e7d.jpg"
    },
     {
        name: "Suede jacket",
        price: 139.00,
        category: "Hoodies and Jackets",
        description: "Black suede japanese style jacket with silver hardwear ",
        imageURL: "https://i.pinimg.com/736x/d3/80/17/d38017147c6ffd7dda76d5297ef53e9a.jpg"
    },
     {
        name: "Bomber jacket",
        price: 99.99,
        category: "Hoodies and Jackets",
        description: "Minimalist cropped bomber jacket made from honeycomb textured fabric",
        imageURL: "https://i.pinimg.com/1200x/cd/0c/a2/cd0ca2c37d935d6292c96c3de140f0ed.jpg"
    },
     {
        name: "Stand-up collar jacket",
        price: 119.00,
        category: "Hoodies and Jackets",
        description: "Brown felted-wool blend jacket with button detail",
        imageURL: "https://i.pinimg.com/1200x/30/16/11/301611be3bfda2d5e9343cb32991c3b9.jpg"
    },
];


export const displayMensProducts = async () => {
    const container = document.getElementById("mens-products-container");
    if (!container) {
        console.error("The element #mens-products-container was not found in the html dom");
        return;
    }

    try {
        const querySnapshot = await getDocs(collection(db, "mensProducts"));

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

document.addEventListener("DOMContentLoaded", () =>{
    displayMensProducts();
});


export async function database() {
    try {
        const productsCollection = collection(db, "mensCollection");
        for (const product of mensProducts) {
            const docRef = await addDoc(productsCollection, product)
            console.log(`Product added sucessfully with ID: ${docRef.id}`)
        }
        alert("All products have successfully added into Firestone!")
    } catch (error) {
        console.error("WError adding products to database:", error)
    }
}