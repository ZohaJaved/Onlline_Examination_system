import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NoteContext from "../../context/notes/NoteContext";

function QuestionDetails() {
  const DisplayQuestions = useContext(NoteContext);
  const [editingQuestion, setEditingQuestion] = useState(null);//editing value
  const [editQuestion,setEditQuestion]=useState(false);

  let { id } = useParams();

  const filteredQuestion=DisplayQuestions.questions&&DisplayQuestions.questions.filter(question=>question.id===id)


  return (
    <div>
      {filteredQuestion && filteredQuestion
          .map((filteredQuestion) => {
            return (
              <div>
                <div className="question-item">
                  <span className="question-label">Level:</span>
                  <span className="question-value">
                    {filteredQuestion.level}
                  </span>
                </div>
                <div className="question-item">
                  <span className="question-label">Question:</span>
                  <span className="question-value">
                    {filteredQuestion.question}
                  </span>
                </div>
                <div className="question-item">
                  <span className="question-label">Option 1:</span>
                  <span className="question-value">
                    {filteredQuestion.opt1}
                  </span>
                </div>
                <div className="question-item">
                  <span className="question-label">Option 2:</span>
                  <span className="question-value">
                    {filteredQuestion.opt2}
                  </span>
                </div>
                <div className="question-item">
                  <span className="question-label">Option 3:</span>
                  <span className="question-value">
                    {filteredQuestion.opt3}
                  </span>
                </div>
                <div className="question-item">
                  <span className="question-label">Option 4:</span>
                  <span className="question-value">
                    {filteredQuestion.opt4}
                  </span>
                </div>
                <div className="question-item">
                  <span className="question-label">Answer:</span>
                  <span className="question-value">
                    {filteredQuestion.answer}
                  </span>
                </div>
                <div className="question-item">
                  <span className="question-label">Subject:</span>
                  <span className="question-value">
                    {filteredQuestion.subject}
                  </span>
                </div>
                <div className="edit-question-actions">
                  <button
                    className="button"
                    // onClick={() => setEditingQuestion(props.collection)}
                  >
                    Modify
                  </button>
                  <button
                    className="button"
                    // onClick={() => props.deleteQuestion(props.collection._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="button"
                    // onClick={() => props.setShowDetail(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            );
          })}
    </div>
  );
}
export default QuestionDetails;
