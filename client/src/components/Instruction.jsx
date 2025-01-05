import React from "react"

function Instruction(props){
    const list = {
        textAlign:"left",
        marginLeft:""
    };
    return(
        <div className="mb-3">
      <h2 id="exam-format">Exam Instruction:</h2>
        <ul style={list}>
            <li>You will be asked {props.numOfQues} questions one after another.</li>
            <li>5 points is awarded for the correct answer.</li>
            <li>Each question has four options. You can choose only one options.</li>
            <li>You can review and change answers before the quiz finish.</li>
            <li>The result will be declared at the end of the exam.</li>
        </ul>
    </div>)
}export default Instruction