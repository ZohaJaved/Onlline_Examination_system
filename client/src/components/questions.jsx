import React,{useContext} from "react"
import axios from "axios"
import NoteContext from "../context/notes/NoteContext"
import AddQuestions from "./AddQuestionForm"
import DisplayQuestions from "./DisplayQuestions"
//import { getQuestions } from "./DisplayQuestions"
function AddQues(){
   const addQues=useContext(NoteContext)
   
  
 function handleChange(event){
    const {name,value}=event.target;
    addQues.setDetails(prevValue=>{
        return({...prevValue,[name]:value})
    })

 }
 async function postQuestion(event){
    event.preventDefault();
    console.log("came to postQuestion",addQues)
    if (
        addQues.details.level.trim() === '' ||
        addQues.details.question.trim() === '' ||
        addQues.details.opt1.trim() === '' ||
        addQues.details.opt2.trim() === '' ||
        addQues.details.opt3.trim() === '' ||
        addQues.details.opt4.trim() === '' ||
        addQues.details.answer.trim() === '' ||
        addQues.details.standard.trim() === '' ||
        addQues.details.subject.trim() === ''
      ) {
        alert("All fields are required");
        return;
      }
      
      try {
        const response = await axios.post(
          "http://localhost:3001/addQuestions",
          {
            question:addQues.details.question,
             opt1:addQues.details.opt1,
             opt2:addQues.details.opt2,
             opt3:addQues.details.opt3,
             opt4:addQues.details.opt4,
             answer:addQues.details.answer,
             level:addQues.details.level,
             subject:addQues.details.subject,
             standard:addQues.details.standard
          }
        );
        if (response.status === 200) {
          console.log("saved successful");
          //setShowForm(false);
          addQues.setDetails(addQues.initialState)
          addQues.setShowForm(false)
          // Fetch the updated list of subjects after adding a new subject
         addQues.getQuestions();
        }
        
      } catch (error) {
        console.error("unable to save", error);
      }
    }
  
    return(<center><div><div>
      <br></br>
      <hr></hr>
        <h2>Questions</h2>

       {addQues.showForm?(<AddQuestions 
        handleChange={handleChange}
        postQuestion={postQuestion } />):        <button className="list-item" className="button" onClick={() => addQues.setShowForm(true)}>Add new question</button>}
    </div>
    <div>
       <DisplayQuestions/>

    </div></div></center>)
}export default AddQues;