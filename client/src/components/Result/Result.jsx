import React from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";


function Result(props) {
  const navigate = useNavigate();
  // Check if props.value exists before destructuring
  const { marks, numOfQues, attempted } = props.value || {};

  console.log("marks.....", props.marks);
  console.log("attempted.....", props.attempted);
  console.log("numOfQues.....", props.numOfQues);

  const maxMarks = props.numOfQues * 5;
  console.log("maxmarks.....", maxMarks);
  const numOfCorrectAns = props.marks / 5;
  console.log("numOfcorrectAns..............", numOfCorrectAns);

  const handleNavigation = () => {
    navigate("/StudentHome");
  };

  return (
    <div className="result-container">
      {" "}
      <table className="result-table">
        {" "}
        <thead>
          {" "}
          <tr>
            {" "}
            <th colSpan={2}>
              <center>Result</center>
              <hr />
            </th>{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          <tr>
            {" "}
            <th>Maximum marks</th> <td>{maxMarks}</td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th>Total No. of questions</th> <td>{props.numOfQues}</td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th>Questions Attempted</th> <td>{props.attempted}</td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th>No. of Correct Answers</th> <td>{numOfCorrectAns}</td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th>Marks Obtained</th> <td>{props.marks}</td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <td colSpan={2}>
              {" "}
              <div className="button-container">
                {" "}
                <button className="back-button bg-black" onClick={handleNavigation}>
                  Back To Home
                </button>{" "}
              </div>{" "}
            </td>{" "}
          </tr>
        </tbody>{" "}
      </table>{" "}
    </div>
  );
}

export default Result;
