import React,{useState,useCallback,useEffect} from "react";
import Instruction from "./Instruction";
import axios from "axios";
import ExamStart from "./ExamStart";
let detailsExam=undefined;
function ExamSub(props){
  const [examDetails,setExamDetails]=React.useState(null);
    const paperName=props.subject;
    console.log("this is paper name",paperName)

 // get Exam details of a sub
  const getExamDetail = useCallback(async () => {
    try {
      
      const response = await axios.get(`http://localhost:3001/examDetails/${paperName}`);
      console.log(response.data);
      setExamDetails(response.data.examDetails); // Update this line
    } catch (error) {
      console.error("Error fetching exam details:", error);
      setExamDetails(null);
    }
  }, [paperName]);

  useEffect(() => {
    getExamDetail();
  }, [getExamDetail, paperName]); // Include paperName in the dependencies array
  detailsExam=examDetails;
  console.log("this is  detailExam", detailsExam);
const detail = {
  width:"60%",
  padding:"20px",
  background:"transparent"
};
const table= {
  background:"transparent",
  padding:"20px",
  borderRadius:"20px",

};
    return(<div>
     <div>
      {examDetails ? (
        <div>
          <br></br>
          
          <div className="exam-details" style={detail}>
          <h3>Exam Details </h3>
          <table style={table}>
            <tr>
              <th>Subject : </th>
              <td>{examDetails.paperName}</td>
            </tr>
            <tr>
              <th>Paper code: </th>
              <td>{examDetails.paperCode}</td>
            </tr>
            <tr>
              <th>Duration</th>
              <td>{parseInt(examDetails.duration, 10)} minutes</td>
            </tr>
            <tr>
              <th>Maximum marks</th>
              <td>{examDetails.maxMarks}</td>
            </tr>
            <tr>
              <th>Passing marks</th>
              <td>{examDetails.passingMarks}</td>
            </tr>
            <tr>
              <th>No. of questions</th>
              <td>{examDetails.numOfQues}</td>
            </tr>
          </table>
          </div>
          <p>Note:-Please read all instructions carefully before starting the exam.</p>
          
          
           <Instruction numOfQues={examDetails.numOfQues}/>
           <button className="button" onClick={()=>props.setExamStart(true)}>Start Exam</button>
        </div>
      ) : (
        <p>No Examm is scheduled yet....</p>
      )}
    </div>
    </div>)
}export default ExamSub;
export {detailsExam};