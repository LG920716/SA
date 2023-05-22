import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import { ForkRight } from "@mui/icons-material";

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

  return (
    <div onClick={signUserOut} style={{}}>
      <LogoutIcon
        style={{ marginBottom: "1px", marginRight: "6px", fontWeight: "500" }}
      />
      登出
    </div>
  );
}

export default Logout;
