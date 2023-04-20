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
import {NavLink} from 'react-router-dom';
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  


  return (
    <Router>
      {isAuth && (
        <>
        <div className="navbarhead">
          <nav class="navbar navbar-expand-lg navbar-light" 
          style={{width:"92%", margin:"auto"}}>
           <div className="collapse navbar-collapse " id="navbarNavAltMarkup" 
           style=
           {{justifyContent:"space-between",paddingRight:""}}>
            
             <div className="navbar-nav" >
               <NavLink className={"nav-link"} to="/">
                 文件
               </NavLink>


               <NavLink className={"nav-link"}to="../calendar">
                 日曆
               </NavLink>
              
               <NavLink className={"nav-link"}to="../charge">
                 記帳
               </NavLink>
               
               
             </div>
             
             
           </div>
           <div className="icon" >
               <img src={localStorage.getItem("url")} class="avatar"></img>
               <p class="nav-item nav-link2">{localStorage.getItem("name")}</p>
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
