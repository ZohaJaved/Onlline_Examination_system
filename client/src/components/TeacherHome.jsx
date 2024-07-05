import React, { useEffect,useState,useContext,useCallback } from "react";
import NoteContext from "../context/notes/NoteContext";
import Addinterest from "./AddInterest";
import InterestedSubject from "./intersetedSubject";
import QuestionsOfSub from "./QuestionsOFsub";
import Home from "./home";
import axios from "axios";
//import logo from './pics/home.png';
function TeacherHome(){
    const [enterQuestion,setEnterQuestion]=useState(false);
    const [showQuestions,setShowQuestion]=useState(false);
    const [quesDetails,setQuesDetails]=useState(null)
    const [quesArray,setQuesArray]=useState(null)
    const [sub,setSub]=useState();//
    const teacherContext=useContext(NoteContext)
    const[info,setInfo]=useState(null)
    //const id=teacherContext.user.idd;
    let id=window.localStorage.getItem("id")
      console.log("came to TeacherHome",id)

      const loginContext=useContext(NoteContext)
    
      
      //fetching all questions of a "subject"
      const getQuestions = useCallback(async (subject) => {
        try {
          const response = await axios.get(`http://localhost:3001/QuestionsOfInterest/${subject}`);
          if (response.status === 204 || response.status === 404) {
            alert("No questions available");
            return;
          }
        
    const questions = response.data.questions;
    console.log("response from server", questions);
    setQuesDetails(questions)
    // Extract the 'question' field from each question document
    const questionArray = questions.map((item) => item.question);
    console.log("questionArray", questionArray);
    setQuesArray(questionArray);

    console.log("mil gya questions", questionArray);
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
}, []);
      //fetching teacherInformations
      const getInfo = useCallback(async () => {
        const response = await axios.get(`http://localhost:3001/teachersInfo/${id}`);
        console.log(response.data);
        setInfo(response.data);
      }, [id]);
      
      useEffect(() => {
        getInfo();
      }, [getInfo]);
      


const interestedSubject = info?.interest || [];
console.log("interestedSubject",interestedSubject)
return (
  <div>
        <div>
        {info ? (<h1>Hello {info.title} {info.teacherName}</h1>) : null} 
        <div>{interestedSubject.length > 0 ? (
  showQuestions ? <QuestionsOfSub questions={quesDetails} quesArray={quesArray} show subject={sub} setQuestions={setQuesDetails} setShowQuestion={setShowQuestion} updateDisplay={getQuestions} setSub={setSub}/> :
  (<div> 
    <div><button onClick={()=>{setEnterQuestion(true)}}>add new subject</button>{enterQuestion?<Addinterest id={id} showForm={setEnterQuestion} updateDisplay={getInfo}/>:null}</div>
      <div> <InterestedSubject interestedSubject={interestedSubject} setShowQuestion={setShowQuestion} showQues={getQuestions} setSubject={setSub}/>
    </div>
    </div>)
) : (
  <h1>No Subjects</h1>
)}

          </div>
        </div>
     
    </div>
)}

export default TeacherHome;