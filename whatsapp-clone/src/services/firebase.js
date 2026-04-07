import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD66fnx8i3O_RqnQk1bBdkTgySSlzQm_XA",
  authDomain: "whatsapp-clone-f7021.firebaseapp.com",
  projectId: "whatsapp-clone-f7021",
  storageBucket: "whatsapp-clone-f7021.firebasestorage.app",
  messagingSenderId: "214329439061",
  appId: "1:214329439061:web:a9ae62e2bd214f71fbb5dc",
  measurementId: "G-B03Z2L91KG",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
