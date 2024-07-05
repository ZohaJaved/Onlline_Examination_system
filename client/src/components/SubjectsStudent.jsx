import React,{useState,useCallback,useEffect} from "react";
import axios from "axios";
import ExamOfSub from "../components/ExamOfSub"
function Subjects(props){
    const[showExamDetail,setShowExamDetails]=useState(null);
    const [subjects,setSubjects]=useState(null);
    console.log("Class of Student",props.class)
    
    //fetching subjects in class
    const getSubjects = useCallback(async () => {
      const response = await axios.get(`http://localhost:3001/subOfClass/${props.class}`);
      console.log(response.data);
      setSubjects(response.data.subjects);
    }, [props.class]);
    
    useEffect(() => {
      getSubjects();
    }, [getSubjects]);
    console.log(".....",subjects)
    return(<div>
      {subjects && subjects.length > 0 ? (
      <div>
        {showExamDetail?<ExamOfSub subject={showExamDetail} setExamStart={props.setExamStart} />:(
      subjects.map((subject, index) => (
        <div key={index} className="sub">
          <div onClick={() => setShowExamDetails(subject)}>
            <h4>{subject}</h4>
          </div>
        </div>
      ))
    )}
      </div>
    ) : (
      <h1>No Exams</h1>
    )}
    
                </div>)
}
export default Subjects;