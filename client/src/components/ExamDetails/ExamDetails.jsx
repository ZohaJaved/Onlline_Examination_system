import React, { useState, useCallback, useEffect,useContext } from "react";
import { useParams,useNavigate } from "react-router-dom";
import NoteContext from "../../context/notes/NoteContext";
import Instruction from "../Instruction";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import ExamStart from "../ExamStart/ExamStart";
import "./ExamDetails.css"


// let detailsExam = undefined;


function ExamSub({ setExamStart }) {
  const studentContext = useContext(NoteContext);
  const { subject } = useParams(); // Retrieve subject name from URL
  const [examDetails, setExamDetails] = useState(null);
  const [examId,setExamId]=useState();
  const [hasAppeared, setHasAppeared] = useState(false);
  const [userId,setUserId]=useState();
  

  // const userId = studentContext.user.idd;
  // const examId = examDetails.paperCode; 
  const navigate=useNavigate();
 

  console.log("This is the paper name:", subject);

  // Fetch exam details for the subject
  const getExamDetail = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/examDetails/${subject}`
      );
      console.log('response.data',response.data);
      setExamDetails(response.data.examDetails);
      setExamId(response.data.examDetails.paperCode)
    } catch (error) {
      console.error("Error fetching exam details:", error);
      setExamDetails(null);
    }
  }, [subject]);

  useEffect(() => {
    getExamDetail();
    const id=JSON.parse(localStorage.getItem('id'));//userId
    setUserId(id);
  }, [getExamDetail]);

  useEffect(()=>{
   if(userId && examId) checkExamStatus();
  },[userId,examId]);

  // Check if the user has already appeared for the exam
  const checkExamStatus = async () => {
    console.log("checkExamStatus")
    try {
      const response = await axios.get(`http://localhost:3001/checkExamStatus/${userId}/${examId}`);
      setHasAppeared(response.data.hasAppeared);
      console.log("hasAppeared",hasAppeared)
    } catch (error) {
      console.error("Error checking exam status:", error);
    }
  }

  if (hasAppeared) {
    return <div className="exam-container">
      <Navbar/>
      <h1 className="text-black mb-4">You have already completed this exam.</h1>
      <button className="nav-button" onClick={()=>navigate('/StudentHome')}>Attempt other exams</button>
      </div>;
  }

  return (
    <div className="exam-container" >
      <Navbar />
      {examDetails ? (
        <div className="exam-card" >
          <h3 className="exam-title">Exam Details</h3>
          <table className="exam-table" style={{margin:'0',marginBottom:'5px'}}>
            <tbody>
              <tr>
                <th className="exam-label">Subject:</th>
                <td className="exam-value">{examDetails.paperName}</td>
              </tr>
              <tr>
                <th className="exam-label">Paper Code:</th>
                <td className="exam-value">{examDetails.paperCode}</td>
              </tr>
              <tr>
                <th className="exam-label">Duration:</th>
                <td className="exam-value">{parseInt(examDetails.duration, 10)} minutes</td>
              </tr>
              <tr>
                <th className="exam-label">Maximum Marks:</th>
                <td className="exam-value">{examDetails.maxMarks}</td>
              </tr>
              <tr>
                <th className="exam-label">Passing Marks:</th>
                <td className="exam-value">{examDetails.passingMarks}</td>
              </tr>
              <tr>
                <th className="exam-label">No. of Questions:</th>
                <td className="exam-value">{examDetails.numOfQues}</td>
              </tr>
            </tbody>
          </table>
          <p className="exam-note ">
            Note: Please read all instructions carefully before starting the exam.
          </p>
          <Instruction numOfQues={examDetails.numOfQues}  />
          <button className="exam-button  bg-black" onClick={() => navigate('/ExamStart',{state:{examDetails}})}>
            Start Exam
          </button>
        </div>
      ) : (
        <p className="no-exam-message">No exam is scheduled yet...</p>
      )}
    </div>
  );  
}
export default ExamSub;
// export { detailsExam };
