import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrc1-AotWkSo9hf5VwuLEK5Elo9GEoweE",
  authDomain: "sa-project-2f0fc.firebaseapp.com",
  projectId: "sa-project-2f0fc",
  storageBucket: "sa-project-2f0fc.appspot.com",
  messagingSenderId: "948003317990",
  appId: "1:948003317990:web:9f2b9b6355b6c1274d3327",
  measurementId: "G-0225MTR9LT",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const notesCollectionRef = collection(db, "notes");
export const eventsCollectionRef = collection(db, "events");
export const usersCollectionRef = collection(db, "users");

