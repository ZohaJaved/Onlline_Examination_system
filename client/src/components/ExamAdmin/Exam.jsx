/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ExamForm from "../EnterExamAdmin/EnterExamAdmin.jsx"
// import "./Exam.css";
import "../SubjectAdmin/SubjectAdmin.css"

function Exam() {
  //for adding new exams
  const [exam, setExam] = useState({
    paperName: "",
    paperCode: null,
    duration: null,
    maxMarks: "",
    passingMarks: null,
    createdAt: null,
    updatedAt: null,
    numOfQues: null,
    standard: "",
  });
  const [subjectList, setSubjectList] = useState();
  //state for getting all the exams from server and then further display
  const [examsDetails, setExamsDetails] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  // Define the getExam() function to get info of exams
  async function getExams() {
    const response = await axios.get("http://localhost:3001/exams");
    console.log(response.data);
    setExamsDetails(response.data);
  }
  // Get the list of exams when the component mounts
  useEffect(() => {
    getExams();
  }, []);

  //get the list of subjects
  async function getSubjects() {
    const response = await axios.get("http://localhost:3001/subjectsList");
    console.log(response.data);
    setSubjectList(response.data);
  }
  // Get the list of subjects when the component mounts
  useEffect(() => {
    getSubjects();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setExam((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  // To post Exams to the database
  async function postExam(event) {
    event.preventDefault();
    console.log(exam);
    if (
      !exam ||
      exam.paperName.trim() === "" ||
      exam.paperCode.trim() === "" ||
      exam.duration === null ||
      exam.maxMarks === null ||
      exam.passingMarks === null ||
      exam.standard === "" ||
      exam.numOfQues === null
    ) {
      // Handle the case where properties are null or undefined
      console.error("Some properties are null or undefined.");
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/addExam", {
        paperName: exam.paperName,
        paperCode: exam.paperCode,
        duration: exam.duration,
        maxMarks: exam.maxMarks,
        passingMarks: exam.passingMarks,
        numOfQues: exam.numOfQues,
        standard: exam.standard,
      });
      if (response.status === 200) {
        console.log("saved successful");
        setShowForm(false);
        setExam({
          paperName: "",
          paperCode: null,
          duration: null,
          maxMarks: "",
          passingMarks: null,
          standard: "",
          numOfQues: null,
        });
        getExams();
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("enter answer 1-4");
      }
      console.error("unable to save", error);
    }
  }
  const add = {
    width: "70%",
  };
  const form = {
    borderRadius: "20px",
    padding: "10px",
  };
  const label = {
    width: "90%",
    textAlign: "left",
    paddingLeft: "80px",
  };
  const input = {
    width: "35%",
    left: "40%",
    position: "absolute",
  };
  return (
    <div className="main-container" style={{padding:'0'}}>
      <br />
      <div className="subject-container" style={{display:'flex', flexDirection:'column' ,justifyContent:'center' ,alignItems:'center'}}>
      <h2 className="title" style={{fontSize:'2rem'}}>List of Exams</h2>
        {showForm ?(
        <ExamForm
          exam={exam}
          handleChange={handleChange}
          postExam={postExam}
          setExam={setExam}
          setShowForm={setShowForm}
          subjectList={subjectList}
        />):(<button className="add-subject-button" onClick={()=>setShowForm(true)}>Schedule a new Exam</button>)}
        <div className="subjects-list-admin" style={{display:'flex' ,flexDirection:'column' ,justifyContent:'center' ,alignItems:'center'}}>
          {examsDetails.length > 0 ? (
            <div className="subjects-list-admin" >
              <table className="subjects-table">
                <thead>
                  <tr>
                    <th>Paper Name</th>
                    <th>Paper Code</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {examsDetails.map((exam) => (
                    <tr key={exam._id}>
                      <td>{exam.paperName}</td>
                      <td>{exam.paperCode}</td>
                      <td>
                        <button
                          className="modify-button"
                          onClick={() => navigate(`/examDetails/${exam._id}`)}
                          style={{ width: '60px', height: 'auto' }}
                        >
                          See Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-subjects-container">
              <h2>No Exam is Scheduled</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );  
}

export default Exam;
