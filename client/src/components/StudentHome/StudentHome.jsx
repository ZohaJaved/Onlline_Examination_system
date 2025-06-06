import React, { useState, useContext, useCallback, useEffect } from "react";
import Subjects from "../SubjectsStudent/SubjectsStudent.jsx";
import NoteContext from "../../context/notes/NoteContext";
import ExamStart from "../ExamStart/ExamStart";
import axios from "axios";
import Loading from "../loading";
import Navbar from "../Navbar/Navbar";
import "./StudentHome.css"
import Performance from "../Performance/Performance.jsx"

function StudentHome() {
  const studentContext = useContext(NoteContext);
  const [studentDetail, setStudentDetail] = useState(null);
  const [activeTab, setActive] = React.useState();
  const [examStart, setExamStart] = useState(false);
  const id=JSON.parse(localStorage.getItem('id'));
    

  // //fetching student Informations
  // const getStudentDetail = useCallback(async (id) => {
  //   const response = await axios.get(
  //     `http://localhost:3001/studentDetails/${id}`
  //   );
  //   console.log("response.data",response.data.user);
  //   setStudentDetail(response.data);
  // }, []);

  useEffect(() => {
    const response=JSON.parse(localStorage.getItem("user"));
    // getStudentDetail(id);
    setStudentDetail(response);
    studentContext.setUserDetail(response);
    console.log("user",studentDetail)
  }, []);

  //render ExamStart when user click on start exam
  if (examStart) {
    console.log("standard in StudentHome", studentDetail.standard);
    return <ExamStart standard={studentDetail.class} />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "subjects":
        return (
          <Subjects
            class={studentDetail.class}
            id={studentDetail.id}
            setExamStart={setExamStart}
          />
        );
      case "performance":
        return <Performance />; //<Performance/>
      default:
        return null;
    }
  };

  return (
    <div className="studentHome-container" style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
    <Navbar showLogout={true} style={{ height: "100px" }} />
    <div className="studentHome-content" style={{ flex: 1 }}>
        {" "}
        <center style={{width:'100%', height:'100%'}}>
          {" "}
          <div style={{display:'flex', flexDirection:'column'}}>
          <h1 style={{height:'120px' , display:'flex' ,justifyContent:'center' , alignItems:'center'}}>
            {" "}
            {studentDetail && <h1 className="text-black" style={{width:'100%' ,fontSize:'xxx-large'}} >Welcome {studentDetail.userName}</h1>}{" "}
          </h1>{" "}
          <div className="buttons-container" style={{flex:'1'}}>
            {" "}
            <button
              onClick={() => setActive("subjects")}
              className={`tab-button ${
                activeTab === "subjects" ? "selected" : ""
              }`}
            >
              {" "}
              Subjects and Courses{" "}
            </button>{" "}
            <button
              onClick={() => setActive("performance")}
              className={`tab-button ${
                activeTab === "performance" ? "selected" : ""
              }`}
            >
              {" "}
              Performance And Grading{" "}
            </button>{" "}
          </div>{" "}
          <div className="tab-content" style={{height:'500px'}}> {renderTabContent()} </div>{" "}
          </div>
        </center>{" "}
      </div>{" "}
    </div>
  );
}
export default StudentHome;
