/* eslint-disable no-unused-vars */
import React, { useState,useEffect } from "react";
import axios from "axios";
import './Exam.css';
import ExamEntry from "./ExamEntry";


function Exam() {
  //for adding new exams
  const [exam, setExam] = useState({
    paperName: "",
    paperCode: null,
    duration:null,
    maxMarks: "",
    passingMarks: null,
    createdAt: null,
    updatedAt:null,
    numOfQues:null,
    standard:''
  });
  const [subjectList,setSubjectList]=useState()
  //state for getting all the exams from server and then further display
  const [examsDetails,setExamsDetails]=useState([]);

  const [showForm, setShowForm] = useState(false);

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

  // To post Exams to the database to the database
     async function postExam(event) {
       event.preventDefault();
       console.log(exam)
        if (
        !exam ||
         exam.paperName.trim() === '' ||
         exam.paperCode.trim() === '' ||
         exam.duration === null ||
         exam.maxMarks === null ||
         exam.passingMarks === null ||
         exam.standard === '' ||
         exam.numOfQues === null
    ) {
      // Handle the case where properties are null or undefined
      console.error('Some properties are null or undefined.');
      alert("All fields are required")
      return}
    
    
    try {
      const response = await axios.post(
        "http://localhost:3001/addExam",
        {
          paperName: exam.paperName,
          paperCode: exam.paperCode,
          duration:exam.duration,
          maxMarks: exam.maxMarks,
          passingMarks: exam.passingMarks,
          numOfQues:exam.numOfQues,
          standard:exam.standard
        }
      );
      if (response.status === 200) {
        console.log("saved successful");
        setShowForm(false);
        setExam({  paperName: "",
        paperCode: null,
        duration:null,
        maxMarks: "",
        passingMarks: null,
        standard:'',
        numOfQues:null});
        getExams();
      }
    } catch (error) {
      if(error.response.status===400){
        alert("enter answer 1-4")
      }
      console.error("unable to save", error);
    }}
    const add = {
      width:"70%",
    };
    const form = {
      borderRadius:"20px",
      padding:"10px"
    }
    const label = {
      width:"90%",
      textAlign:"left",
      paddingLeft:"80px"
      
    };
    const input = {
      width:"35%",
      left:"40%",
      position:"absolute",
    }
  return (
    
    <center>
      <hr></hr>
    <div style={add}>
         <h2>List Of Exams</h2>
      <button className="list-item" onClick={() => setShowForm(true)} style={{borderRadius:"15px"}}>Add new Exam</button>
      {showForm ? (<div>
      <h1>Please Enter the Details</h1>
      <form style={form}>
        <label style={label}>
          Paper Code:
          <input
            style={input}
            className="input"
            name="paperCode"
            type="text"
            placeholder="Enter Paper Code"
            value={exam.paperCode}
            onChange={handleChange}
          />
        </label>
        <br /><br />
        <label style={label}>
          Paper name:
          <select className="input" id="paperName" name="paperName" style={input} value={exam.paperName} onChange={handleChange}>
           <option value="" disabled>Select</option> 
              {subjectList && subjectList.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
                ))}
               </select><br /><br />
        </label>
        <br />
        <label style={label}>
          Maximum Marks:
          <input
          style={input}
          className="input"
            name="maxMarks"
            type="text"
            placeholder="Enter Maximum Marks"
            value={exam.maxMarks}
            onChange={handleChange}
          />
        </label>
        <br /><br />
        <label style={label}>
          Pass Marks:
          <input
            style={input}
            className="input"
            name="passingMarks"
            type="text"
            placeholder="Enter Passing Score Marks"
            value={exam.passingMarks}
            onChange={handleChange}
          />
        </label>
        <br /><br />
        <label style={label}>
          Total number Questions:
          <input
            style={input}
            className="input"
            name="numOfQues"
            type="text"
            placeholder="Enter number of questions"
            value={exam.numOfQues}
            onChange={handleChange}
          />
        </label>
        <br /><br />
        <label htmlFor="standard" style={label}>Standard:
            <select className="input" id="standard" style={input} name="standard" value={exam.standard} onChange={handleChange}>
            <option value="" disabled>Select</option>
                <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="PGDCA">PGDCA</option>
                </select>
                </label><br/><br />
        <label style={label}>
          Duration(in minutes):
          <input
          style={input}
          className="input"
            name="duration"
            type="text"
            placeholder="Enter Duration in minutes"
            value={exam.duration}
            onChange={handleChange}
          />
        </label>
        <br/><br />
        <button onClick={postExam} className="button" >Add</button>
        <button
              type="reset"
              onClick={() => setExam({})}
              className="button"
            >
              Reset
            </button>
        <button onClick={()=>{setShowForm(false)}} className="button">Cancel</button>    
      </form></div>):null}

      <div>
        {examsDetails.length > 0 ? (
            <div className="subjects">      
              {examsDetails.map((exam)=>{
                return( 
                <ExamEntry
                 key={exam._id}
                  exam={exam}
                  updateDisplay={getExams}
                />
              )
              })}
            </div>
        ) : (
          <div className="spinner">
            <h2>no Exams</h2>
          </div>
        )}
      </div>
    </div>
    </center>
  )
}

export default Exam;
