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

const firebaseConfig = {
  apiKey: "AIzaSyAEd6TVkA2r3yg8NHmsh2A5ld2SJlq7iJA",
  authDomain: "sa-project-d7a1c.firebaseapp.com",
  databaseURL: "https://sa-project-d7a1c-default-rtdb.firebaseio.com",
  projectId: "sa-project-d7a1c",
  storageBucket: "sa-project-d7a1c.appspot.com",
  messagingSenderId: "181071305167",
  appId: "1:181071305167:web:4ed90139c5ddb5fa445aba",
  measurementId: "G-Q77ZV6W9X4"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyA9R1YugPwcxETx_lU2jhD92_Ogc_OsgXk",
//   authDomain: "sa-css.firebaseapp.com",
//   projectId: "sa-css",
//   storageBucket: "sa-css.appspot.com",
//   messagingSenderId: "1060226801896",
//   appId: "1:1060226801896:web:5172196924fe242669295d",
//   measurementId: "G-5TD1B1DBP7",
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
