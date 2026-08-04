import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

export const homePage = () => {
    const homeContainer = document.getElementById("homepage-banner");
    // const homebanner = `
    // <div class="homepage-banner">
    //     <img src="./src/assets/homebg.png" alt="Homepage Banner" class="homepage-banner">
    // </div>
    // `;
    return homeContainer;
}
    