import React,{useState,useContext} from "react";
import NoteContext from "../../context/notes/NoteContext";
import axios from "axios";
import "./EditQuestion.css"

 function EditQuestion(props) {
   const addQues = useContext(NoteContext);
   const {
     level,
     question,
     opt1,
     opt2,
     opt3,
     opt4,
     answer,
     subject,
     standard,
   } = props.collection;
   const [editQuestion, setEditingQuestion] = useState(null);

   async function deleteQuestion(id) {
     const shouldDelete = window.confirm(
       "Are you sure you want to delete this question?"
     );

     if (!shouldDelete) {
       return;
     }

     try {
       const response = await axios.post("http://localhost:3001/delQuestion", {
         id: id,
       });

       if (response.status === 200) {
         console.log("question deleted from db");
         addQues.getQuestions();
         props.updateDisplay();
       }
     } catch (error) {
       console.error("error during deletion", error);
     }
   }

   function handleInputChange(e) {
     e.preventDefault();
     const { name, value } = e.target;
     console.log("handleInputChange");
     setEditingQuestion((prevSubject) => {
       return { ...prevSubject, [name]: value };
     });
   }
   //update database
   async function updateClick(event) {
     event.preventDefault();
     if (
       editQuestion.level.trim() === "" ||
       editQuestion.question.trim() === "" ||
       editQuestion.opt1.trim() === "" ||
       editQuestion.opt2.trim() === "" ||
       editQuestion.opt3.trim() === "" ||
       editQuestion.opt4.trim() === "" ||
       editQuestion.answer.trim() === "" ||
       editQuestion.subject.trim() === ""
     ) {
       alert("please enter all the field");
       return;
     }
     try {
       const id = editQuestion._id;
       await axios.put(
         `http://localhost:3001/updateQuestion/${id}`,
         editQuestion
       );
       console.log("updated succesfully");
       setEditingQuestion(null);
       addQues.getQuestions();
     } catch (error) {
       console.error(error);
     }
   }
   return (
    <div className="edit-question-container">
      {editQuestion && editQuestion._id === props.collection._id ? (
        <div>
          <form className="edit-question-form">
            <div className="edit-question-item">
              <label className="edit-question-label">Level</label>
              <select
                className="input"
                name="level"
                value={editQuestion.level}
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="edit-question-item">
              <label className="edit-question-label">Question</label>
              <input
                className="input"
                name="question"
                value={editQuestion.question}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-question-item">
              <label className="edit-question-label">Option 1</label>
              <input
                className="input"
                name="opt1"
                value={editQuestion.opt1}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-question-item">
              <label className="edit-question-label">Option 2</label>
              <input
                className="input"
                name="opt2"
                value={editQuestion.opt2}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-question-item">
              <label className="edit-question-label">Option 3</label>
              <input
                className="input"
                name="opt3"
                value={editQuestion.opt3}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-question-item">
              <label className="edit-question-label">Option 4</label>
              <input
                className="input"
                name="opt4"
                value={editQuestion.opt4}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-question-item">
              <label className="edit-question-label">Answer</label>
              <input
                className="input"
                name="answer"
                value={editQuestion.answer}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-question-item">
              <label className="edit-question-label">Subject</label>
              <input
                className="input"
                name="subject"
                value={editQuestion.subject}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-question-actions">
              <button className="button" onClick={updateClick}>
                Update
              </button>
              <button className="button" onClick={() => setEditingQuestion(null)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <div className="question-item">
            <span className="question-label">Level:</span>
            <span className="question-value">{props.collection.level}</span>
          </div>
          <div className="question-item">
            <span className="question-label">Question:</span>
            <span className="question-value">{props.collection.question}</span>
          </div>
          <div className="question-item">
            <span className="question-label">Option 1:</span>
            <span className="question-value">{props.collection.opt1}</span>
          </div>
          <div className="question-item">
            <span className="question-label">Option 2:</span>
            <span className="question-value">{props.collection.opt2}</span>
          </div>
          <div className="question-item">
            <span className="question-label">Option 3:</span>
            <span className="question-value">{props.collection.opt3}</span>
          </div>
          <div className="question-item">
            <span className="question-label">Option 4:</span>
            <span className="question-value">{props.collection.opt4}</span>
          </div>
          <div className="question-item">
            <span className="question-label">Answer:</span>
            <span className="question-value">{props.collection.answer}</span>
          </div>
          <div className="question-item">
            <span className="question-label">Subject:</span>
            <span className="question-value">{props.collection.subject}</span>
          </div>
          <div className="edit-question-actions">
            <button className="button" onClick={() => setEditingQuestion(props.collection)}>
              Modify
            </button>
            <button className="button" onClick={() => props.deleteQuestion(props.collection._id)}>
              Delete
            </button>
            <button className="button" onClick={() => props.setShowDetail(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
 }
 export default EditQuestion;