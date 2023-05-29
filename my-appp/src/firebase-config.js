import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAngXAoIKq7Ml4MBTFo157gDrCXNLwNKeA",
//   authDomain: "satest-ab513.firebaseapp.com",
//   projectId: "satest-ab513",
//   storageBucket: "satest-ab513.appspot.com",
//   messagingSenderId: "446029317357",
//   appId: "1:446029317357:web:692f719bf06e69101638e4",
//   measurementId: "G-XXWBN0Z5L6"
// };

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

// const firebaseConfig = {
//   apiKey: "AIzaSyAEd6TVkA2r3yg8NHmsh2A5ld2SJlq7iJA",
//   authDomain: "sa-project-d7a1c.firebaseapp.com",
//   databaseURL: "https://sa-project-d7a1c-default-rtdb.firebaseio.com",
//   projectId: "sa-project-d7a1c",
//   storageBucket: "sa-project-d7a1c.appspot.com",
//   messagingSenderId: "181071305167",
//   appId: "1:181071305167:web:4ed90139c5ddb5fa445aba",
//   measurementId: "G-Q77ZV6W9X4",
// };

//Boring
const firebaseConfig = {
  apiKey: "AIzaSyDMCf_Re5jo40lNJKd4DGKtPHZxVyPpShU",
  authDomain: "sa-firebase-30573.firebaseapp.com",
  projectId: "sa-firebase-30573",
  storageBucket: "sa-firebase-30573.appspot.com",
  messagingSenderId: "306156875849",
  appId: "1:306156875849:web:d83456b1915b5300690f98",
  measurementId: "G-8EY31RFB5L"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyCrc1-AotWkSo9hf5VwuLEK5Elo9GEoweE",
//   authDomain: "sa-project-2f0fc.firebaseapp.com",
//   projectId: "sa-project-2f0fc",
//   storageBucket: "sa-project-2f0fc.appspot.com",
//   messagingSenderId: "948003317990",
//   appId: "1:948003317990:web:6db26ff7f3e0ffd54d3327",
//   measurementId: "G-FB13Z7XN10"
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
export const moneyCollectionRef = collection(db, "money");
