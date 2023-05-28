import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useRef } from "react";
import Login from "./pages/Auth/Login";
import Create from "./pages/Note/Create";
import Edit from "./pages/Note/Edit";
import Note from "./pages/Note/Note";
import View from "./pages/Note/View";
import Calendars from "./pages/Calendar/Calendar";
import Charge from "./Charge/Charge";
import Admin from "./pages/admin/Admin";
import NavBar from "./NavBar";
import NonUser from "./pages/NonUser/NonUser";
import Project from "./ProjectManagement/Project";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [level, setLevel] = useState(localStorage.getItem("level"));
  const [url, setUrl] = useState(localStorage.getItem("url"));
  const [notePage, setNotePage] = useState(localStorage.getItem("noteWay"));

  const [tagList, setTagList] = useState([]);

  return (
    <Router>
      <NavBar
        setIsAuth={setIsAuth}
        level={level}
        isAuth={isAuth}
        setLevel={setLevel}
        url={url}
      />
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              setIsAuth={setIsAuth}
              setLevel={setLevel}
              setUrl={setUrl}
              setNotePage={setNotePage}
            />
          }
        />
        <Route
          path="/"
          element={
            <Note notePage={notePage} setNotePage={setNotePage} level={level} />
          }
        />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route
          path="/view/:id"
          element={<View notePage={notePage} level={level} />}
        />
        <Route path="/calendar" element={<Calendars isAuth={isAuth} />} />
        <Route path="/charge" element={<Charge />} />
        <Route path="/ProjectManagement" element={<Project />} />
        <Route path="/admin" element={<Admin setLevel={setLevel} />} />
        <Route
          path="/nonUser"
          element={
            <NonUser setIsAuth={setIsAuth} level={level} isAuth={isAuth} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
