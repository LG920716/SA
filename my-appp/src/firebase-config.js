import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYk5dlRF-7RG7FCTfn58Fg1RwvLSofNKE",
  authDomain: "sa-final-79259.firebaseapp.com",
  projectId: "sa-final-79259",
  storageBucket: "sa-final-79259.appspot.com",
  messagingSenderId: "680242081016",
  appId: "1:680242081016:web:8e328f4666568bb2369f0d",
  measurementId: "G-N0K81ZJB1D"
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
export const moneyCollectionRef = collection(db, "money");
