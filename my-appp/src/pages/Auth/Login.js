import { auth, googleProvider, db } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { setDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        localStorage.setItem("url", auth?.currentUser?.photoURL);
        localStorage.setItem("name", auth?.currentUser?.displayName);
        const usersCollectionRef = doc(db, "users", auth?.currentUser?.uid);
        setIsAuth(true);

        const userAdd = async () => {
          await setDoc(usersCollectionRef, {
            email: auth?.currentUser?.email,
            level: "",
            status: "unCheck",
            url: auth?.currentUser?.photoURL,
            name: auth?.currentUser?.displayName,
            createAt: serverTimestamp(),
          });
        };
        const checkHasAccount = async () => {
          const account = await getDoc(usersCollectionRef);
          if (!account.exists()) {
            userAdd();
          }
        };
        checkHasAccount();
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="shadow-xl mt-32">
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
