//import React, { useContext } from "react";
import Login from "./components/login";
import AdminHome from "./components/AdminHome"
import TeacherHome from "./components/TeacherHome";
import StudentHome from "./components/StudentHome";
import Home from "./components/home"
import Header from "./components/Header";
import ExamStart from "./components/ExamStart";
import Result from "./Result";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import NoteContext from "./context/notes/NoteContext"
import NoteState from "./context/notes/NoteState";

function App() {
  console.log("app call hua");
  ///const renderContext=useContext(NoteContext)
   // Check if the user is logged in before rendering the Faculty or TeacherHome component
   //const loggedIn=window.localStorage.getItem("isLoggedIn")
   //console.log(loggedIn);
  return (
    <div>
      <NoteState>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/AdminHome" element={<AdminHome/> }/>
          <Route path="/TeacherHome" element={<TeacherHome/>} />
          <Route path="/StudentHome" element={<StudentHome/>} />
          <Route path="/ExamStart" element={<ExamStart/>} />
          <Route path="/Result" element={<Result/>} />
        </Routes>
      </Router>
      </NoteState>
    </div>
  );
}

export default App;

