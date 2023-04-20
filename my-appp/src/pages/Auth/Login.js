import { auth, googleProvider,usersCollectionRef} from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { addDoc } from "firebase/firestore";


function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const userAdd = async () => {
    await addDoc(usersCollectionRef, {
      email: auth?.currentUser?.email,
      level: "",
      status: "unCheck",
      url: auth?.currentUser?.photoURL,
      name: auth?.currentUser?.displayName,
    });
  };
  
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        localStorage.setItem("isAuth", true);
        localStorage.setItem("url", auth?.currentUser?.photoURL);
        localStorage.setItem("name", auth?.currentUser?.displayName);
        
        setIsAuth(true);
        userAdd()
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
        width:"100vw"
      }}
    >
      <GoogleButton onClick={signInWithGoogle} />
    </div>
    </div>
  );
}

export default Login;
