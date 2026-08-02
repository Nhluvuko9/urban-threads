import { displayProducts } from "./components/Products";
import { displayMensProducts } from "./components/MensCollection";

const pageView = {
    "/products1": () => `
        <div class="titles">
            <h2 class="page-title">Women's Collection</h2>
            <h5>Hoodies and jackets</h5>
        </div>
        <div id="products-container" class="products-grid"></div>
    `,
    "/mensCollection": () => `
        <div id="mens-products-container" class="products-grid"></div>
    `
};

export const router = async () => {
    const path = window.location.pathname;
    const productsContainer = document.getElementById("products-container");

    if (!productsContainer) return;

    const defaultView = pageView[path] || pageView["/products1"];
    productsContainer.innerHTML = defaultView();

    if (path === "/mensCollection" || path === "shoes" || path === "accessories") {
        displayProducts();
        displayMensProducts();
    }
};

export const navigateTo = (url) => {
    window.history.pushState(null, null, url);
    router();
}