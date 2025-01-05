import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import axios from "axios";
// import './Exam/Exam.css';

function AddQuestions(props){
    const addQues=useContext(NoteContext)
    const [subjectList,setSubjectList]=useState();
    const [userEmail,setUserEmail]=useState();

    useEffect(() => {
        const response = JSON.parse(localStorage.getItem("user"));
        console.log("response", response);
        setUserEmail(response.email);
      }, []);

    function handleChange(event) {
        const { name, value } = event.target;
        addQues.setDetails((prevValue) => {
          return { ...prevValue, [name]: value };
        });
      }

       //post new Question
  async function postQuestion(event) {
    event.preventDefault();
    console.log("came to postQuestion", userEmail);
    if (
      addQues.details.level.trim() === "" ||
      addQues.details.question.trim() === "" ||
      addQues.details.opt1.trim() === "" ||
      addQues.details.opt2.trim() === "" ||
      addQues.details.opt3.trim() === "" ||
      addQues.details.opt4.trim() === "" ||
      addQues.details.standard.trim() === "" ||
      addQues.details.answer.trim() === ""
    ) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/addQuestions", {
        question: addQues.details.question,
        opt1: addQues.details.opt1,
        opt2: addQues.details.opt2,
        opt3: addQues.details.opt3,
        opt4: addQues.details.opt4,
        answer: addQues.details.answer,
        level: addQues.details.level,
        standard: addQues.details.standard,
        subject: props.subject,
        addedBy:userEmail
      });
      if (response.status === 200) {
        console.log("saved successful");
        //setShowForm(false);
        addQues.setDetails(addQues.initialState);
        props.setAddNewQues(false);
        // Fetch the updated list of subjects after adding a new subject
        props.updateDisplay(props.subject);
      }
    } catch (error) {
      console.error("unable to save", error);
    }
  }
 
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

    return(
    <div>
        
        <form>
        <h2>Add questions  { props.subject}</h2>
        
            <label htmlFor="Level"><b>Difficulty level : </b></label>
            <select className="input" id="Level" name="level" value={addQues.details.level} onChange={handleChange}>
            <option value="" disabled>Select</option>
                <option value="a">Easy</option>
                <option value="b">Medium</option>
                <option value="c">Hard</option>
                </select>
                <br/>
            <label>
                <b>Question : </b>
                <input className="input" type="text" name="question" value={addQues.details.question} placeholder="Enter Question" onChange={handleChange}/>
            </label>
            <br/>
            <label>
                <b>a : </b>
                <input className="input" type="text" name="opt1" value={addQues.details.opt1} placeholder="Enter First Option" onChange={handleChange}/>
            </label>
            <br/>
            <label>
                <b>b : </b>
                <input className="input" type="text" name="opt2" value={addQues.details.opt2} placeholder="Enter Second Option" onChange={handleChange}/>
            </label>
            <br/>
            <label>
                <b>c : </b>
                <input className="input" type="text" name="opt3" value={addQues.details.opt3} placeholder="Enter Third Option" onChange={handleChange}/>
            </label>
            <br/>
            <label>
                <b>d : </b>
                <input className="input" type="text" name="opt4" value={addQues.details.opt4} placeholder="Enter Fourth Option" onChange={handleChange}/>
            </label>
            <br/>
            <label htmlFor="answer"><b>Correct Answer : </b></label>
            <select className="input" id="answer" name="answer" value={addQues.details.answer} onChange={handleChange}>
            <option value="" disabled>Select</option>
                <option value={addQues.details.opt1}>a</option>
                <option value={addQues.details.opt2}>b</option>
                <option value={addQues.details.opt3}>c</option>
                <option value={addQues.details.opt4}>d</option>
                </select>
            <br/>
            <label htmlFor="standard"><b>Standard : </b></label>
            <select className="input" id="standard" name="standard" value={addQues.details.standard} onChange={handleChange}>
            <option value="" disabled>Select</option>
                <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
                </select><br/>
                <label><b>Subject : </b></label>
            <select className="input" id="subject" name="subject" value={addQues.details.subject} onChange={handleChange}>
               <option value="" disabled>Select</option> 
               {subjectList && subjectList.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
                ))}
               </select><br />

        
    <br />

            <button  className="button" onClick={postQuestion  }>Done</button>
           <button  className="button" onClick={(e) => {
    e.preventDefault();
addQues.setDetails(addQues.initialState);
}}>Reset</button>
   <button  className="button" onClick={() => {
    if (props.setShowForm) {
        props.setShowForm(false);
    } else if (addQues.setShowForm) {
        addQues.setShowForm(false);
    } else {
        console.error("setShowForm is not defined");
    }
}}>
    Cancel
</button>


        </form>
    </div>)
}export default AddQuestions;
