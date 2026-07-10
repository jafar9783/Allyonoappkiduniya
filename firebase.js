// ==============================
// YonoAppsKiDuniya Firebase
// ==============================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMl53E0np-l4zF0gLFyDPtcTmStISkglI",
  authDomain: "yonoappskiduniya.firebaseapp.com",
  projectId: "yonoappskiduniya",
  storageBucket: "yonoappskiduniya.firebasestorage.app",
  messagingSenderId: "474330790853",
  appId: "1:474330790853:web:da1f01d00a7ffedbc4e9ac"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Global Variables
window.db = db;
window.collection = collection;
window.getDocs = getDocs;
window.addDoc = addDoc;
window.updateDoc = updateDoc;
window.deleteDoc = deleteDoc;
window.doc = doc;

console.log("✅ Firebase Connected Successfully");