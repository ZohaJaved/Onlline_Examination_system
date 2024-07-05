import React,{useState} from "react";
//import axios from "axios";
import DisplayView from "./DisplayView"

function QuestionEntry(props){
    const question=props.question;
    return(<div><table>
        <tbody>
          <tr>
            <td>{props.questionName}</td>
            <td>{props.subject}</td>
          </tr>
        </tbody>
      </table></div>)
}export default QuestionEntry;