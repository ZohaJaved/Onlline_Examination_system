import React,{useCallback,useState,useEffect} from "react";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";

function EditExamForm(props){
  const { id } = useParams(); // Get exam ID from URL
  const navigate = useNavigate(); // To navigate back to the previous page or exam list
  const [exam, setExam] = useState(null);
  const [editingExam,setEditingExam] = useState(null);
  

  useEffect(() => {
    async function fetchExamDetails() {
      try {
        const response = await axios.get(`http://localhost:3001/getExamDetails/${id}`);
        setEditingExam(response.data);
      } catch (error) {
        console.error("Failed to fetch exam details", error);
      }
    }
    fetchExamDetails();
  }, [id]);

    //fetching all questions of a "subject" to chck num of ques available
    const getQuestions = useCallback(async (subject) => {
      try {
        const response = await axios.get(`http://localhost:3001/QuestionsOfInterest/${subject}`);
        if (response.status === 204 || response.status === 404) {
          alert("No questions available");
          return 0; // Assuming 0 questions available in case of an empty response
        }
    
        const questions = response.data.questions;
        console.log("response from server", questions);
        console.log("mil gya no. of questions", questions.length);
        return questions.length; // Return the number of questions
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Error fetching questions. Please try again.");
        return 0; // Return 0 in case of an error
      }
    }, []);
    
    
    //function to post edited exam
    async function handleSaveClick(event) {
      event.preventDefault();
      const { paperName, paperCode, duration, maxMarks, passingMarks, numOfQues,standard } = editingExam;
    
      console.log("props.editingExam:", editingExam);
      console.log("ExamName:", paperName);
      console.log("examCode:", paperCode);
      console.log("duration:", duration);
      console.log("maxMarks:", maxMarks);
      console.log("passingMarks:", passingMarks);
      console.log("numOfQues:", numOfQues);
    
      if (
        !paperName || paperName.trim() === '' ||
        !standard || standard.trim() === '' ||
        !paperCode || paperCode.trim() === '' ||
        !duration || duration === null ||
        !maxMarks || maxMarks === null ||
        !passingMarks || passingMarks === null ||
        !numOfQues || numOfQues === null
      ) {
        alert("Please fill all the required fields");
        return;
      }
      //chk the num of ques avalable
      const numOfQuesAvailable= getQuestions(paperName);
    
      try {
        await axios.put(`http://localhost:3001/updateExam/${id}`, editingExam);
        console.log("updated successfully");
        setEditingExam(null);
        navigate(`/examDetails/${id}`)
      } catch (error) {
        console.error(error);
      }
      // props.updateDisplay();
    }
    
    
   
    function handleInputChange(e){
        console.log("handleInputChange")
        e.preventDefault();
        const { name, value } = e.target;
        console.log("handleInputChange")
        
        setEditingExam(prevExam => {return{ ...prevExam, [name]: value }});
        
      };

      if(!editingExam){
        return(<h1>Loading..</h1>)
      }
  
      return (
        <div>
          <form>
            <table>
                <tr>
                  <th>Paper Name</th>
                  <td>
                    <input
                      className="input"
                      name="paperName"
                      value={editingExam.paperName}
                      onChange={handleInputChange}
                    /> 
                  </td>
                </tr>
                <tr>
                  <th>Paper Code</th>
                  <td>
                      <input
                        className="input"
                        name="paperCode"
                        value={editingExam.paperCode}
                        onChange={handleInputChange}
                      />
                    </td>
                </tr>
                <tr>
                  <th>Duration (in Minutes)</th>
                  <td>
                    <input
                      className="input"
                      name="duration"
                      value={editingExam.duration}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                <th>Maximum Marks</th>
                <td>
                    <input
                      className="input"
                      name="maxMarks"
                      value={editingExam.maxMarks}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                <th>Passing Marks</th>
                <td>
                    <input
                      className="input"
                      name="passingMarks"
                      value={editingExam.passingMarks}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                <th>Total Number of Questions</th>
                <td>
                    <input
                      className="input"
                      name="numOfQues"
                      value={editingExam.numOfQues}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                  <tr>
                  <th>Standard</th>
                  <td>
                    <select
                      className="input"
                      name="standard"
                      value={editingExam.standard}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>Select Standard</option>
                      <option value="MCA">MCA</option>
                      <option value="BCA">BCA</option>
                      <option value="PGDCA">PGDCA</option>
                    </select>
                  </td>
                  </tr>
                  
                 
                <tr>
                  <td>
                    <button onClick={handleSaveClick} className="button">Update</button>
                  </td>
                  <td>
                    <button onClick={() => navigate(`/examDetails/${id}`)} className="button">
                      Cancel
                    </button>
                  </td>
                </tr>
            </table>
          </form>
        </div>
      );
    }
    
    export default EditExamForm;