import React,{useState} from "react"
import EditExamForm from "./EditExamForm"
import DisplayExam from "./DisplayExams"


function ExamEntry(props){
    const exam=props.exam;
    const [editingExam,setEditingExam] = useState(null);


    return(<div >
        {editingExam&&editingExam._id===exam._id ?(<EditExamForm 
        editingExam={editingExam}
        updateDisplay={props.updateDisplay}
        setEditingExam={setEditingExam} />)
   :<DisplayExam   
     updateDisplay={props.updateDisplay}  
     setEditingExam={setEditingExam}
     exam={exam}
      /> }
      </div>)
  }
  
  export default ExamEntry;
