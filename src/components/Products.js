import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

// const products = [
//     {
//         name: "Oversized bedazzeled hoodie",
//         price: 249.99,
//         category: "Hoodies and Jackets",
//         description: "Soft cotton hoodie in oversized fit with rhinestone details",
//         imageURL: "https://i.pinimg.com/1200x/67/bf/59/67bf59e8753e5aa9d3e5db30c2f61295.jpg"
//     },
//     {
//         name: "Cropped hoodie",
//         price: 199.99,
//         category: "Hoodies and Jackets",
//         description: "Cropped cotton hoodie with rhinestone details",
//         imageURL: "https://i.pinimg.com/1200x/ec/a0/4f/eca04f9ccedcf4db67e2070c4a02e7ce.jpg"
//     },
//     {
//         name: "Yellow oversized hoodie",
//         price: 249.99,
//         category: "Hoodies and Jackets",
//         description: "Washed out yellow denim look cotton hoodie",
//         imageURL: "https://i.pinimg.com/1200x/d4/9a/44/d49a44313bce9670c86d23f6779a4397.jpg"
//     },
//      {
//         name: "Denim jacket",
//         price: 299.00,
//         category: "Hoodies and Jackets",
//         description: "Puffed denim jacket with elasticated hem",
//         imageURL: "https://i.pinimg.com/736x/c0/a8/d4/c0a8d45dd073dc866e7a6df847f504c4.jpg"
//     },
//      {
//         name: "Suede jacket",
//         price: 349.99,
//         category: "Hoodies and Jackets",
//         description: "Cropped navy blue suede jacket with floral emballishment",
//         imageURL: "https://i.pinimg.com/1200x/b3/0e/47/b30e475b85112357536b95178ad581e5.jpg"
//     },
//      {
//         name: "Faux fur jacket",
//         price: 449.99,
//         category: "Hoodies and Jackets",
//         description: "Cropped black and white faux fur jacket",
//         imageURL: "https://i.pinimg.com/1200x/55/88/18/558818c7879bff892ae0cc2963bac214.jpg"
//     },
// ];


export const displayProducts = async () => {
    const container = document.getElementById("products-container");
    if (!container) {
        console.error("The element #products-container was not found in the html dom");
        return;
    }

    try {
        const querySnapshot = await getDocs(collection(db, "products1"));

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
    displayProducts();
});


export async function database() {
    try {
        const productsCollection = collection(db, "products1");
        for (const product of products) {
            const docRef = await addDoc(productsCollection, product)
            console.log(`Product added sucessfully with ID: ${docRef.id}`)
        }
        alert("All products have successfully added into Firestone!")
    } catch (error) {
        console.error("WError adding products to database:", error)
    }
}