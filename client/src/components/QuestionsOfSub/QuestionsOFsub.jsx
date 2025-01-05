import React,{useContext, useState} from "react";
import noteContext from "../../context/notes/NoteContext";
import AddQuestions from "../AddQuestionForm";
import DetailedQues from "../DetailedQuesTeacher/DetailedQuesTeacher";
import axios from "axios";
function QuestionsOfSub(props) {
  const [addNewQues, setAddNewQues] = useState(false);
  const [showQuesDetails, setShowQuesDetails] = useState(null);
  const addQues = useContext(noteContext);
  console.log("props.quesArray", props.quesArray);
  console.log("props.questions", props.questions);

  function handleChange(event) {
    const { name, value } = event.target;
    addQues.setDetails((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }
  // Check if the questions prop is undefined or null before calling the map() function.
  if (!props.quesArray || props.quesArray.length === 0) {
    return (
      <div>
        {addNewQues ? (
          <AddQuestions
            subject={props.subject}
            // postQuestion={postQuestion}
            handleChange={handleChange}
            setShowForm={setAddNewQues}
          />
        ) : (
          <div>
            <h2>No questions available</h2>
            <br />
            <button
              onClick={() => {
                props.setShowQuestion(false);
                props.setQuestions(null);
              }}
            >
              close
            </button>
            <button onClick={() => setAddNewQues(true)}>
              Add New Question
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="questions-container">
      {" "}
      <h2>Subject: "{props.subject}"</h2>{" "}
      <div className="button-container">
        {" "}
        <button
          onClick={() => setAddNewQues(true)}
          className="back-button mr-2"
        >
          {" "}
          Add New Question{" "}
        </button>{" "}
        <button onClick={()=>props.setShowQuestion(false)} className="back-button">
          {" "}
          Go Back{" "}
        </button>{" "}
      </div>{" "}
      {addNewQues ? (
        <AddQuestions
          subject={props.subject}
          postQuestion={props.postQuestion}
          handleChange={props.handleChange}
          setShowForm={setAddNewQues}
        />
      ) : (
        <div className="questions">
          {" "}
          {props.questions.map((question) => (
            <DetailedQues
              key={question.id} // Added a key prop for better list rendering
              ques={question}
              collection={question}
              quesArray={props.quesArray}
              updateDisplay={props.updateDisplay}
            />
          ))}{" "}
        </div>
      )}{" "}
    </div>
  );
}

export default QuestionsOfSub;