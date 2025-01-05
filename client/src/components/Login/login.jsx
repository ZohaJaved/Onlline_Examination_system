/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AbortedDeferredError, useNavigate } from "react-router-dom";
import NoteContext from "../../context/notes/NoteContext";
import backgroundImage from "../../pics/exam.png";
import Navbar from "../Navbar/Navbar";
import "./login.css";
//import logo from '.../pics/home.png';

function Login() {
  const loginContext = useContext(NoteContext);
  const navigate = useNavigate();
  //useState for login
  const [user, setUserDetail] = React.useState({
    email: "",
    password: "",
    userType: "",
    idd: null,
    login: false,
  });
  const [errors, setErrors] = useState({});
  const [invalidCredentials, setInvalid] = React.useState("");

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 478);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(()=>{
    setErrors((err)=>({
      ...err,email:''
    }))
  },[user.email])

  useEffect(()=>{
    setErrors((err)=>({
      ...err,password:''
    }))
  },[user.password])

  function handleInput(event) {
    console.log(event);
    const { name, value } = event.target;
    setUserDetail((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  }

  async function updateLogin(id) {
    try {
      await axios.put(`http://localhost:3001/updateLogin/${id}`, true);
      console.log("updated succesfully");
    } catch (error) {
      console.error(error);
    }
  }

  const validateInput = () => {
    let validated;
    const newErrors={};
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "enter valid emails";
      validated=false;
    }
    if (user.password.length < 8) {
      newErrors.password = "password should be minimum of 8 characters";
      // setPassword("");
    } 
    if (/\S+@\S+\.\S+/.test(user.email) && user.password.length >= 8) {
      validated=true;
    } 
    setErrors(newErrors)
    return validated;
  };

  const postData = async (event) => {
    event.preventDefault();
    const newError = {};
    if (!user.email || !user.password ) console.log("All fields are required",user.email,user.email.password);
    if (user.email && user.password && validateInput()) {
      console.log("validated")
      try {
        const response = await axios.post("http://localhost:3001/login", {
          email:user.email,
          password:user.password,
          role:loginContext.user.userType,
        });
        if (response.status === 200) {
          // Store user information in local storage
          console.log("id", JSON.stringify(response.data.id));
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.token);
          console.log("userType", loginContext.user.userType);
          if(loginContext.user.userType==='Student')
            navigate('/StudentHome')
          else if(loginContext.user.userType==='Admin')
            navigate('/AdminHome')
          else if(loginContext.user.userType==='Teacher')
            navigate('TeacherHome')
        }
      } catch (error) {
        console.log(error.response.status);
        if (error.response && error.response.status === 401) {
          newError.password = "Password mismatch";
        } else if (error.response && error.response.status === 404) {
          newError.userNotFound = `No user found in ${loginContext.user.userType} database`;
        } else if (error.response && error.response.status === 500) {
          alert("Internal server error,please try again letter");
        }
        console.log(newError);
        setErrors(newError);
      }
    }
  };

  // Log the updated state
  useEffect(() => {
    console.log("Updated loginContext.user:", user);
  }, [user]);
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "35vh", // Adjust this based on your layout
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    imageRendering: "optimizeQuality",
    color: "black", // Adjust text color based on your image
  };

  return (
    <div className="flex">
      {" "}
      <Navbar showLoginType={true} />{" "}
      <div className="flex-container">
        {" "}
        {!isSmallScreen && (
          <div
            className="flex-item background-image"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundColor: "white",
            }}
          >
            {" "}
            {/* Empty div for the background image */}{" "}
          </div>
        )}{" "}
        <div className="flex-item login-form-container">
          {" "}
          <form
            method="POST"
            className="rounded border-2 border-[#555858] z-10 m-5"
          >
            {" "}
            <div className="form-header">
              {" "}
              <h1 className="text-[#1f2020] md:text-xl flex justify-center align-middle">
                {" "}
                {loginContext.user.userType} Log In{" "}
              </h1>{" "}
            </div>{" "}
            <label style={{display:'grid'}}>
              {" "}
              Email :{" "}
              <input
                className="input"
                type="text"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Enter Email"
              />{" "}
            </label>{" "}
            {errors.email && <span className="error">{errors.email}</span>}{" "}
            <br />{" "}
            <label style={{display:'grid'}}>
              {" "}
              Password :{" "}
              <input
                className="input"
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Enter Password"
              />{" "}
            </label>{" "}
            {errors.password && <span className="error">{errors.password}</span>}{" "}
            <br />{" "}
            <button
              className="submit bg-black"
              onClick={async (event) => {
                await postData(event);
              }}
            >
              {" "}
              LogIn{" "}
            </button>{" "}
            <p className="text-red-500 mt-2 !text-red-500">
              {" "}
              {errors.userNotFound && <span className="error">{errors.userNotFound}</span>}{" "}
            </p>{" "}
          </form>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Login;
