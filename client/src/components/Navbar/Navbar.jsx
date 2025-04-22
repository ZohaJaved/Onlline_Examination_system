import React,{useContext} from "react";
import NoteContext from "../../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"

function Navbar(props) {
  const loginContext = useContext(NoteContext);
  const navigate=useNavigate();

  const gapStyle = {
    display: 'flex',
    gap: window.innerWidth <= 480 ? '1px' : window.innerWidth <= 768 ? '2px' : '22px',
    flexWrap: 'nowrap', // Prevent wrapping of links
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      backgroundColor: '#554444',
      // borderBottom: '1px solid #33353F',
      width: '100%',
      height: '100px', // Fixed height for desktop view
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin:'0',
      marginBottom:'5px'
    }}>
      <div style={{
        margin:'0 20px',
        // marginBottom:'15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // maxWidth: '1200px',
        padding: '0 8px',
        width: '100%',
      }}>
        <div style={{ flexShrink: 0, justifyContent:'center', alignItems:'center'}}>
          <h1 style={{
            fontSize: '1.5rem', // Default font size
            // fontWeight: '600',
            color: 'white',
            whiteSpace: 'nowrap',
          }}>
            Examination System
          </h1>
        </div>
        {props.showLoginType && <div style={gapStyle}>
          {['Student', 'Teacher', 'Admin'].map((userType) => (
            <a
              key={userType}
              style={{
                color: loginContext.user.userType === userType ? '#e5f0f7' : '#FFFFFF',
                textDecoration: 'none',
                position: 'relative',
                cursor:'pointer',
                // fontSize: '1rem', // Default link font size
                // padding: '0.2rem', // Padding for better touch targets
              }}
              onMouseOver={(e) => {
                e.target.style.color = '#e5f0f7'; // Change color on hover
              }}
              onMouseOut={(e) => {
                e.target.style.color = loginContext.user.userType === userType ? '#e5f0f7' : '#FFFFFF';
              }}
              onClick={() => {
                loginContext.setUserDetail((prevValue) => ({
                  ...prevValue,
                  userType: userType,
                }));
              }}
            >
              {userType}
              {loginContext.user.userType === userType && (
                <span style={{
                  position: 'absolute',
                  bottom: '-5px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  height: '2px',
                  width: '100%',
                  backgroundColor: '#e5f0f7',
                }} />
              )}
            </a>
          ))}
        </div>}
        {props.showLogout && (
          <button
            style={{
              // backgroundColor: "#e5f0f7",
              color: 'white',
              border: "none",
              padding: "8px 8px",
              cursor: "pointer",
              fontSize: "1rem",
              borderRadius: "4px",
              marginRight: '-85px',
            }}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              navigate('/')
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
export default Navbar;  