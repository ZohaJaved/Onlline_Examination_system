import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NoteContext from "../context/notes/NoteContext";
import AddQuestions from "./AddQuestionForm";
import "./SubjectAdmin/SubjectAdmin.css"

//import { getQuestions } from "./DisplayQuestions"
function AddQues() {
  const addQues = useContext(NoteContext);
  const DisplayQuestions=useContext(NoteContext)
  const navigate=useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    addQues.setDetails((prevValue) => {
      return { ...prevValue, [name]: value };
    });
  }
  async function postQuestion(event) {
    event.preventDefault();
    console.log("came to postQuestion", addQues);
    if (
      addQues.details.level.trim() === "" ||
      addQues.details.question.trim() === "" ||
      addQues.details.opt1.trim() === "" ||
      addQues.details.opt2.trim() === "" ||
      addQues.details.opt3.trim() === "" ||
      addQues.details.opt4.trim() === "" ||
      addQues.details.answer.trim() === "" ||
      addQues.details.standard.trim() === "" ||
      addQues.details.subject.trim() === ""
    ) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/addQuestions", {
        question: addQues.details.question,
        opt1: addQues.details.opt1,
        opt2: addQues.details.opt2,
        opt3: addQues.details.opt3,
        opt4: addQues.details.opt4,
        answer: addQues.details.answer,
        level: addQues.details.level,
        subject: addQues.details.subject,
        standard: addQues.details.standard,
      });
      if (response.status === 200) {
        console.log("saved successful");
        //setShowForm(false);
        addQues.setDetails(addQues.initialState);
        addQues.setShowForm(false);
        // Fetch the updated list of subjects after adding a new subject
        addQues.getQuestions();
      }
    } catch (error) {
      console.error("unable to save", error);
    }
  }

  return (
    <div className="main-container">
      <div className="subject-container">
        <h2 className="title">Questions</h2>
        {addQues.showForm ? (
          <AddQuestions
            handleChange={handleChange}
            postQuestion={postQuestion}
          />
        ) : (
          <button
            className="add-subject-button"
            onClick={() => addQues.setShowForm(true)}
          >
            Add New Question
          </button>
        )}
      </div>
      <div className="subjects-list-admin">
        <table className="subjects-table">
          <thead>
            <tr>
              <th className="th">Question</th>
              <th className="th">Subject</th>
              <th className="th">Action</th>
            </tr>
          </thead>
          {DisplayQuestions.questions.length > 0 ? (
            <tbody>
              {DisplayQuestions.questions.map((question, index) => (
                <tr key={index}>
                  <td>{question.question}</td>
                  <td>{question.subject}</td>
                  <td>
                    <button
                      className="modify-button"
                      onClick={()=> navigate(`/quesDetails/${question._id}`)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <div className="no-subjects-container">
              <h2>No Questions</h2>
            </div>
          )}
        </table>
      </div>
    </div>
  );  
}
export default AddQues;
