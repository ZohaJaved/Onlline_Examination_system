import React,{useContext, useState} from "react";
import noteContext from "../context/notes/NoteContext";
import AddQuestions from "./AddQuestionForm";
import DetailedQues from "./DetailQuesTeacher";
import axios from "axios";
function QuestionsOfSub(props){
  const[addNewQues,setAddNewQues]=useState(false)
  const[showQuesDetails,setShowQuesDetails]=useState(null);
  const addQues=useContext(noteContext)
  console.log("props.quesArray",props.quesArray)
  console.log("props.questions",props.questions)

      function handleChange(event){
      const {name,value}=event.target;
      addQues.setDetails(prevValue=>{
          return({...prevValue,[name]:value})
      })}


      //post new Question
      async function postQuestion(event){
      event.preventDefault();
      console.log("came to postQuestion",addQues.details)
      if (
        addQues.details.level.trim() === '' ||
        addQues.details.question.trim() === '' ||
        addQues.details.opt1.trim() === '' ||
        addQues.details.opt2.trim() === '' ||
        addQues.details.opt3.trim() === '' ||
        addQues.details.opt4.trim() === '' ||
        addQues.details.standard.trim() === '' ||
        addQues.details.answer.trim() === ''
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
             standard:addQues.details.standard,
             subject:props.subject
          }
        );
        if (response.status === 200) {
          console.log("saved successful");
          //setShowForm(false);
          addQues.setDetails(addQues.initialState)
          setAddNewQues(false)
          // Fetch the updated list of subjects after adding a new subject
         props.updateDisplay(props.subject);
        }
        
      } catch (error) {
        console.error("unable to save", error);
      }
    }
      // Check if the questions prop is undefined or null before calling the map() function.
    if (!props.quesArray || props.quesArray.length === 0) {
      return (
        <div>
           {addNewQues?<AddQuestions subject={props.subject} postQuestion={postQuestion} handleChange={handleChange} setShowForm={setAddNewQues}/>:(<div>
          <h2>No questions available</h2>
          <br/>
          <button onClick={() => {props.setShowQuestion(false); props.setQuestions(null); }}>close</button>
          <button onClick={() => setAddNewQues(true)}>Add New Question</button></div>)}
          </div>)}
    
 return(<div>
   <h2>Subject:"{props.subject}"</h2>
   <button onClick={() => setAddNewQues(true)}>Add New Question</button>
  {addNewQues?<AddQuestions subject={props.subject} postQuestion={postQuestion} handleChange={handleChange} setShowForm={setAddNewQues}/>:
      <div className="questions">
      {/* conditional rendering wheather to show question details or not  */}
     
       
      {props.questions.map((question)=>{
                return( 
                    <DetailedQues
                    ques={question}
                    collection={question}
                    quesArray={props.quesArray}
                    updateDisplay={props.updateDisplay}
                    />)
                })}
                </div>}
                </div>)}

export default QuestionsOfSub;