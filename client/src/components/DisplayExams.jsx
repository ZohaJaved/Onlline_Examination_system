import React,{useState} from "react";
import axios from "axios";
import './Exam.css';
function DisplayExam(props){
    const [detailedExam,setDetailedExam]=useState(null)
    
    //function to delete exam from the database
    async function deleteExam(id){
      const shouldDelete = window.confirm("Are you sure you want to delete this question?");
    
      if (!shouldDelete) {
        return;
      }
      try{
        const response=await axios.post("http://localhost:3001/delExam",{id:id})
        if (response.status===200){
          console.log("Exam deleted from db")
    
          props.updateDisplay();
        }
       }
       catch(error){
       console.error("error during deletion",error)
       }
      }


    const exam=props.exam;
    return(<div>
      {detailedExam&&detailedExam._id===exam._id?(
        <div >
        <table style={{width:"100px", }}>
          <tr>
            <th>Paper Name</th>
            
            <th>Paper Code</th>

            <th>Duration Of exam(in Min)</th>
            
            <th>Maximum Marks</th>

            <th>Passing Marks</th>
            
            <th>Total Number Of questions</th>
            
            <th>Standard</th>

            <th>Actions</th>
          </tr>
            <tr>
              <td>{exam.paperName}</td>
              <td>{exam.paperCode}</td>
              <td>{exam.duration}</td>
              <td>{exam.maxMarks}</td>
              <td>{exam.passingMarks}</td>
              <td>{exam.numOfQues}</td>
              <td>{exam.standard}</td>
              <td colSpan={3}><button onClick={()=>props.setEditingExam(exam)} className="button" style={{width:"130px", height:"35px", padding:"2px"}}>Modify</button>
              <button onClick={()=>setDetailedExam(null)} className="button" style={{width:"130px", height:"35px", padding:"2px"}}>close</button>
              <button onClick={()=>deleteExam(exam._id)} className="button" style={{width:"130px", height:"35px", padding:"2px"}}>Delete</button></td>
            </tr>
        </table>
      </div>

    ):(
       <div >
        <table>
          <tr>
            <th>Paper Name</th>
            
            <th>Paper Code</th>
            <th>Action</th>
            
          </tr>
            <tr>
              <td>{exam.paperName}</td>
              <td>{exam.paperCode}</td>
              <td><button className="button" style={{width:"150px"}} onClick={()=>setDetailedExam(exam)}>See details</button></td>
            </tr>
          
        </table>
      </div>)}</div>)}
export default DisplayExam;