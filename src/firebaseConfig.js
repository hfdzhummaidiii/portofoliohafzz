// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// GANTI DENGAN KONFIGURASI PROYEK FIREBASE ANDA SENDIRI!
const firebaseConfig = { apiKey: "AIzaSyCkI9qb4kp1KKVLuRcO2I56nhvqICo77iw", authDomain: "hafzzprojects.firebaseapp.com", projectId: "hafzzprojects", storageBucket: "hafzzprojects.firebasestorage.app", messagingSenderId: "269053010908", appId: "1:269053010908:web:0b84931debf6922170a519", measurementId: "G-1RS5W9SL7X" };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Catatan: Jika Anda berencana menggunakan Storage (untuk gambar), kita akan 
// import dan inisialisasi getStorage di sini juga nanti.