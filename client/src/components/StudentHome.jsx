import React,{useState,useContext,useCallback,useEffect} from "react";
import Subjects from "../components/SubjectsStudent"
import NoteContext from "../context/notes/NoteContext";
import ExamStart from "./ExamStart";
import axios from "axios";


function StudentHome(){
    const studentContext=useContext(NoteContext)
    const[studentDetail,setStudentDetail]=useState(null)
    const [activeTab,setActive]=React.useState();
    const [examStart,setExamStart]=useState(false)
    const id=studentContext.user.idd;
    console.log(id)
    const renderTabContent = () => {
        switch (activeTab) {
         case "subjects":
            return  <Subjects class={studentDetail.class} id={id} setExamStart={setExamStart}/>
          case "performance":
            return null  //<Performance/>
          default:
            return null;
        }}


       //fetching student Informations
       const getStudentDetail = useCallback(async () => {
        const response = await axios.get(`http://localhost:3001/studentDetails/${id}`);
        console.log(response.data);
        setStudentDetail(response.data);
      }, [id]);
      
      useEffect(() => {
        getStudentDetail();
      }, [getStudentDetail]);

       //render ExamStart when user click on start exam
       if(examStart){
        console.log("standard in StudentHome",studentDetail.standard)
        return(<ExamStart standard={studentDetail.class} />)
       }
       
     

        return(<div className="studentHome" style={{marginTop:"50px"}}>
          <center>
                <h1>{studentDetail && <h1>Welcome {studentDetail.studentName}</h1>}</h1>
    <div>
  <button
    onClick={() => setActive("subjects")}
    className={activeTab === "subjects" ? "selected" : ""}
    style={{ flex: 1, margin: '0.5rem', padding: '0.75rem', width: '350px', height:"60px", borderRadius:"15px" }}
  >
    Subjects and Courses
  </button>
  <button
    onClick={() => setActive("performance")}
    className={activeTab === "performance" ? "selected" : ""}
    style={{ flex: 1, margin: '0.5rem', padding: '0.75rem', width: '350px', height:"60px", borderRadius:"15px" }}
  >
    Performance And Grading
  </button>
</div>  
  <div>
  {renderTabContent()}
  </div> </center></div>)
}
export default StudentHome;