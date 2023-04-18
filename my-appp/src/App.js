import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase-config";
import { useState } from "react";
import Login from "./pages/Auth/Login";
import Logout from "./pages/Auth/Logout";
import Create from "./pages/Note/Create";
import Edit from "./pages/Note/Edit";
import Note from "./pages/Note/Note";
import Test from "./pages/Note/test";
import View from "./pages/Note/View";
import Calendars from "./pages/Calendar/Calendar";
import "bootstrap/dist/css/bootstrap.min.css";
import Charge from './Charge/Charge';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  


  return (
    <Router>
      {isAuth && (
        <>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-item nav-link active" href="/">
                  文件
                </a>

                <a class="nav-item nav-link" href="calendar">
                  日曆
                </a>
                
                <a class="nav-item nav-link" href="charge">
                  記帳
                </a>
                <a class="nav-item nav-link" href="#">
                  <Logout setIsAuth={setIsAuth} />
                </a>
                
                <img src={localStorage.getItem("url")} class="avatar"></img>
                <a class="nav-item nav-link">{localStorage.getItem("name")}</a>
                
                
              </div>
            </div>
          </nav>
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
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/" element={<Note isAuth={isAuth} />} />
        <Route path="/create" element={<Create isAuth={isAuth} />} />
        <Route path="/edit/:id" element={<Edit isAuth={isAuth} />} />
        <Route path="/view/:id" element={<View isAuth={isAuth} />} />
        {/* <Route path="/test" element={<Test />} /> */}
        <Route path="/calendar" element={<Calendars isAuth={isAuth} />} />
        
        <Route path="/charge" element={<Charge />} />
      </Routes>
    </Router>
  );
}

export default App;
