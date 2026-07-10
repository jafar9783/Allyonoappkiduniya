// =======================================================
// YonoAppsKiDuniya
// script.js
// PART 1A
// =======================================================

// -------------------------
// Safe Elements
// -------------------------

const searchInput = document.getElementById("searchInput");
const gamesContainer = document.getElementById("gamesContainer");
const visitorBox = document.getElementById("visitors");
const winnerPopup = document.getElementById("winner-popup");

// -------------------------
// Banner Slider
// -------------------------

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    if (slides.length > 0) {
        slides[index].classList.add("active");
    }

}

function nextSlide() {

    if (slides.length === 0) return;

    currentSlide++;

    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }

    showSlide(currentSlide);

}

if (slides.length > 0) {

    showSlide(0);

    setInterval(nextSlide, 3000);

}

// -------------------------
// Live Visitors
// -------------------------

if (visitorBox) {

    let visitors = 1250;

    visitorBox.innerText = visitors;

    setInterval(() => {

        visitors += Math.floor(Math.random() * 5) + 1;

        visitorBox.innerText = visitors;

    }, 5000);

}
// =======================================================
// PART 1B
// Firebase Load Games
// =======================================================

async function loadGames() {

    if (!gamesContainer) return;

    try {

        const snapshot = await window.getDocs(
            window.collection(window.db, "games")
        );

        // Purane Firebase cards remove
        document.querySelectorAll(".firebase-game").forEach(card => {
            card.remove();
        });

        snapshot.forEach((gameDoc) => {

            const game = gameDoc.data();

            const card = document.createElement("div");

            card.className = "game-card firebase-game";

            card.innerHTML = `

                <img src="images/${game.image}"
                alt="${game.name}"
                onerror="this.src='images/logo.png'">

                <h3>${game.name}</h3>

                <div class="rating">
                    ${game.rating || "⭐⭐⭐⭐⭐"}
                </div>

                <a href="${game.link}"
                target="_blank"
                class="install-btn">

                    📲 INSTALL APP

                </a>

            `;

            gamesContainer.appendChild(card);

        });

    } catch (error) {

        console.error("Firebase Error:", error);

    }

}
// =======================================================
// PART 2A
// Game Count + Search
// =======================================================

function updateGameCount() {

    const gameCount = document.getElementById("gameCount");

    if (!gameCount) return;

    const total =
    document.querySelectorAll(".game-card").length;

    gameCount.innerText =
    total + " Trusted Games Available";

}

function enableSearch() {

    if (!searchInput) return;

    searchInput.addEventListener("keyup", function () {

        const value =
        this.value.toLowerCase();

        document.querySelectorAll(".game-card")
        .forEach(card => {

            const name =
            card.querySelector("h3")
            .innerText
            .toLowerCase();

            if (name.includes(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

updateGameCount();

enableSearch();
// =======================================================
// PART 2B
// Auto Refresh Firebase Games
// =======================================================

function refreshFirebaseGames() {

    loadGames();

    updateGameCount();

}

// Page Load

window.addEventListener("load", () => {

    setTimeout(() => {

        refreshFirebaseGames();

    }, 1000);

});

// Auto Refresh Every 15 Seconds

setInterval(() => {

    refreshFirebaseGames();

}, 15000);

// Refresh After Page Focus

window.addEventListener("focus", () => {

    refreshFirebaseGames();

});
// =======================================================
// PART 3A
// Winner Popup + Install Button
// =======================================================

const winners = [
    "Rahul won ₹520",
    "Aman won ₹860",
    "Rohit won ₹1200",
    "Vikas won ₹750",
    "Sunny won ₹2000",
    "Riya won ₹980",
    "Ankit won ₹640",
    "Pooja won ₹1450"
];

function showWinner() {

    if (!winnerPopup) return;

    const randomWinner =
        winners[Math.floor(Math.random() * winners.length)];

    winnerPopup.innerHTML = "🎉 " + randomWinner;

    winnerPopup.style.display = "block";

    setTimeout(() => {

        winnerPopup.style.display = "none";

    }, 3000);

}

setInterval(showWinner, 8000);

// ----------------------------
// Install Button Effect
// ----------------------------

document.addEventListener("click", function (e) {

    if (!e.target.classList.contains("install-btn")) return;

    const btn = e.target;

    const oldText = btn.innerHTML;

    btn.innerHTML = "⏳ Opening...";

    setTimeout(() => {

        btn.innerHTML = oldText;

    }, 2000);

});
// =======================================================
// PART 3B
// Image Error + Final Init
// =======================================================

// Image Error Fix
document.querySelectorAll(".game-card img").forEach(img => {

    img.onerror = function () {

        this.src = "images/logo.png";

    };

});

// Hide Winner Popup On Load

if (winnerPopup) {

    winnerPopup.style.display = "none";

}

// Initial Firebase Load

window.addEventListener("DOMContentLoaded", () => {

    loadGames();

    updateGameCount();

    enableSearch();

});

// Final Console

console.log("✅ YonoAppsKiDuniya Loaded Successfully");
