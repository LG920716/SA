import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Auth/Login";
import Create from "./pages/Note/Create";
import Edit from "./pages/Note/Edit";
import Note from "./pages/Note/Note";
import View from "./pages/Note/View";
import Calendars from "./pages/Calendar/Calendar";
import Charge from "./Charge/Charge";
import { NavLink } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Tag from "./pages/Note/Components/Tag/Tag";
import NavBar from "./NavBar";
import NonUser from "./pages/NonUser/NonUser";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [level, setLevel] = useState(localStorage.getItem("level"));
  const [authId, setauthId] = useState(localStorage.getItem("id"));

  const [tagList, setTagList] = useState([
    { tagName: "abc", color: "#0052cc" },
    { tagName: "HHH", color: "#8ed1fc" },
  ]);

  return (
    <Router>
      {isAuth && (
        <>
          <div className="navbarhead">
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

                  <NavLink className={"nav-link"} to="../calendar">
                    日曆
                  </NavLink>

                  <NavLink className={"nav-link"} to="../charge">
                    記帳
                  </NavLink>
                  <NavLink className={"nav-link"} to="../admin">
                    權限
                  </NavLink>
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
        </>
      )}
      {/* <nav>
        {isAuth && (
          <>
            <Logout setIsAuth={setIsAuth} />
            <Link to={"/note"}>文件</Link>
          </>
        )}
      </nav> */}
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              setIsAuth={setIsAuth}
              setLevel={setLevel}
              setauthId={setauthId}
            />
          }
        />
        <Route path="/" element={<Note level={level} />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/calendar" element={<Calendars isAuth={isAuth} />} />
        <Route path="/charge" element={<Charge />} />
        <Route path="/ProjectManagement" element={<Project />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/nonUser"
          element={
            <NonUser setIsAuth={setIsAuth} level={level} isAuth={isAuth} />
          }
        />
        <Route
          path="/tag"
          element={
            <Tag tagList={tagList} setTagList={setTagList} tagFrom={"edit"} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
