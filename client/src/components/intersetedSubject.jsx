import React from "react"

function InterestedSubject(props){
console.log("InterestedSubject",props.interestedSubject)

return(<div>
<table>
<thead>
  <tr>
    <th>Subject Name</th>
  </tr>
</thead>
<tbody>
 {props.interestedSubject.map((subject,index)=>(
    <tr key={index}>
      <td>{subject}</td>
      <button onClick={()=>{
        props.showQues(subject)
        props.setShowQuestion(true)
        props.setSubject(subject)}} >View all questions</button>
      </tr>
      ))}
    </tbody>
  </table>
  </div>)}
  export default InterestedSubject;