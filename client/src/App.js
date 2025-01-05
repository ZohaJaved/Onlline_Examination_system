//import React, { useContext } from "react";
import Login from "./components/Login/login";
import AdminHome from "./components/AdminHome/AdminHome.jsx"
import TeacherHome from "./components/TeacherHome/TeacherHome.jsx";
import StudentHome from "./components/StudentHome/StudentHome.jsx";
import ExamDetails from "./components/ExamDetails/ExamDetails.jsx"
import EditExamAdmin from "./components/EditExamAdmin/EditExamAdmin.jsx"
import ExamDetailsAdmin from "./components/ExamDetailAdmin/ExamDetaisAdmin.jsx"
import EnterExamAdmin from "./components/EnterExamAdmin/EnterExamAdmin.jsx"
import SubjectEditAdmin from "./components/SubjectEditAdmin/EditForm.jsx"
import QuesDetailsAdmin from "./components/QuestionDetailsAdmin/QuesDetailsAdmin.jsx"
// import Header from "./components/Header";
import ExamStart from "./components/ExamStart/ExamStart.jsx";
import Result from "./components/Result/Result.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
//import NoteContext from "./context/notes/NoteContext"
import NoteState from "./context/notes/NoteState";
import ProtectedRoutes from "./components/ProtectedRoutes.js";
import Navbar from "./components/Navbar/Navbar";
import QuesDetails from "./components/DetailedQuesTeacher/DetailedQuesTeacher.jsx";


function App() {
  console.log("app call hua");
  ///const renderContext=useContext(NoteContext)
  // Check if the user is logged in before rendering the Faculty or TeacherHome component
  //const loggedIn=window.localStorage.getItem("isLoggedIn")
  //console.log(loggedIn);
  return (
    <div style={{ height: "100%" }}>
      {" "}
      <Router>
        {" "}
        <NoteState>
          {" "}
          {/* <Navbar />{" "} */}
          <Routes>
            {" "}
            {/* <Route path="/" element={<Home />} />{" "} */}
            <Route path="/" element={<Login />} />{" "}
            <Route path="/AdminHome" element={<ProtectedRoutes><AdminHome/></ProtectedRoutes>} />{" "}
            <Route path="/TeacherHome" element={<ProtectedRoutes><TeacherHome /></ProtectedRoutes>} />{" "}
            <Route path="/StudentHome" element={<ProtectedRoutes><StudentHome /></ProtectedRoutes>} />{" "}
            <Route path="/exam/:subject" element={<ProtectedRoutes><ExamDetails /></ProtectedRoutes>} />
            <Route path="/examDetails/:id" element={<ProtectedRoutes><ExamDetailsAdmin /></ProtectedRoutes>} />
            <Route path="/exams/edit/:id" element={<ProtectedRoutes><EditExamAdmin /></ProtectedRoutes>} />{" "}
            <Route path="/exams/addExam" element={<ProtectedRoutes><EnterExamAdmin /></ProtectedRoutes>} />{" "}
            <Route path="/subjectAdmin/edit/:id" element={<ProtectedRoutes><SubjectEditAdmin /></ProtectedRoutes>} />{" "}
            <Route path="/quesDetails/:id" element={<ProtectedRoutes><QuesDetailsAdmin /></ProtectedRoutes>} />{" "}
            <Route path="/ExamStart" element={<ProtectedRoutes><ExamStart /></ProtectedRoutes>} />{" "}
            <Route path="/Result" element={<ProtectedRoutes><Result /></ProtectedRoutes>} />{" "}
          </Routes>{" "}
        </NoteState>{" "}
      </Router>{" "}
    </div>
  );
}
export default App;

