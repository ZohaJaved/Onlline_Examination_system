import React, { useState, useEffect } from "react";
import axios from "axios";
import SubjectEntry from "./subjectEntry";

function Subjects() {
  const [sub, setSub] = useState({
    subjectName: "",
    subjectType: "",
    standard:"",
    subjectCode: "",
  });
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
    <div>
      <center>
        <hr></hr>
       <h2>List of Subjects</h2>
      <button className="list-item button"  onClick={() => setShowForm(true)}>Add new subject</button>
      {showForm ? (
        <div>
          <form>
            <input
              style={{height:"43px", width:"170px", marginLeft:"5px"}}
              className="input"
              name="subjectName"
              onChange={handleChange}
              value={sub.subjectName}
              placeholder="Subject Name"
            />
            <input
              style={{height:"43px", width:"170px", marginLeft:"5px"}}
              className="input"
              name="subjectCode"
              onChange={handleChange}
              value={sub.subjectCode}
              placeholder="Subject Code"
            />
          <select className="input" style={{height:"43px", width:"170px", marginLeft:"5px"}} name="standard" onClick={handleChange} >standard:
            <option value="" disabled>Select</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
              <option value="PGDCA">PGDCA</option>
            </select>
            <select className="input" style={{height:"43px", width:"170px", marginLeft:"5px"}} name="subjectType" onClick={handleChange} >
            <option value="" disabled>Select</option>
              <option value="Academic">Academic</option>
              <option value="Optional">Optional</option>
            </select>
            <button onClick={postSubject} className="button">Add</button>
            <button
              type="reset"
              onClick={() => setSub({ subjectName: "", subjectType: "" })} className="button"
            >
              Reset
            </button>
          </form>
        </div>
      ) : null}
      <div>
       
        {subjects.length > 0 ? (
          //<ul className="list">
            <div className="subjects">
          
              {subjects.map((subject,index)=>{
                return( 
                <SubjectEntry
                 key={index}
                  subject={subject}
                  updateDisplay={getSubjects}
                />
              )
              })}
            </div>
        ) : (
          <div className="spinner">
            <h2>no subjects</h2>
          </div>
        )}
      </div>
      </center>
    </div>
    
  );
}

export default Subjects;
