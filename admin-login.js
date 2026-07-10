// ======================
// FIREBASE IMPORTS
// ======================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

// ======================
// FIREBASE CONFIG
// ======================

const firebaseConfig = {
  apiKey: "AIzaSyAMl53E0np-l4zF0gLFyDPtcTmStISkglI",
  authDomain: "yonoappskiduniya.firebaseapp.com",
  projectId: "yonoappskiduniya",
  storageBucket: "yonoappskiduniya.firebasestorage.app",
  messagingSenderId: "474330790853",
  appId: "1:474330790853:web:da1f01d00a7ffedbc4e9ac"
};

// ======================
// INITIALIZE FIREBASE
// ======================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("✅ Firebase Connected");
// ======================
// LOAD GAMES FROM FIREBASE
// ======================

async function loadGames() {

    const gamesContainer = document.querySelector(".games");

    if (!gamesContainer) return;

    gamesContainer.innerHTML = "";

    try {

        const snapshot = await getDocs(collection(db, "games"));

        if (snapshot.empty) {
            gamesContainer.innerHTML = `
                <h3 style="text-align:center;color:#FFD700;">
                    No Games Available
                </h3>
            `;
            return;
        }

        snapshot.forEach((game) => {

            const data = game.data();

            gamesContainer.innerHTML += `
                <div class="game-card">

                    <img src="${data.image}" alt="${data.name}">

                    <h3>${data.name}</h3>

                    <div class="rating">
                        ⭐⭐⭐⭐⭐
                    </div>

                    <a href="${data.link}"
                       class="install-btn"
                       target="_blank">

                       📲 INSTALL APP

                    </a>

                </div>
            `;

        });

    } catch (error) {

        console.error("Firestore Error:", error);

    }

}

loadGames();
// ======================
// SEARCH GAMES
// ======================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        document.querySelectorAll(".game-card").forEach((card) => {

            const gameName = card.querySelector("h3").textContent.toLowerCase();

            if (gameName.includes(value)) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }

        });

    });

}