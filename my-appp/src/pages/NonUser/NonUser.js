import nonUser from "./img/nonUser.svg";
import Logout from "../Auth/Logout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function NonUser({ setIsAuth, isAuth, level }) {
  let navigate = useNavigate();
  const levelList = ["admin", "money", "user"];

  useEffect(() => {
    console.log("non", level);
    if (!isAuth) {
      navigate("/login");
    } else if (levelList.includes(level)) {
      navigate("/");
    }
  }, [level]);

  return (
    <center>
      <img src={nonUser} style={{ width: "400px" }}></img>
      <div style={{ marginTop: "25px" }}>您的申請還在審核中</div>

      <div
        className=" btn btn-primary"
        style={{ cursor: "pointer", marginTop: "20px" }}
      >
        <Logout setIsAuth={setIsAuth} />
      </div>
    </center>
  );
}

export default NonUser;
