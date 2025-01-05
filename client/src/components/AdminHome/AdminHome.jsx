import React, { useContext } from "react";
import Questions from "../questions";
import Subject from "../SubjectAdmin/SubjectAdmin";
import NoteContext from "../../context/notes/NoteContext";
import Loading from "../loading";
import Navbar from "../Navbar/Navbar";
import "./AdminHome.css"
import Home from "../LoginType";
import Exam from "../ExamAdmin/Exam"
import { AbortedDeferredError, useNavigate } from 'react-router-dom';
function AdminHome() {
  const loginContext = useContext(NoteContext);
  const [activeTab, setActive] = React.useState();
  const navigate = useNavigate();
  const loginOrNot = loginContext.user.login;
  //"window.localStorage.setItem("isLoggedIn",false);" in logout

  const btn = {
    margin: "5px",
    borderRadius: "10px",
  };
  const inside = {
    marginTop: "50px",
  };
  const outside = {
    padding: "20px",
    background: "linear-gradient(160deg,#f5fefd,#fffada)",
    height: "1000vh",
    backgroundCover: "cover",
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "exam":
        return <Exam />;
      case "subject":
        return <Subject />;
      case "questions":
        return <Questions />;
      case "teacher":
        return <Loading />;
      default:
        return null;
    }
  };

  return (
    <div className="AdminHome" style={{height:'100vh'}}>
      {" "}
      <Navbar showLogout={true} /> <h2>Main Menu</h2>{" "}
      <div className="admin-navbar-container">
        {" "}
        <button
          onClick={() => setActive("exam")}
          className={activeTab === "exam" ? "selected" : ""}
        >
          Exam
        </button>{" "}
        <button
          onClick={() => setActive("subject")}
          className={activeTab === "subject" ? "selected" : ""}
        >
          Subject
        </button>{" "}
        <button
          onClick={() => setActive("questions")}
          className={activeTab === "questions" ? "selected" : ""}
        >
          Questions
        </button>{" "}
        <button
          onClick={() => setActive("teacher")}
          className={activeTab === "teacher" ? "selected" : ""}
        >
          Teacher
        </button>{" "}
      </div>{" "}
       {renderTabContent()} 
    </div>
  );
}
export default AdminHome;