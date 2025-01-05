import React, { useState, useEffect } from "react";
import axios from "axios";
import SubjectEntry from "../subjectEntry";
import {useNavigate} from 'react-router-dom';
import "./SubjectAdmin.css"

function Subjects() {
  const [sub, setSub] = useState({
    subjectName: "",
    subjectType: "",
    standard:"",
    subjectCode: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSubject,setEditingSubject] = useState(null);
  
  const navigate=useNavigate();

  // Define the getSubjects() function outside of the useEffect() hook
  async function getSubjects() {
    const response = await axios.get("http://localhost:3001/subjects");
    console.log(response.data);
    setSubjects(response.data);
  }

  // Get the list of subjects when the component mounts
  useEffect(() => {
    getSubjects();
  }, []);

  async function deleteSubject(id){
    //confirm before deleting
    const shouldDelete = window.confirm("Are you sure you want to delete this question?");
      
        if (!shouldDelete) {
          return;
        }
    
    try{
      const response=await axios.post("http://localhost:3001/delSubject",{id:id})
      if (response.status===200){
        console.log("subject deletec from db")
  
        // props.updateDisplay();
      }
     }
     catch(error){
     console.error("error during deletion",error)
     }
    }



  function handleChange(event) {
    const { name, value } = event.target;
    setSub((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  // Going to post subject to the database
  async function postSubject(event) {
    event.preventDefault();
    console.log("sub value is",sub)
    if (sub) {
      if (sub.subjectName.trim() === '' || sub.subjectCode.trim() === ''||sub.standard.trim() === '') {
        alert("All fields are required fields");
      }
    } else {
      console.error("sub is undefined");
    }
    
    try {
      const response = await axios.post(
        "http://localhost:3001/addSubject",
        {
          subjectName: sub.subjectName,
          subjectType: sub.subjectType,
          standard:sub.standard,
          subjectCode: sub.subjectCode,
        }
      );
      if (response.status === 200) {
        console.log("saved successful");
        setShowForm(false);
        setSub({ name: "", type: "" });
        

        // Fetch the updated list of subjects after adding a new subject
        getSubjects();
      }
    } catch (error) {
      if(error.response.status===400){
        alert("enter answer 1-4")
      }
      console.error("unable to save", error);
    }
  }

  
  return (
    <div className="main-container" style={{padding:'0'}}>
      <div className="subject-container">
        <hr className="divider" />
        <div style={{display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
        <h2 className="title" style={{fontSize:'2rem'}}>List of Subjects</h2>
        {showForm ? (
          <div className="form-container">
            <h1 style={{color:'black'}}>Enter New Exam details</h1>
            <form>
              <input
                className="input-field"
                name="subjectName"
                onChange={handleChange}
                value={sub.subjectName}
                placeholder="Subject Name"
              />
              <input
                className="input-field"
                name="subjectCode"
                onChange={handleChange}
                value={sub.subjectCode}
                placeholder="Subject Code"
              />
              <select className="input-field" name="standard" onChange={handleChange}>
                <option value="" disabled>Select</option>
                <option value="MCA">MCA</option>
                <option value="BCA">BCA</option>
                <option value="PGDCA">PGDCA</option>
              </select>
              <select className="input-field" name="subjectType" onChange={handleChange}>
                <option value="" disabled>Select</option>
                <option value="Academic">Academic</option>
                <option value="Optional">Optional</option>
              </select>
              <div style={{display:'flex' ,flexDirection:'row' ,justifyContent:'center',alignItems:'center'}}>
              <button onClick={postSubject} className="submit-button">Add</button>
              <button
                type="reset"
                onClick={() => setSub({ subjectName: "", subjectType: "" })}
                className="reset-button"
              >
                Reset
              </button>
              <button onClick={()=>setShowForm(false)} className="submit-button">Cancle</button>
              </div>
            </form>
          </div>
        ) : <button className="add-subject-button" onClick={() => setShowForm(true)}>Add New Subject</button>}
        {subjects.length > 0 ? (
          <div className="subjects-list-admin">
            <table className="subjects-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Type</th>
                  <th>Standard</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.subjectName}</td>
                    <td>{subject.subjectCode}</td>
                    <td>{subject.subjectType}</td>
                    <td>{Array.isArray(subject.standard) ? subject.standard.join(', ') : subject.standard}</td>
                    <td>
                      <button className="modify-button" style={{width:'3rem'}} onClick={() => navigate(`/subjectAdmin/edit/${subject._id}`)}>Modify</button>
                    </td>
                    <td >
                      <button className="delete-button" style={{width:'3rem'}} onClick={() => deleteSubject(subject._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-subjects-container">
            <h2>No subjects</h2>
          </div>
        )}
      </div>
    </div>
    </div>
  );  
}

export default Subjects;
