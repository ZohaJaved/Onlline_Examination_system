import React, { useState, useCallback, useEffect, useContext } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import NoteContext from "../../context/notes/NoteContext";
import Timer from "../Timer";
import axios from "axios";
import Result from "../Result/Result";
import Navbar from "../Navbar/Navbar";
import "./ExamStart.css"


function ExamStart() {
  const studentContext = useContext(NoteContext);
  const location = useLocation();
  const detailsExam = location.state?.examDetails || {};
  const subject = detailsExam.paperName;
  const examId = detailsExam.paperCode; 
  // const userId = studentContext.user.idd;
  const navigate=useNavigate();

  
  const [studentName,setStudentName]=useState();
  const [userId,setUserId]=useState();
  const [standard, setStandard] = useState();
  const [ques, setQues] = useState(null);
  const [shuffledArray, setShuffledArray] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [submit, setSubmit] = useState(false); // To trigger result display
  const [marks, setMarks] = useState(0);
  const [remainingTime, setRemainingTime] = useState(detailsExam.duration * 60);
  const [rollNum,setRollNum]=useState();

  const [numOfQues, setNumOfQues] = useState(0);
  const maxTime = detailsExam.duration * 60;

  useEffect(()=>{
    const response=JSON.parse(localStorage.getItem("user"));
    console.log("response",response);
    setUserId(response.id);
    setStudentName(response.userName)
    setStandard(response.class);
    setRollNum(response.rollNum);
  },[])

  const getStudentDetailAndQuestions = useCallback(async () => {
    try {
      // const response = await axios.get(`http://localhost:3001/studentDetails/${userId}`);
      // const fetchedStandard = response.data.class;
      // setStudentDetails(response.data);
      // setStandard(fetchedStandard);

      if (subject && standard) {
        const questionResponse = await axios.get(
          `http://localhost:3001/QuestionsOfSub/${subject}/${standard}`
        );
        setQues(questionResponse.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [userId, subject]);


  


  useEffect(() => {
    getStudentDetailAndQuestions();
  }, [getStudentDetailAndQuestions]);


  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => {
        if (prevRemainingTime > 0) {
          return prevRemainingTime - 1;
        } else {
          clearInterval(timerInterval);
          alert("Exam time is over!");
          setSubmit(true); // Automatically submit when time is over
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const handleResponse = (selectedOption) => {
    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestionIndex] = selectedOption;
    setUserResponses(updatedResponses);
  };

  const calculateMarks = useCallback(async () => {
    if (ques && ques.questions) {
      setNumOfQues(ques.questions.length);
      let totalMarks = 0;
      
      // Calculate marks based on correct answers
      ques.questions.forEach((question, index) => {
        if (question.answer === userResponses[index]) {
          totalMarks += 5;
        }
      });
  
      setMarks(totalMarks);
      setSubmit(true); // Set submit to true to render the Result component
  
      const performance = {
        rollNum: rollNum ,
        userName: studentName,
        standard,
        subjectName: subject,
        date: new Date().toISOString(),
        maxMarks: ques.questions.length * 5,
        marksObtained: totalMarks,
        grading: totalMarks >= (ques.questions.length * 5 * 0.6) ? 'A' : 'C', // Example grading logic
        remark: totalMarks >= (ques.questions.length * 5 * 0.6) ? 'Pass' : 'Fail'
      };
  
      try {
        console.log("Sending performance data:", performance);
        const response = await axios.post(`http://localhost:3001/postPerformance`, performance);
        console.log("Performance submitted successfully:", response.data);
        await axios.post(`http://localhost:3001/updateExamStatus`, { userId, examId });
      } catch (error) {
        console.error("Error while submitting performance or updating Exam Status", error);
      }
    }
  }, [ques, userResponses, studentName, subject]);
  

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function determineLevel(level) {
    return level === "a" ? "Easy" : level === "b" ? "Medium" : "Hard";
  }

  useEffect(() => {
    if (ques && ques.questions[currentQuestionIndex]) {
      const currentQuestion = ques.questions[currentQuestionIndex];
      setShuffledArray(
        shuffleArray([
          currentQuestion.opt1,
          currentQuestion.opt2,
          currentQuestion.opt3,
          currentQuestion.opt4,
        ])
      );
    }
  }, [ques, currentQuestionIndex]);

  const currentQuestion = ques && ques.questions && ques.questions[currentQuestionIndex];

  

  return (
    <div className="exam-container">
      <Navbar />
      {submit ? (
        <Result numOfQues={numOfQues} attempted={userResponses.length} marks={marks} />
      ) : currentQuestion && currentQuestionIndex <= ques.questions.length - 1 ? (
        <div className="question-card">
          <Timer maxTime={maxTime} remainingTime={remainingTime} />
          <h3 className="question-header">Question {currentQuestionIndex + 1}:</h3>
          <h6 className="question-level">Level: {determineLevel(currentQuestion.level)}</h6>
          <p className="question-text">{currentQuestion.question}</p>
          <ol className="options-list">
            {shuffledArray.map((option, index) => (
              <li key={index} className="option-item">
                <label className="option-label">
                  <input
                    className="option-input"
                    type="radio"
                    value={option}
                    checked={userResponses[currentQuestionIndex] === option}
                    onChange={() => handleResponse(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ol>
          <div className="navigation-buttons">
            {currentQuestionIndex > 0 && (
              <button className="nav-button" onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
                Previous
              </button>
            )}
            {currentQuestionIndex < ques.questions.length - 1 ? (
              <button className="nav-button" onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                Next
              </button>
            ) : (
              <button className="submit-button" onClick={calculateMarks}>
                Submit
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ExamStart;
