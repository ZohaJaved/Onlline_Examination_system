import React,{useEffect, useState} from "react";
import axios from "axios";
import "./AddInterest.css"

function Addinterest(props) {
  // console.log(props.id,"heheheh")
  const [newSubject, setNewSubject] = useState("");
  const [subjectList,setSubjectList]=useState();
 
    //get the list of subjects
     async function getSubjects() {
     const response = await axios.get("http://localhost:3001/subjectsList");
     console.log(response.data);
     setSubjectList(response.data);
}

useEffect(()=>{
  getSubjects();
},[])
  function handleChange(event) {
    event.preventDefault();
    setNewSubject(event.target.value);
  }
  async function addNewInterest(event) {
    event.preventDefault();
    console.log("newSubject",newSubject);
    console.log("props.intesrestedSubject",props.interestedSubject)
    if(props.interestedSubject&&props.interestedSubject.includes(newSubject)){
      alert (`${newSubject} is alredy in you interseted subject`)
      setNewSubject('');
      return
    }
    if (newSubject&&newSubject.trim() === "") {
      alert("subject name cant be empty");
      return;
    }
    try {
      console.log("subject adding", newSubject);
      await axios.put(`http://localhost:3001/addInterest/${props.id}`, {
        newSubject: [newSubject], // Send as an array
      });
      console.log("added succesfully");
      setNewSubject("");
      props.showForm(false);
      props.updateDisplay();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="add-subject-container">
      {" "}
      <h1 className="add-subject-title">Add New Subject</h1>{" "}
      <form className="add-subject-form">
        {" "}
        {/* <label>
          {" "}
          <input
            type="text"
            name="interest"
            value={newSubject}
            placeholder="Enter Subject Name"
            onChange={handleChange}
            className="add-subject-input"
          />{" "}
        </label>{" "} */}
        <label><b>Subject : </b></label>
            <select className="input" id="subject" name="interest" value={newSubject} onChange={handleChange}>
               <option value="" disabled>Select</option> 
               {subjectList && subjectList.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
                ))}
               </select>
        <div>
          {" "}
          <button
            type="button"
            onClick={addNewInterest}
            className="add-subject-button bg-black"
          >
            {" "}
            Add{" "}
          </button>{" "}
          <button
            type="button"
            onClick={() => props.showForm(false)}
            className="add-subject-cancel-button bg-red-500"
          >
            {" "}
            Cancel{" "}
          </button>{" "}
        </div>{" "}
      </form>{" "}
    </div>
  );
}
export default Addinterest;