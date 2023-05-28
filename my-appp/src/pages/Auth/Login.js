import { auth, googleProvider, db } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import {
  setDoc,
  doc,
  getDoc,
  serverTimestamp,
  getDocs,
  collection,
} from "firebase/firestore";

function Login({ setIsAuth, setLevel, setUrl, setNotePage }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const usersCollectionRef = doc(db, "users", auth?.currentUser?.uid);
        localStorage.setItem("isAuth", true);
        localStorage.setItem("url", auth?.currentUser?.photoURL);
        setUrl(auth?.currentUser?.photoURL);
        localStorage.setItem("noteWay", "notes");
        setIsAuth(true);
        setNotePage("notes");

        const userAdd = async (level) => {
          try {
            await setDoc(usersCollectionRef, {
              email: auth?.currentUser?.email,
              level: level,
              url: auth?.currentUser?.photoURL,
              name: auth?.currentUser?.displayName,
              createAt: serverTimestamp(),
            });
            localStorage.setItem("level", level);

            setLevel(level);
          } catch (err) {
            console.error(err);
          }
        };
        const checkHasAccount = async () => {
          const account = await getDoc(usersCollectionRef);

          if (!account.exists()) {
            const data = await getDocs(collection(db, "users"));
            if (data.docs.length === 0) {
              userAdd("admin");
              navigate("/");
            } else {
              userAdd("unCheck");
              navigate("/nonUser");
            }
          } else {
            localStorage.setItem("level", account.data().level);

            setLevel(account.data().level);
            navigate("/");
          }
        };
        checkHasAccount();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div style={{ marginTop: "-7%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <GoogleButton onClick={signInWithGoogle} />
      </div>
    </div>
  );
}

export default Login;
