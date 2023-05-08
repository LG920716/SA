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
      <NavBar
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setLevel={setLevel}
        level={level}
        authId={authId}
      />
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
