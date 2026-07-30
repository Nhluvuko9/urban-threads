import { db } from "./firebase-config.js";
import { collection, addDoc } from "firebase/firestore";

const Products = [
    {
        name: "Oversized bedazzeled hoodie",
        price: 249.99,
        category: "Hoodies and Jackets",
        description: "Soft cotton hoodie in oversized fit with rhinestone details",
        imageURL: "https://i.pinimg.com/1200x/67/bf/59/67bf59e8753e5aa9d3e5db30c2f61295.jpg"
    },
    {
        name: "Cropped hoodie",
        price: 199.99,
        category: "Hoodies and Jackets",
        description: "Cropped cotton hoodie with rhinestone details",
        imageURL: "https://i.pinimg.com/1200x/ec/a0/4f/eca04f9ccedcf4db67e2070c4a02e7ce.jpg"
    },
    {
        name: "Yellow oversized hoodie",
        price: 249.99,
        category: "Hoodies and Jackets",
        description: "Washed out yellow denim look cotton hoodie",
        imageURL: "https://i.pinimg.com/1200x/d4/9a/44/d49a44313bce9670c86d23f6779a4397.jpg"
    },
     {
        name: "Denim jacket",
        price: 299.00,
        category: "Hoodies and Jackets",
        description: "Puffed denim jacket with elasticated hem",
        imageURL: ""
    },
     {
        name: "Suede jacket",
        price: 349.99,
        category: "Hoodies and Jackets",
        description: "Cropped navy blue suede jacket with floral emballishment",
        imageURL: "https://i.pinimg.com/1200x/b3/0e/47/b30e475b85112357536b95178ad581e5.jpg"
    },
     {
        name: "Faux fur jacket",
        price: 449.99,
        category: "Hoodies and Jackets",
        description: "Cropped black and white faux fur jacket",
        imageURL: "https://i.pinimg.com/1200x/55/88/18/558818c7879bff892ae0cc2963bac214.jpg"
    },
];

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