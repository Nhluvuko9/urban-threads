import { displayProducts } from "./components/Products";
import { displayMensProducts } from "./components/MensCollection";
import { displayShoesProducts } from "./components/Shoes";
import { displayAccessoriesProducts } from "./components/Accessories";
import { showCart } from "./components/Cart";

const pageView = {
    "/": () => `
        <div class="homepage-banner">
            <img src="./src/assets/homebg.png" alt="Homepage Banner" class="homepage-banner">
        </div>
    `,
    "/products": () => `  
        <div id="titles">
            <h1 class="page-title">Women's Collection</h1>
            <h4>Hoodies and jackets</h4>
        </div>
        <div id="products-container" class="products-grid"></div>
    `,
    
    "/mensCollection": () => `
        <div id="titles">
            <h1 class="page-title">Men's Collection</h1>
            <h4>Hoodies and jackets</h4>
        </div>
        <div id="mens-products-container" class="products-grid"></div>
    `,

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

export const router = async () => {
    const path = window.location.pathname;
    const mainContainer = document.getElementById("main-content");
    
    if (!mainContainer) return;

    const viewFunction = pageView[path] || pageView["/"];
    mainContainer.innerHTML = viewFunction();

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
            const user = firebase.auth().currentUser;
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

export const navigateTo = (url) => {
    window.history.pushState(null, null, url);
    router();
};