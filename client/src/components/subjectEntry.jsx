import React,{useState} from "react";
import axios from "axios";
import EditForm from "./SubjectEditAdmin/EditForm";
import DisplayView from "./SubjectListAdmin/SubjectList"

function SubjectEntry(props){
  const subject=props.subject;
  
  //editiSubject is for currently editing subject
  const [editingSubject,setEditingSubject] = useState(null);

async function deleteSubject(id){
  //confirm before deleting
  const shouldDelete = window.confirm("Are you sure you want to delete this question?");
    
      if (!shouldDelete) {
        return;
      }
  
  try{
    const response=await axios.post("http://localhost:3001/delSubject",{id:id})
    if (response.status===200){
      console.log("subject deletec from db")

      props.updateDisplay();
    }
   }
   catch(error){
   console.error("error during deletion",error)
   }
  }

   async function handleSaveClick(event){
     event.preventDefault();
     if(editingSubject.subjectName.trim()===''||editingSubject.subjectType.trim()===''){
      alert("subjectName and its type cannot be empty")
      return;
     }
    try{
      const id=editingSubject._id
      await axios.put(`http://localhost:3001/update/${id}`,editingSubject);
      console.log("updated succesfully")
      setEditingSubject(null)
      props.updateDisplay();
  
    }
    catch(error){
      console.error(error)
    }

   }
   
   

    return(<div >
      {editingSubject&&editingSubject._id===subject._id ?(<EditForm 
      saveClick={handleSaveClick}
      subjectName={editingSubject.subjectName}
      subjectCode={editingSubject.subjectCode}
      subjectType={editingSubject.subjectType}
      setEditingSubject={setEditingSubject} />)
 :<DisplayView 
   subjectName={subject.subjectName}
   subjectCode={subject.subjectCode}
   subjectType={subject.subjectType}
   setEditingSubject={setEditingSubject}
   subject={subject}
   deleteSubject={deleteSubject} /> }
    </div>)
}

export default SubjectEntry;