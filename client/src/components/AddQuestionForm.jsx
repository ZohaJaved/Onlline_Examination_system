import React, { useContext, useEffect, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import axios from "axios";
import './Exam.css';
function AddQuestions(props){
    const addQues=useContext(NoteContext)
    const [subjectList,setSubjectList]=useState();
 
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
            <select className="input" id="Level" name="level" value={addQues.details.level} onChange={props.handleChange}>
            <option value="" disabled>Select</option>
                <option value="a">Easy</option>
                <option value="b">Medium</option>
                <option value="c">Hard</option>
                </select>
                <br/>
            <label>
                <b>Question : </b>
                <input className="input" type="text" name="question" value={addQues.details.question} placeholder="Enter Question" onChange={props.handleChange}/>
            </label>
            <br/>
            <label>
                <b>a : </b>
                <input className="input" type="text" name="opt1" value={addQues.details.opt1} placeholder="Enter First Option" onChange={props.handleChange}/>
            </label>
            <br/>
            <label>
                <b>b : </b>
                <input className="input" type="text" name="opt2" value={addQues.details.opt2} placeholder="Enter Second Option" onChange={props.handleChange}/>
            </label>
            <br/>
            <label>
                <b>c : </b>
                <input className="input" type="text" name="opt3" value={addQues.details.opt3} placeholder="Enter Third Option" onChange={props.handleChange}/>
            </label>
            <br/>
            <label>
                <b>d : </b>
                <input className="input" type="text" name="opt4" value={addQues.details.opt4} placeholder="Enter Fourth Option" onChange={props.handleChange}/>
            </label>
            <br/>
            <label htmlFor="answer"><b>Correct Answer : </b></label>
            <select className="input" id="answer" name="answer" value={addQues.details.answer} onChange={props.handleChange}>
            <option value="" disabled>Select</option>
                <option value={addQues.details.opt1}>a</option>
                <option value={addQues.details.opt2}>b</option>
                <option value={addQues.details.opt3}>c</option>
                <option value={addQues.details.opt4}>d</option>
                </select>
            <br/>
            <label htmlFor="standard"><b>Standard : </b></label>
            <select className="input" id="standard" name="standard" value={addQues.details.standard} onChange={props.handleChange}>
            <option value="" disabled>Select</option>
                <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
                </select><br/>
                <label><b>Subject : </b></label>
            <select className="input" id="subject" name="subject" value={addQues.details.subject} onChange={props.handleChange}>
               <option value="" disabled>Select</option> 
               {subjectList && subjectList.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
                ))}
               </select><br />

        
    <br />

            <button  className="button" onClick={props.postQuestion  }>Done</button>
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
