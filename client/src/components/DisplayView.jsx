import React from "react";
function DisplayView(props){
    return(( <div>
        <table>
        <thead>
          <tr>
            <th>Name</th>
            
            <th>Code</th>
            
            <th>Type</th>
            
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.subjectName}</td>
              <td>{props.subjectCode}</td>
              <td>{props.subjectType}</td>
              <td><button onClick={()=>props.setEditingSubject(props.subject)}>Modify</button></td>
              <td><button onClick={()=>props.deleteSubject(props.subject._id)}>DELETE</button></td>
            </tr>
          </tbody>
        </table>
      </div>))}
export default DisplayView;