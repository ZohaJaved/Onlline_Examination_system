import React,{useState,useContext} from "react";
import NoteContext from "../context/notes/NoteContext";
import EditQuestion from "./EditQuestion/EditQuestion.css";
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
        {(showDetail && showDetail._id===question._id) ?(
       <EditQuestion
       collection={question}
       setShowDetail={setShowDetail}
       updatedisplay={props.Updatedisplay}
       />
     )
   :(
   <table>
    <tr>
      <th className="th">Question</th>
      <th className="th">Subject</th>
      <th className="th">Action</th>
    </tr>
  
   <tr>
       <td>{question.question}</td>
       <td>{question.subject}</td>
       <td><button className="button" style={{width:"150px ", height:"40px", padding:"2px", alignContent:"center"}} onClick={()=> navigate(`/quesDetails/${question._id}`)}>View Details</button></td>
     </tr>
     
     </table>
      )}</div>)
}export default DetailedQues;