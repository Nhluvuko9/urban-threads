import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";

export const homePage = () => {
    const homeContainer = document.getElementById("homepage-banner");
    return homeContainer;
}
    