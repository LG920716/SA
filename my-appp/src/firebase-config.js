import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeg1L0pGndJ5hhQs4PajrpbQd5mX87nQs",
  authDomain: "sa-project-7e04f.firebaseapp.com",
  projectId: "sa-project-7e04f",
  storageBucket: "sa-project-7e04f.appspot.com",
  messagingSenderId: "242861253845",
  appId: "1:242861253845:web:7d9a698b706586faffae5c",
  measurementId: "G-YD6KQVBKNJ",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
export const notesCollectionRef = collection(db, "notes");
export const eventsCollectionRef = collection(db, "events");
export const projectsCollectionRef = collection(db, "projects");
export const expensesCollectionRef = collection(db, "expenses");
