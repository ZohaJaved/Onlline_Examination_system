import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./ExamDetailsAdmin.css";

function ExamDetails() {
  const { id } = useParams(); // Get exam ID from URL
  const navigate = useNavigate(); // To navigate back to the previous page or exam list
  const [exam, setExam] = useState(null);
  
  console.log("id",id);

  useEffect(() => {
    async function fetchExamDetails() {
      try {
        const response = await axios.get(`http://localhost:3001/getExamDetails/${id}`);
        setExam(response.data);
      } catch (error) {
        console.error("Failed to fetch exam details", error);
      }
    }
    fetchExamDetails();
  }, [id]);

  // Function to delete the exam
  async function deleteExam() {
    const shouldDelete = window.confirm("Are you sure you want to delete this exam?");
    if (!shouldDelete) {
      return;
    }
    try {
      await axios.post("http://localhost:3001/delExam", { id });
      alert("Exam deleted successfully");
      navigate("/AdmiHome"); // Navigate back to the exam list page
    } catch (error) {
      console.error("Error deleting the exam", error);
    }
  }



  if (!exam) return <div>Loading...</div>;

  return (
    <div className="exam-details-container">
      <h2>Exam Details</h2>
      <table className="exam-table">
        <tbody>
          <tr><td>Paper Name:</td><td>{exam.paperName}</td></tr>
          <tr><td>Paper Code:</td><td>{exam.paperCode}</td></tr>
          <tr><td>Duration of Exam (in Min):</td><td>{exam.duration}</td></tr>
          <tr><td>Maximum Marks:</td><td>{exam.maxMarks}</td></tr>
          <tr><td>Passing Marks:</td><td>{exam.passingMarks}</td></tr>
          <tr><td>Total Number of Questions:</td><td>{exam.numOfQues}</td></tr>
          <tr><td>Standard:</td><td>{exam.standard}</td></tr>
        </tbody>
      </table>
      <div className="action-buttons">
        <button onClick={()=>navigate(`/exams/edit/${id}`)} className="action-button modify-button">Modify</button>
        <button onClick={() => navigate("/AdminHome")} className="action-button close-button">Close</button>
        <button onClick={deleteExam} className="action-button delete-button">Delete</button>
      </div>
    </div>
  );
}

export default ExamDetails;
