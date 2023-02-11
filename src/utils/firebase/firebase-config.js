import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlfqs5K9HEe9c1Eu5bjPXXjr8Hz2mbTZE",
  authDomain: "egrocer-457a9.firebaseapp.com",
  projectId: "egrocer-457a9",
  storageBucket: "egrocer-457a9.appspot.com",
  messagingSenderId: "755773183987",
  appId: "1:755773183987:web:b21f893398fac9c493e486",
  measurementId: "G-Q433G5MT7H"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);


//AIzaSyBdDqLlXGn2RXOgnfPJ8ZMjkQ1DWUD7SMM