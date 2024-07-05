import React,{useContext} from "react";
import NoteContext from "../context/notes/NoteContext"
import DetailedQues from "./DetailedQuestion";
function DisplayQuestions(){
 
  const DisplayQuestions=useContext(NoteContext)
      
    return(<div>
      {DisplayQuestions.questions.length > 0 ? (
        <div className="questions">
{DisplayQuestions.questions.map((question, index)=>{
                return( 
                    <DetailedQues
                    key={index}
                    collection={question}
                    />)
              
              })}
    </div>):(<div className="spinner">
            <h2>No Questions</h2>
          </div>)
}  </div>)}


export default DisplayQuestions;
