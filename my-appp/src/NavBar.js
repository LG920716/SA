import Logout from "./pages/Auth/Logout";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, auth } from "./firebase-config";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

  return (
    isAuth &&
    levelList.includes(level) && (
      <div className="navbarhead" onClick={getLevel}>
        <Navbar expand="sm" variant="light" className="navbarhead">
          <Navbar.Toggle
            aria-controls="navbarNavAltMarkup"
            style={{ border: "0" }}
          />
          <Navbar.Collapse id="navbarNavAltMarkup">
            <div>
              <Nav className="navbar-nav">
                <NavLink className="nav-link" exact to="/">
                  文件
                </NavLink>
                <NavLink className="nav-link" to="/calendar">
                  行事曆
                </NavLink>
                <NavLink className="nav-link" to="/charge">
                  記帳
                </NavLink>
                <NavLink className="nav-link" to="/ProjectManagement">
                  活動管理
                </NavLink>
                {level === "admin" && (
                  <NavLink className="nav-link" to="/admin">
                    權限管理
                  </NavLink>
                )}
                {/* <NavDropdown title="更多" id="navbarDropdown">
                <NavLink className="dropdown-item" to="/tag">
                  標籤
                </NavLink>
              </NavDropdown> */}
              </Nav>
            </div>
            <div className="icon">
              <img
                src={localStorage.getItem("url")}
                className="avatar"
                alt="User Avatar"
              />
              <div className="logout">
                <a className="nav-item nav-logout" href="#">
                  <Logout setIsAuth={setIsAuth} />
                </a>
              </div>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  );
}

export default NavBar;
