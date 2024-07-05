import React,{useState,useContext} from "react";
import NoteContext from "../context/notes/NoteContext";
import EditQuestion from "./EditQuestion";
import axios from "axios";
function DetailedQues(props){
  const question=props.collection;
  const addQues=useContext(NoteContext)
  const [showDetail,setShowDetail]=useState(null);
  
  
   // addQues.getQuestions();
  

  //const handleQuestionClick = (question) => {
    //console.log("came to handle question click")
 //   setShowDetail(question);
  
 // };

    return(<div>
        {(showDetail && showDetail._id===question._id) ?(<div>
       <EditQuestion
       collection={question}
       setShowDetail={setShowDetail}
       updatedisplay={props.Updatedisplay}
       />
     </div>)
   :(<div>
   <table>
    <tr>
      <th className="th">Question</th>
      <th className="th">Subject</th>
      <th className="th">Action</th>
    </tr>
  
   <tr>
       <td>{question.question}</td>
       <td>{question.subject}</td>
       <td><button className="button" style={{width:"150px ", height:"40px", padding:"2px", alignContent:"center"}} onClick={()=>{ setShowDetail(question); addQues.getQuestions()}}>View Details</button></td>
     </tr>
     
     </table>
      </div>)}</div>)
}export default DetailedQues;