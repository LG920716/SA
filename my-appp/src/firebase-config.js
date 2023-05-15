import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9R1YugPwcxETx_lU2jhD92_Ogc_OsgXk",
  authDomain: "sa-css.firebaseapp.com",
  projectId: "sa-css",
  storageBucket: "sa-css.appspot.com",
  messagingSenderId: "1060226801896",
  appId: "1:1060226801896:web:5172196924fe242669295d",
  measurementId: "G-5TD1B1DBP7",
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
