import React,{useState,useContext} from "react";
import NoteContext from "../context/notes/NoteContext";
import axios from "axios";

 function EditQuestion(props){
    const addQues=useContext(NoteContext)
    const{level,question,opt1,opt2,opt3,opt4,answer,subject,standard}=props.collection;
    const [editQuestion,setEditingQuestion]=useState(null);
  

    async function deleteQuestion(id) {
      const shouldDelete = window.confirm("Are you sure you want to delete this question?");
    
      if (!shouldDelete) {
        return;
      }
    
      try {
        const response = await axios.post("http://localhost:3001/delQuestion", { id: id });
    
        if (response.status === 200) {
          console.log("question deleted from db");
          addQues.getQuestions();
          props.updateDisplay();
        }
      } catch (error) {
        console.error("error during deletion", error);
      }
    }
      
      
    function handleInputChange(e){
        e.preventDefault();
        const { name, value } = e.target;
        console.log("handleInputChange")
      setEditingQuestion(prevSubject => {return{ ...prevSubject, [name]: value }});
        
    }
    //update database
    async function updateClick(event){
    event.preventDefault();
    if(editQuestion.level.trim()===''||editQuestion.question.trim()===''||editQuestion.opt1.trim()===''||editQuestion.opt2.trim()===''||editQuestion.opt3.trim()===''||editQuestion.opt4.trim()===''||editQuestion.answer.trim() === ''||editQuestion.subject.trim()===''){
        alert("please enter all the field")
        return;
       }
        try{
      const id=editQuestion._id
      await axios.put(`http://localhost:3001/updateQuestion/${id}`,editQuestion);
      console.log("updated succesfully")
      setEditingQuestion(null)
      addQues.getQuestions();
  
    }
    catch(error){
        console.error(error)
      }
    }
    return(<div>
        {editQuestion&&editQuestion._id===props.collection._id?(<div>
            <form style={{padding:"10px"}}>
            <table>
       <tr>
       <th >Level</th>
       <td>
       <select className="input" style={{width:"350px"}} name="level" value={editQuestion.level} onChange={handleInputChange}>
       <option >select</option>
       <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
       </select>
      </td>
       </tr>
         <tr>
         <th >Question</th>
         <td>
        <input 
        className="input"
        style={{width:"350px"}}
          name="question"
          value={editQuestion.question}
         onChange={handleInputChange}
        />
      </td>
         </tr>
         <tr>
         <th >Option 1</th>
         <td>
        <input 
         style={{width:"350px"}}
        className="input"
          name="opt1"
          value={editQuestion.opt1}
         onChange={handleInputChange}
        />
      </td>
         </tr>
         <tr>
         <th >Option 2</th>
         <td>
        <input 
        className="input"
        style={{width:"350px"}}
          name="opt2"
          value={editQuestion.opt2}
         onChange={handleInputChange}
        />
      </td>
         </tr>
         <tr>
         <th >Option 3</th>
         <td>
        <input 
        className="input"
        style={{width:"350px"}}
          name="opt3"
          value={editQuestion.opt3}
         onChange={handleInputChange} />
      </td>
         </tr>
         <tr>
         <th >Option 4</th>
         <td>
        <input 
        className="input"
        style={{width:"350px"}}
          name="opt4"
          value={editQuestion.opt4}
         onChange={handleInputChange}
        />
      </td>
         </tr>
         <tr>
         <th >Answer</th>
         <td>
        <input 
        className="input"
          name="answer"
          style={{width:"350px"}}
          value={editQuestion.answer}
         onChange={handleInputChange}
        />
      </td>
         </tr>
         <tr>
         <th >Subject</th>
         <td>
        <input 
        className="input"
        style={{width:"350px"}}
          name="subject"
          value={editQuestion.subject}
         onChange={handleInputChange}
        />
      </td>
         </tr>
       <tr>
          <td colSpan={2}>
          <button className="button" onClick={updateClick}>Update</button>
          <button className="button" onClick={()=>{setEditingQuestion(null)}}>cancel</button>
          </td>
       </tr>
  
    
  </table>
 </form>
        </div>):(<div>
         <table>
       `<tr>
         <th>Level</th>
         <td>{level}</td>
        </tr>
        <tr>
          <th>Question</th>
          <td>{question}</td>
        </tr>
         <tr>
          <th>Option 1</th>
          <td>{opt1}</td>
         </tr>
         <tr>
          <th>Option 2</th>
          <td>{opt2}</td>
         </tr>
         <tr>
          <th>Option 3</th>
          <td>{opt3}</td>
         </tr>
         <tr>
          <th>Option 4</th>
          <td>{opt4}</td>
         </tr>
        <tr>
          <th>Answer</th>
          <td>{answer}</td>
        </tr>
        <tr>
          <th>Subject</th>
          <td>{subject}</td>
        </tr>
         <tr>
          <th>Standard</th>
          <td>{standard}</td>
         </tr>
         
       
   <tr>
    <td colSpan={2}>
    <button className="button" onClick={()=>{setEditingQuestion(props.collection); addQues.getQuestions()}}>Modify</button>
       <button className="button" onClick={()=>{deleteQuestion(props.collection._id)}}> Delete</button>
       <button className="button" onClick={()=>{props.setShowDetail(null)}}>close</button>
    </td>
       
     </tr>
     </table>
    </div>)}
    </div>)
 }
 export default EditQuestion;