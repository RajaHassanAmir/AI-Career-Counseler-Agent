import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiM-o1eXe9wbbDwh8Y-WZ1s_PsPiinyQc",
  authDomain: "career-ai-13fc3.firebaseapp.com",
  projectId: "career-ai-13fc3",
  storageBucket: "career-ai-13fc3.firebasestorage.app",
  messagingSenderId: "991748639148",
  appId: "1:991748639148:web:f0da4a26f711a9744b5209",
  databaseURL: "https://career-ai-13fc3-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);