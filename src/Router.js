import { homePage } from "./components/Home";
import { displayProducts } from "./components/Products";
import { displayMensProducts } from "./components/MensCollection";
import { displayShoesProducts } from "./components/Shoes";

const pageView = {
    "/": () => `
        <div class="homepage-banner">
            <img src="./src/assets/homebg.png" alt="Homepage Banner" class="homepage-banner">
        </div>
    `,
    "/products": () => `
                    <li><a href="/" data-link>Home</a></li>
                    <li><a href="/products" data-link>Women's</a></li>
                    <li><a href="/mensCollection" data-link>Men's</a></li>
                    <li><a href="/shoes" data-link>Shoes</a></li>
                    <li><a href="/accessories" data-link>Accessories</a></li>
                </ul>
            </div>
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
        <div id="titles">
            <h1 class="page-title">Women's Shoes</h1>
        </div>
        <div id="shoes-products-container" class="products-grid"></div>
    `
    
};

export const router = async () => {
    const path = window.location.pathname;
    const mainContainer = document.getElementById("main-content");
    // const productsContainer = document.getElementById("products-container");
    // const container = document.getElementById("mens-products-container");

    if (!mainContainer) return;

    const defaultView = pageView[path] || pageView["/"];
    mainContainer.innerHTML = defaultView();

    if (path === "/products") {
        displayProducts("/products1");
    } else if (path === "/mensCollection") {
        displayMensProducts("/mensCollection");
    } else if (path === "/shoes") {
        displayShoesProducts("/shoesCollection");
    }
};

export const navigateTo = (url) => {
    window.history.pushState(null, null, null, url);
    router();
}