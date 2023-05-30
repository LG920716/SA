import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// const firebaseConfig = {
//   apiKey: "AIzaSyCrc1-AotWkSo9hf5VwuLEK5Elo9GEoweE",
//   authDomain: "sa-project-2f0fc.firebaseapp.com",
//   projectId: "sa-project-2f0fc",
//   storageBucket: "sa-project-2f0fc.appspot.com",
//   messagingSenderId: "948003317990",
//   appId: "1:948003317990:web:6db26ff7f3e0ffd54d3327",
//   measurementId: "G-FB13Z7XN10"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDMCf_Re5jo40lNJKd4DGKtPHZxVyPpShU",
  authDomain: "sa-firebase-30573.firebaseapp.com",
  projectId: "sa-firebase-30573",
  storageBucket: "sa-firebase-30573.appspot.com",
  messagingSenderId: "306156875849",
  appId: "1:306156875849:web:7227bf0b830e2c56690f98",
  measurementId: "G-F2F9LRDDJM"
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
