import React, { useEffect, useState, useContext, useCallback } from "react";
import NoteContext from "../../context/notes/NoteContext";
import Addinterest from "../AddInterest/AddInterest";
import InterestedSubject from "../InterestedSubject/IntersetedSubject.jsx";
import QuestionsOfSub from "../QuestionsOfSub/QuestionsOFsub.jsx";
import Home from "../LoginType";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./TeacherHome.css";

//import logo from './pics/home.png';
function TeacherHome() {
  const [enterQuestion, setEnterQuestion] = useState(false);
  const [showQuestions, setShowQuestion] = useState(false);
  const [quesDetails, setQuesDetails] = useState(null);
  const [quesArray, setQuesArray] = useState(null);
  const [sub, setSub] = useState(); //
  const [isLoading, setIsLoading] = useState(true);
  // const teacherContext = useContext(NoteContext);
  const [info, setInfo] = useState(null);
  //const id=teacherContext.user.idd;
  // let id = window.localStorage.getItem("id");
  const [id,setId]=useState();
  console.log("came to TeacherHome", id);

  // const loginContext = useContext(NoteContext);

  useEffect(() => {
    const response = JSON.parse(localStorage.getItem("user"));
    console.log("response", response);
    setId(response.id);
  }, []);

  useEffect(() => {
    if (id) {
      getInfo();
    }
  }, [id]);
  

  const getInfo = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/teachersInfo/${id}`);
      setInfo(response.data);
    } catch (error) {
      console.error("Error fetching teacher info:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //fetching all questions of a "subject"
  const getQuestions = useCallback(async (subject) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/QuestionsOfInterest/${subject}`
      );
      if (response.status === 204 || response.status === 404) {
        alert("No questions available");
        return;
      }

      const questions = response.data.questions;
      console.log("response from server", questions);
      setQuesDetails(questions);
      // Extract the 'question' field from each question document
      const questionArray = questions.map((item) => item.question);
      console.log("questionArray", questionArray);
      setQuesArray(questionArray);

      console.log("mil gya questions", questionArray);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }, []);
  
  // useEffect(() => {
  //   getInfo();
  // }, [getInfo]);

  const interestedSubject = info?.interest || [];
  console.log("interestedSubject", interestedSubject);
  return (
    <center>
      {" "}
      <div className="center">
        {" "}
        <Navbar showLogout={true} />{" "}
        <div>
          {" "}
          {info ? (
            <h1 style={{ color: "black", marginBottom: "1rem" }}>
              {" "}
              Hello...!
              <br /> {info.title} {info.teacherName}!{" "}
            </h1>
          ) : (
            <p>Loading teacher information...</p>
          )}{" "}
          <div>
            {" "}
            {interestedSubject.length > 0 ? (
              showQuestions ? (
                <QuestionsOfSub
                  questions={quesDetails}
                  quesArray={quesArray}
                  show
                  subject={sub}
                  setQuestions={setQuesDetails}
                  setShowQuestion={setShowQuestion}
                  updateDisplay={getQuestions}
                  setSub={setSub}
                />
              ) : (
                <div>
                  {" "}
                  <div className="add-subject-container">
                    {" "}
                    <button
                      onClick={() => {
                        setEnterQuestion(true);
                      }}
                      className="add-subject-button"
                    >
                      {" "}
                      Add New Subject{" "}
                    </button>{" "}
                    {enterQuestion && (
                      <Addinterest
                        id={id}
                        showForm={setEnterQuestion}
                        updateDisplay={getInfo}
                        interestedSubject={interestedSubject}
                      />
                    )}{" "}
                  </div>{" "}
                  <div>
                    {" "}
                    <InterestedSubject
                      interestedSubject={interestedSubject}
                      setShowQuestion={setShowQuestion}
                      showQues={getQuestions}
                      setSubject={setSub}
                    />{" "}
                  </div>{" "}
                </div>
              )
            ) : (
              <h1 className="no-subjects">No Subjects</h1>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </center>
  );
}
export default TeacherHome;
