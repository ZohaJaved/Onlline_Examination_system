import React,{useState,useEffect} from "react";
import NoteContext from "./NoteContext";
import axios from "axios";
function NoteState(props){
    const [showForm, setShowForm] = useState(false);
    const initialState={
        level:"",
        question:"",
        opt1:"",
        opt2:"",
        opt3:"",
        opt4:"",
        answer:"",
        subject:"",
        standard:""
    }
    //useState for login
    const [user,setUserDetail]=React.useState({
      userName:"",password:"",userType:"",idd:null,login:false
     })
  
    
 const [details,setDetails]=useState(initialState)
 //function and state of DisplayQuestion.jsx
 //const [ques, setQues] = useState({
   // name: "",
   // subject: "",
 // });
  const [questions, setQuestions] = useState([]);
 
  //function to shuffle array
  function shuffleArray(array) {
    for (let i = 3; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
 


  async function getQuestions() {
    const response = await axios.get("http://localhost:3001/questions");
    console.log(response.data);
    setQuestions(response.data);
  
     
  }
  // Get the list of subjects when the component mounts
  useEffect(() => {
    getQuestions();
  }, []);

 
    return(<NoteContext.Provider value={{showForm,setShowForm,initialState,details,setDetails,questions,setQuestions,getQuestions,user,setUserDetail,shuffleArray}}>
    {props.children}
    </NoteContext.Provider>)
}export default NoteState;