import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 import  './SubjectsStudent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBook } from '@fortawesome/free-solid-svg-icons';

function Subjects(props) {
  const [subjects, setSubjects] = useState(null);
  const navigate = useNavigate();
  console.log("props.class", props.class);
  
  // Fetch subjects based on the class
  const getSubjects = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:3001/subOfClass/${props.class}`
    );
    setSubjects(response.data.subjects);
  }, [props.class]);

  useEffect(() => {
    getSubjects();
  }, [getSubjects]);

  return (
    <div className="subjects-container " style={{marginTop:"0"}}>
      {" "}
      {subjects && subjects.length > 0 ? (
        <div>
        <h1 className="mb-2 text-black">List of Exams</h1>
        <div className="subjects-list">
          {" "}
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="subject-card"
              onClick={() => navigate(`/exam/${subject}`)}
            >
              {" "}
              <FontAwesomeIcon icon={faBook} className="subject-icon" color="black" />
              <h4>{subject}</h4>{" "}
            </div>
          ))}{" "}
        </div>
        </div>
      ) : (
        <h1>No Exams are Scheduled yet</h1>
      )}{" "}
    </div>
  );
}

export default Subjects;
