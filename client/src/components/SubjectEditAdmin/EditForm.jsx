import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";

function EditForm(props) {
  const { id } = useParams();
  const navigate=useNavigate();
  const [editingSubject, setEditingSubject] = useState(null);

  // Define the getSubjects() function outside of the useEffect() hook
  async function getSubjects() {
    const response = await axios.get(
      `http://localhost:3001/getsubjectDetails/${id}`
    );
    console.log(response.data);
    setEditingSubject(response.data);
  }

  // Get the list of subjects when the component mounts
  useEffect(() => {
    getSubjects();
  }, []);

  async function handleSaveClick(event){
    event.preventDefault();
    console.log("editingSubject",editingSubject)
    if(editingSubject.subjectName.trim()===''){
     alert("subjectName and its type cannot be empty")
     return;
    }
   try{
     const id=editingSubject._id
     await axios.put(`http://localhost:3001/update/${id}`,editingSubject);
     alert("updated succesfully")
     navigate('/AdminHome')
     setEditingSubject(null)
    
 
   }
   catch(error){
     console.error(error)
   }

  }

  function handleInputChange(e) {
    console.log("handleInputChange");
    e.preventDefault();
    const { name, value } = e.target;
    console.log("handleInputChange");

    props.setEditingSubject((prevSubject) => {
      return { ...prevSubject, [name]: value };
    });
  }

  if (!editingSubject) {
    return <h1>Loading..</h1>;
  }
  return (
    <div>
      <form>
        <label for="sub-name">
          Subject Name
          <input
            id="sub-name"
            name="subjectName"
            value={editingSubject.subjectName}
            onChange={handleInputChange}
          />
        </label>
        <label for="sub-code">Subject Name</label>
        <input
          id="sub-code"
          name="subjectCode"
          onChange={handleInputChange}
          value={editingSubject.subjectCode}
        />
        <label for="sub-type">Subject Type</label>
        <select
          id="sub-type"
          name="subjecType"
          onChange={handleInputChange}
          value={editingSubject.subjectType}
        >
          <option value="Academic">Academic</option>
          <option value="Optional">Optional</option>
        </select>
        <label for="courses">Select Courses:</label>{" "}
        <select id="courses" name="courses" multiple>
          {" "}
          <option value="course1">MCA</option>{" "}
          <option value="course2">BCA</option>{" "}
          <option value="course3">PGDCA</option>{" "}
        </select>
        <button onClick={handleSaveClick} className="button">
          Update
        </button>
        <button
          onClick={() => navigate('/AdminHome')}
          className="button"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
export default EditForm;
