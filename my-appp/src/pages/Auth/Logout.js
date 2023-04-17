import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";

function Logout({ setIsAuth }) {
  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(false);
        window.location.pathname = "/login";
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return <div onClick={signUserOut}>登出</div>;
}

export default Logout;
