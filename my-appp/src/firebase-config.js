import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAngXAoIKq7Ml4MBTFo157gDrCXNLwNKeA",
  authDomain: "satest-ab513.firebaseapp.com",
  projectId: "satest-ab513",
  storageBucket: "satest-ab513.appspot.com",
  messagingSenderId: "446029317357",
  appId: "1:446029317357:web:692f719bf06e69101638e4",
  measurementId: "G-XXWBN0Z5L6"
};

//test
// const firebaseConfig = {
//   apiKey: "AIzaSyBr6XDYQcRAWIO0Qf79JG93onHHeEP1m5c",
//   authDomain: "test-431dd.firebaseapp.com",
//   projectId: "test-431dd",
//   storageBucket: "test-431dd.appspot.com",
//   messagingSenderId: "6825246139",
//   appId: "1:6825246139:web:54676a96fd11fd42e7189e",
//   measurementId: "G-8BF2ZQCM7N",
// };

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
