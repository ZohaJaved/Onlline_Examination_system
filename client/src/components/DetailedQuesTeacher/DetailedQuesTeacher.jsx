import React, { useState } from "react";
import EditQuestion from "../EditQuestion/EditQuestion";
import "./DetailedQuesTeacher.css"

function QuesDetails(props) {
  const [showQuesDetails, setShowQuesDetails] = useState(null);
  const question = props.collection;
  console.log("question ......", question);
  return (
    <div className="question-container">
      {showQuesDetails && showQuesDetails._id === props.ques._id ? (
        <div key={props.ques._id} style={{ width: '100%' }}>
          <EditQuestion
            collection={props.ques}
            setShowDetail={setShowQuesDetails}
          />
        </div>
      ) : (
        <div key={props.ques._id} className="question-item">
          <span className="question-description">{props.ques.question}</span>
          <button
            onClick={() => {
              setShowQuesDetails(props.ques);
              props.updateDisplay();
            }}
            className="view-details-button"
          >
            View details
          </button>
        </div>
      )}
    </div>
  );  
}

export default QuesDetails;
