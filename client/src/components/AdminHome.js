import React, { useContext } from "react";
import Questions from "./questions";
import Subject from "./subjects";
import NoteContext from "../context/notes/NoteContext";

import Home from "./home";
import Exam from "./Exam"
import { AbortedDeferredError, useNavigate } from 'react-router-dom';
function AdminHome() {
  const loginContext=useContext(NoteContext)
  const [activeTab,setActive]=React.useState();
  const navigate=useNavigate();
 const loginOrNot=loginContext.user.login;
  //"window.localStorage.setItem("isLoggedIn",false);" in logout

  const btn = {
    margin:"5px",
    borderRadius:"10px"
  };
  const inside = {
    marginTop:"50px"
  };
  const outside = {
    padding:"20px",
    background:"linear-gradient(160deg,#f5fefd,#fffada)",
    height:"1000vh",
    backgroundCover:"cover"
  };
  const renderTabContent = () => {
    switch (activeTab) {
     case "exam":
        return <Exam/>
      case "subject":
        return <Subject/>
        case "questions":
          return <Questions />;
      default:
        return null;
    }}
  
  return(<div className="AdminHome" style={outside}>
    
    <h2>Main Menu</h2>
    <center>
    <div style={inside}>
      <button onClick={()=>setActive("exam")} style={btn} className={activeTab === "exam" ? "selected" : ""}>Exam
      </button>
      <button onClick={()=>setActive("subject")} style={btn} className={activeTab === "subject" ? "selected" : ""}>Subject
      </button>
      <button onClick={()=>setActive("questions")} style={btn} className={activeTab === "questions" ? "selected" : ""}>Questions
      </button>
      <button onClick={()=>setActive("teacher")} style={btn} className={activeTab === "teacher" ? "selected" : ""}>Teacher
      </button>
      <button onClick={()=>{ setActive("logOut"); {navigate("/");}}} style={btn} className={activeTab === "logOut" ? "selected" : ""}>log Out
      </button>
    </div>
    </center>
  <div>
   
    
    {renderTabContent()}
  </div>

</div>)}
export default AdminHome;