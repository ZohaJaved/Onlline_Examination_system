/* eslint-disable no-unused-vars */
import axios from "axios"
import React,{useContext} from "react";
import { AbortedDeferredError, useNavigate } from 'react-router-dom';
import NoteContext from "../context/notes/NoteContext";
import backgroundImage from "./pics/exam.png"
//import logo from './pics/home.png';


function Login(){
  const loginContext=useContext(NoteContext)
  const navigate=useNavigate();
   const [invalidCredentials,setInvalid]=React.useState("")

    function handleInput(event){
      console.log(event);
      const {name,value}=event.target;
      loginContext.setUserDetail(prevValue=>({...prevValue,[name]:value}))
    }

    async function updateLogin(id){
   
     try{
       
       await axios.put(`http://localhost:3001/updateLogin/${id}`,true);
       console.log("updated succesfully")
       
   
     }
     catch(error){
       console.error(error)
     }
 
    }
     


  //going to define postdata to authentivate login
  async function postData(event){
    
    console.log("come to lgim")
    event.preventDefault();
    if(loginContext.user.userName.trim()=== ''||loginContext.user.password.trim()=== ''){
      setInvalid("Username and password cannot be empty")
    }
    else{
  try{
    console.log(loginContext.user.userType)
    const response=await axios.post("http://localhost:3001/login",{userName:loginContext.user.userName,password:loginContext.user.password,userType:loginContext.user.userType})
if (response.status === 200) {
  const id = response.data.idd;  
  console.log("Received ID:", id);
  //window.localStorage.setItem("isLoggedIn",true)
  //window.localStorage.setItem("id",id)
  // Update loginContext with the received id
    loginContext.setUserDetail((prevValue) => {
      return {
        ...prevValue,
        idd: id,
        login: true,
      };
    });


  console.log(loginContext.user)
  
}

    if(loginContext.user.userType==="admin"){
     
    navigate("/AdminHome")}
    else if(loginContext.user.userType==="student"){
      navigate("/StudentHome")
      loginContext.getStudentDetail();
    }
    else{
    navigate("/TeacherHome")
  }
}
  
   catch (error) {
    console.error("error during login", error);
    setInvalid("Login Failed, check username and password");
}
}
}
const containerStyle = {
  backgroundImage:`url(${backgroundImage})`, 
    backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '35vh', // Adjust this based on your layout
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  imageRendering: 'optimizeQuality',
  color: 'black', // Adjust text color based on your image
};
  return (
    <div className="container" style={containerStyle}>
    <form method="POST" className="form" id="log-in">
      <h1>{loginContext.user.userType} Log In</h1>
      <label>
        Username :
        <input className="input" style={{marginLeft:'4px'}} type="text" name="userName" value={loginContext.user.userName} onChange={handleInput} placeholder="Enter username" />
      </label>
      <br />
      <label>
        Password : 
        <input className="input" style={{marginLeft:'8px'}} type="password" name="password" value={loginContext.user.password} onChange={handleInput} placeholder="Enter Password" />
      </label>
      <br />
      <button className="submit" onClick={async (event) => {
  await postData(event);
}}>LogIn</button>

      <p>{invalidCredentials}</p>
    </form>
  </div>
  )  
}

export default Login;
