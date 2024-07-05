import React from "react";
function EditForm(props){


    function handleInputChange(e){
        console.log("handleInputChange")
        e.preventDefault();
        const { name, value } = e.target;
        console.log("handleInputChange")
        
        props.setEditingSubject(prevSubject => {return{ ...prevSubject, [name]: value }});
        
      };
    return(<div> 
        <form >
          <table>
        <tbody>
    <tr>
      <td>
        <input
          className="input"
          name="subjectName"
          value={props.subjectName}
         onChange={handleInputChange}
        />
      </td>
      <td>
        <input
          className="input"
          name="subjectCode"
          onChange={handleInputChange}
          value={props.subjectCode}
        />
      </td>
      <td>
        <select
          className="input"
          name="subjecType"
          onChange={handleInputChange}
          value={props.subjectType}
        >
          <option value="Academic">Academic</option>
          <option value="Optional">Optional</option>
        </select>
      </td>
      <td>
        <button onClick={props.saveClick} className="button">Update</button>
      </td>
      <td>
        <button onClick={()=>props.setEditingSubject(null)} className="button">Cancel</button>
      </td>
    </tr>
  </tbody>
  </table>
 </form></div> )
}
export default EditForm;