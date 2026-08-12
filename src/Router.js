import { displayProducts } from "./components/Products";
import { displayMensProducts } from "./components/MensCollection";
import { displayShoesProducts } from "./components/Shoes";
import { displayAccessoriesProducts } from "./components/Accessories";
import { showCart } from "./components/Cart";
import { auth } from "./firebase-config.js";

// HTML layout for each URL path/page
const pageView = {
    // Homepage layout
    "/": () => `
        <div class="homepage-banner">
            <div class="top-banner">
                <img src="./src/assets/img3.jpg" alt="Homepage image" class="image3">
                <img src="./src/assets/img4.png" alt="Homepage image" class="image4">
            </div>
            <div class="middle-banner">
                <img src="./src/assets/img5.png" alt="Homepage image" class="image5">
                <img src="./src/assets/img2.jpg" alt="Homepage image" class="image2">
            </div>
            <div class="bottom-banner">
                <img src="./src/assets/img1.jpg" alt="Homepage image" class="image1">
                <img src="./src/assets/img6.jpg" alt="Homepage image" class="image6">
            </div>
        </div>
    `,
    // Women's collection page layout
    "/products": () => `  
        <div id="titles">
            <h1 class="page-title">Women's Collection</h1>
            <h4>Hoodies and jackets</h4>
        </div>
        <div id="products-container" class="products-grid"></div>
    `,

    // Men's collection page layout
    "/mensCollection": () => `
        <div id="titles">
            <h1 class="page-title">Men's Collection</h1>
            <h4>Hoodies and jackets</h4>
        </div>
        <div id="mens-products-container" class="products-grid"></div>
    `,

    // Shoes page layout
    "/shoes": () => `
        <div id="shoes-titles">
            <h3 class="page-title">Women's Shoes</h3>
        </div>
        <div id="shoes-products-container" class="products-grid"></div> <br>
        
        <div id="shoes-titles">
            <h3 class="page-title"> Men's Shoes</h3>
        </div>
        <div id="mens-shoes-container" class="products-grid"></div>
    `,

    // Accessories page layout
    "/accessories": () => `
        <div id="accessories-titles">
            <h3 class="page-title">Women's Accessories</h3>
        </div>
        <div id="womens-accessories-container" class="products-grid"></div>
        <div id="accessories-titles">
            <h3 class="page-title"> Men's Accessories</h3>
        </div>
        <div id="mens-accessories-container" class="products-grid"></div>
    `,

    // Shopping cart and cart-summary layout
    "/cart": () => `
        <div class="cart">
            <div class="cart-container">
                <h1>In your Bag</h1>
        
                <div id="cartItemsList"></div>
        
                <div class="cartSummary">
                    <h3>Subtotal: R <span id="total-price">0.00</span></h3>
                    <button class="checkout-btn">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    `
};

// Checks and load current page content and data
export const router = async () => {
    const path = window.location.pathname;
    const mainContainer = document.getElementById("main-content");
    
    if (!mainContainer) return;

    // Match route more flexibly to support being served from a subpath
    console.log("Routing to path:", path);
    const keys = Object.keys(pageView);
    let match = keys.find((k) => k === path || path.endsWith(k));
    if (!match) match = "/";
    const viewFunction = pageView[match] || pageView["/"];
    console.log("Matched route key:", match);
    mainContainer.innerHTML = viewFunction();

    // Fetching and displaying database data based on the page open
    try {
        if (path === "/products") {
            await displayProducts();
        } else if (path === "/mensCollection") {
            await displayMensProducts();
        } else if (path === "/shoes") {
            await displayShoesProducts();
        } else if (path === "/accessories") {
            await displayAccessoriesProducts();
        } else if (path === "/cart") {
            const user = auth.currentUser;
            // Prevent guest user from accessing cart 
            if (!user) {
                document.getElementById("cartItemsList").innerHTML = "<p>Login to view your cart.</p>";
                return;
            } 
            showCart(user.uid);
        }
      } catch (error) {
        console.error(`Error rendering page ${path}:`, error);
    }
};

// Navigation trigger to change URL without reloading page
export const navigateTo = (url) => {
    window.history.pushState(null, null, url);
    router();
};