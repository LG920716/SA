import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEd6TVkA2r3yg8NHmsh2A5ld2SJlq7iJA",
  authDomain: "sa-project-d7a1c.firebaseapp.com",
  projectId: "sa-project-d7a1c",
  storageBucket: "sa-project-d7a1c.appspot.com",
  messagingSenderId: "181071305167",
  appId: "1:181071305167:web:0fbffe43c2de3f09445aba",
  measurementId: "G-FKH75S2579"
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
