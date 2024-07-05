import React, { useState, useCallback, useEffect,useContext } from "react";
import { detailsExam } from "./ExamOfSub";
import noteContext from "../context/notes/NoteContext";
import Timer from "./Timer";
import axios from "axios";
import Result from "../Result";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//level
function determineLevel(level){
  console.log(level)
  if(level==="a")
  return "Easy"
else if(level==="b")
return "Medium"
else 
return "Hard"
}

function ExamStart(props) {
  const [shuffledArray, setShuffledArray] = useState([]);
  const [ques, setQues] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const [attempt,setAttempt]=useState(0)
  const [submit,setSubmit]=useState(false)
  const [marks,setMarks]=useState(0)
  const subject = detailsExam.paperName;
  const standard=props.standard
  const[numOfQues,setNumOfQues]=useState(0);
  // get all the questions of paper
  const getExamQuestions = useCallback(async () => {
    try {
      console.log("going to fetch all the questions");
      const response = await axios.get(
        `http://localhost:3001/QuestionsOfSub/${subject}/${standard}`
      );
      console.log("response.data", response.data);
      setQues(response.data); // Update this line
    } catch (error) {
      console.error("Error fetching exam details:", error);
    }
  }, [subject]);

  // Call getExamQuestions in useEffect hook to fetch questions on mount
  useEffect(() => {
    getExamQuestions();
  }, []);

  console.log("this is exam start", detailsExam);
  console.log("standard=", props.standard);
  const maxTime=detailsExam.duration*60; //in seconds
  const [remainingTime, setRemainingTime] = useState(maxTime);
  //function to calculate remaining time
  const handleTimerTick = useCallback(() => {
    if (remainingTime > 0) {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 1);
    } else {
      // Disable option selection and prevent submission
      alert("Exam time is over!");
    }
  }, [remainingTime]);

  useEffect(() => {
    const timerInterval = setInterval(handleTimerTick, 1000);
    return () => clearInterval(timerInterval);
  }, [remainingTime]);


    // Handle user's response to a question
    const handleResponse = (selectedOption) => {
      const updatedResponses = [...userResponses];
      console.log("this is updated response",updatedResponses)
      updatedResponses[currentQuestionIndex] = selectedOption;
      setUserResponses(updatedResponses);
    };
  
  // Check if questions and currentQuestionIndex are not null before accessing properties
  const currentQuestion = ques && ques.questions && ques.questions[currentQuestionIndex];
  console.log("current question", currentQuestion);
  
  // Calculate total marks based on user responses and correct answers
  const calculateMarks = () => {
    console.log("total number of questions ",ques.questions.length)
    setNumOfQues(ques.questions.length);
    console.log("userResponses.length",userResponses.length)
    setAttempt(userResponses.length)
    console.log("markss",marks)
    //markss will calculate number&marks will store total number
    ques.questions &&
  ques.questions.forEach((question, index) => {
    if (question.answer === userResponses[index]) {
      setMarks((prevMarks) => prevMarks + 5);
      console.log("marks",marks)
    }
  
  });
  console.log("attempted",attempt)
  };
  
  useEffect(() => {
    if (currentQuestion) {
      const newShuffledArray = shuffleArray([currentQuestion.opt1, currentQuestion.opt2, currentQuestion.opt3, currentQuestion.opt4]);
      setShuffledArray(newShuffledArray);
    }
  }, [currentQuestion]);
const exam = {
  background:"linear-gradient(#fffdd0,#F0EAD6)",
  height:"100vh",
  padding:"50px",


};
  return (
    <div>
      <header className="exam-header" style={exam}>
        {currentQuestion && currentQuestionIndex <= ques.questions.length - 1  ? (
          <div>
              <Timer maxTime={maxTime} remainingTime={remainingTime} /> 
              <h3>Question {currentQuestionIndex + 1}:</h3><h6>Level:{determineLevel(currentQuestion.level)}</h6>
            <br></br><p style={{fontSize:"22px"}}>{currentQuestion.question}</p>
            <ol>
              <li style={{fontSize:"20px"}}> <label>
                  <input
                    className="check"
                    type="radio"
                    value={shuffledArray[0]}
                    checked={userResponses[currentQuestionIndex] ===shuffledArray[0] }
                    onChange={() => handleResponse(shuffledArray[0])}
                  />
                  {shuffledArray[0]}
                </label></li>
              <li style={{fontSize:"20px"}}><label>
                  <input
                  className="check"
                    type="radio"
                    value={shuffledArray[1]}
                    checked={userResponses[currentQuestionIndex] === shuffledArray[1]}
                    onChange={() => handleResponse(shuffledArray[1])}
                  />
                  {shuffledArray[1]}
                </label></li>
              <li style={{fontSize:"20px"}}> <label>
                  <input
                  className="check"
                    type="radio"
                    value={shuffledArray[2]}
                    checked={userResponses[currentQuestionIndex] === shuffledArray[2]}
                    onChange={() => handleResponse(shuffledArray[2])}
                  />
                  {shuffledArray[2]}
                </label></li>
              <li style={{fontSize:"20px"}}> <label>
                  <input
                  className="check"
                    type="radio"
                    value={shuffledArray[3]}
                    checked={userResponses[currentQuestionIndex] === shuffledArray[3]}
                    onChange={() => handleResponse(shuffledArray[3])}
                  />
                  {shuffledArray[3]}
                </label></li>
            </ol>
            {currentQuestionIndex>0&&<button className="button" onClick={() => setCurrentQuestionIndex(currentQuestionIndex -1)}>previous</button>}
            {currentQuestionIndex<ques.questions.length-1?<button className="button" onClick={() =>  setCurrentQuestionIndex(currentQuestionIndex + 1) }>Next</button>:<button className="button" onClick={()=>{ setCurrentQuestionIndex(currentQuestionIndex + 1); calculateMarks(); }}>Submit </button>}
          </div>
        ) : (
          <div>
           <Result   numOfQues={numOfQues} attempted={attempt} marks={marks}/>
          </div>
        )
        }
      </header>
    </div>
  );
  
}

export default ExamStart;