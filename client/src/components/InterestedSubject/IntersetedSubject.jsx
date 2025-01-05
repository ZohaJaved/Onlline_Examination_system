import React from "react";
import "./InterestedSubject.css"

function InterestedSubject(props) {
  console.log("InterestedSubject", props.interestedSubject);

  return (
    <div className="interested-subject-container">
      {props.interestedSubject.map((subject, index) => (
        <div key={index} className="interested-subject-item">
          <span className="subject-name">{subject}</span>
          <button
            onClick={() => {
              props.showQues(subject);
              props.setShowQuestion(true);
              props.setSubject(subject);
            }}
            className="view-questions-button"
          >
            View all questions
          </button>
        </div>
      ))}
    </div>
  );
}  
export default InterestedSubject;
