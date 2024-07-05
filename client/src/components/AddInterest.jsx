import React,{useState} from "react";
import axios from "axios";
function Addinterest(props){
   // console.log(props.id,"heheheh")
    const[newSubject,setNewSubject]=useState('')
    function handleChange(event){
        event.preventDefault();
        setNewSubject(event.target.value)
    }
    async function addNewInterest(event){
    event.preventDefault();
    if(newSubject.trim()===''){
        alert("subject name cant be empty")
        return;
       }
      try{
        console.log("subject adding",newSubject)
        await axios.put(`http://localhost:3001/addInterest/${props.id}`,{
            newSubject: [newSubject], // Send as an array
          });
        console.log("added succesfully")
        setNewSubject('')
        props.showForm(false)   
        props.updateDisplay();
      }
      catch(error){
        console.error(error)
      }
    }
    return(
        <div>
        <h1>Add New Subject</h1>
        <form>
        <label>
                <input type="text" name="interest" value={newSubject} placeholder="Enter Subject" onChange={handleChange}/>
            </label>
            <button onClick={addNewInterest}>Add</button>
            <button onClick={()=>props.showForm(false)}>Cancle</button>
            </form></div>
    )
}export default Addinterest;