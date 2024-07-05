import React from "react";
import { useNavigate } from 'react-router-dom';

function Result(props) {
  const navigate = useNavigate();
 // Check if props.value exists before destructuring
 const { marks, numOfQues, attempted } = props.value || {};


console.log("marks.....", props.marks);
console.log("attempted.....", props.attempted);
console.log("numOfQues.....", props.numOfQues);

const maxMarks = props.numOfQues * 5;
console.log("maxmarks.....", maxMarks);
const numOfCorrectAns = props.marks/ 5;
console.log("numOfcorrectAns..............", numOfCorrectAns);
const result = {
  width:"21%",
  background:"transparent",
  padding:"30px",
  borderRadius:"20px",
  

};
  return (
    <center>
    <div>
      <table style={result} cellSpacing={100}>
        <tr>
          <th colSpan={2} ><center>Result</center><hr></hr></th>
        </tr>
        <tr>
          <th>Maximum marks</th>
          <td>{maxMarks}</td>
        </tr>
        <tr>
          <th>Total No. of questions</th>
          <td>{props.numOfQues}</td>
        </tr>
        <tr>
          <th>Question Attempted</th>
          <td>{props.attempted}</td>
        </tr>
        <tr>
          <th>No. of Correct Answer</th>
          <td>{numOfCorrectAns}</td>
        </tr>
        <th>Marks Obtain</th>
        <td>{props.marks}</td>
      </table>
    </div>
    </center>
  );
}

export default Result;
