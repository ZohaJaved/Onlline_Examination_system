import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import NoteContext from "../context/notes/NoteContext";
import backgroundImage from "../pics/exam.png"
function Home() {
  const loginContext = useContext(NoteContext);
  const navigate = useNavigate();

  function handleClick(userType) {
    loginContext.setUserDetail((prevValue) => ({
      ...prevValue,
      userType,
    }));

    navigate("/login");
  }

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginTop:'5px',
    backgroundRepeat: 'no-repeat',
    height: '100vh', 
    display: 'flex',
    flexDirection: 'row',
    gap:'8px',
    fontSize:'20px',
    alignItems: 'center',
    justifyContent: 'center',
    imageRendering: 'optimizeQuality',
    color: 'white', // Adjust text color based on your image
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  };

  return (
    <div style={containerStyle} >
      <button className="button" id="admin" name="userType" value={loginContext.user.userType} onClick={() => handleClick("Admin")}>
        Admin
      </button>
      <button className="button" id="teacher" name="userType" value={loginContext.user.userType} onClick={() => handleClick("Teacher")}>
        Teacher
      </button>
      <button className="button" id="student" name="userType" value={loginContext.user.userType} onClick={() => handleClick("Student")}>
        Student
      </button>
    </div>
  );
}

export default Home;
