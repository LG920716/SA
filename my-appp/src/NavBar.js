import Logout from "./pages/Auth/Logout";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, auth } from "./firebase-config";
import MenuIcon from "@mui/icons-material/Menu";

import {
  doc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

function NavBar({ isAuth, setIsAuth, level, setLevel, authId }) {
  let navigate = useNavigate();

  const levelList = ["admin", "money", "user"];

  const signUserOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setIsAuth(false);
        window.location.pathname = "/login";
        console.log("offfff");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getLevel = async () => {
    const data = await getDoc(doc(db, "users", authId));
    !data.data() ? signUserOut() : setLevel(data.data().level);
    console.log("runnnnnn");
  };

  // useEffect(() => {
  //   console.log("on");
  //   if (!isAuth) {
  //     navigate("/login");
  //   } else if (!authId) {
  //     console.log(authId);
  //     return;
  //   } else {
  //     console.log("oning");
  //     const levelRef = doc(db, "users", authId);
  //     const unSub = onSnapshot(levelRef, (snapShot) => {
  //       if (!snapShot.data()) {
  //         signUserOut();
  //       } else {
  //         console.log(snapShot.data());
  //         setLevel(snapShot.data().level);
  //         localStorage.setItem("level", level);
  //         snapShot.data().level === "unCheck"
  //           ? navigate("/nonUser")
  //           : navigate("/");
  //       }
  //     });

  //     return () => {
  //       console.log("off");
  //       unSub();
  //     };
  //   }
  // }, []);
  const time = 1000 * 60 * 10;
  console.log(level);
  useEffect(() => {
    console.log("start");
    // const timeoutID = setInterval(() => getLevel(), time);
    if (!isAuth) {
      navigate("/login");
      // clearInterval(timeoutID);
      console.log("end");
    } else if (!level) {
      signUserOut();
    } else if (!levelList.includes(level)) {
      navigate("/nonUser");
    }
  }, [level]);

  // setLevel("user");
  // export const timeoutID = setInterval(() => console.log("hiiiii"), 3000);
  // clearInterval(timeoutID);

  return (
    isAuth &&
    levelList.includes(level) && (
      <div className="navbarhead" onClick={getLevel}>
        <nav
          class="navbar navbar-expand-lg navbar-light"
          style={{ width: "92%", margin: "auto", height: "4rem" }}
        >
          <div
            className="collapse navbar-collapse "
            id="navbarNavAltMarkup"
            style={{
              justifyContent: "space-between",
              paddingRight: "1.25rem",
            }}
          >
            <div className="navbar-nav">
              <NavLink className={"nav-link"} to="/">
                文件
              </NavLink>

              <NavLink className={"nav-link"} to="calendar">
                行事曆
              </NavLink>

              <NavLink className={"nav-link"} to="charge">
                記帳
              </NavLink>
              <NavLink className={"nav-link"} to="ProjectManagement">
                活動管理
              </NavLink>
              <NavLink className={"nav-link"} to="admin">
                權限管理
              </NavLink>
              {/* <NavLink className={"nav-link"} to="tag">
                標籤
              </NavLink> */}
              <button>
                <MenuIcon />
              </button>
            </div>
          </div>
          <div className="icon">
            <img src={localStorage.getItem("url")} class="avatar"></img>
            {/*<p class="nav-item nav-link2">{localStorage.getItem("name")}</p>*/}
            <div className="logout">
              <a class="nav-item nav-logout" href="#">
                <Logout setIsAuth={setIsAuth} />
              </a>
            </div>
          </div>
        </nav>
      </div>
    )
  );
}

export default NavBar;
