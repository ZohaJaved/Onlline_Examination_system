import React,{useEffect,useState} from "react";
import axios from "axios";
import "./EnterExamAdmin.css"

function EnterExamAdmin(props){

    const [subjectList,setSubjectList]=useState()
    const [exam, setExam] = useState({
      paperName: "",
      paperCode: null,
      duration: null,
      maxMarks: "",
      passingMarks: null,
      createdAt: null,
      updatedAt: null,
      numOfQues: null,
      standard: "",
    });

    //get the list of subjects
    async function getSubjects() {
      const response = await axios.get("http://localhost:3001/subjectsList");
      console.log(response.data);
      setSubjectList(response.data);
    }
    // Get the list of subjects when the component mounts
    useEffect(() => {
      getSubjects();
    }, []);

    function handleChange(event) {
      const { name, value } = event.target;
      setExam((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    }

    // To post Exams to the database 
  async function postExam(event) {
    event.preventDefault();
    console.log(exam);
    if (
      !exam ||
      exam.paperName.trim() === "" ||
      exam.paperCode.trim() === "" ||
      exam.duration === null ||
      exam.maxMarks === null ||
      exam.passingMarks === null ||
      exam.standard === "" ||
      exam.numOfQues === null
    ) {
      // Handle the case where properties are null or undefined
      console.error("Some properties are null or undefined.");
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/addExam", {
        paperName: exam.paperName,
        paperCode: exam.paperCode,
        duration: exam.duration,
        maxMarks: exam.maxMarks,
        passingMarks: exam.passingMarks,
        numOfQues: exam.numOfQues,
        standard: exam.standard,
      });
      if (response.status === 200) {
        console.log("saved successful");
        // setShowForm(false);
        setExam({
          paperName: "",
          paperCode: null,
          duration: null,
          maxMarks: "",
          passingMarks: null,
          standard: "",
          numOfQues: null,
        });
        // getExams();
      }
    } catch (error) {
      if (error.response.status === 400) {
        alert("enter answer 1-4");
      }
      console.error("unable to save", error);
    }
  }

    return(<div className="form-container">
        <h1 className="form-title">Schedule New Exam</h1>
        <form className="exam-form">
          <label className="form-label">
            Paper Code:
            <input
              className="form-input"
              name="paperCode"
              type="text"
              placeholder="Enter Paper Code"
              value={exam.paperCode}
              onChange={handleChange}
            />
          </label>
          <label className="form-label">
            Paper Name:
            <select
              className="form-input"
              id="paperName"
              name="paperName"
              value={exam.paperName}
              onChange={handleChange}
            >
              <option value="" disabled>Select</option>
              {subjectList && subjectList.map((subject, index) => (
                <option key={index} value={subject}>{subject}</option>
              ))}
            </select>
          </label>
          <label className="form-label">
            Maximum Marks:
            <input
              className="form-input"
              name="maxMarks"
              type="text"
              placeholder="Enter Maximum Marks"
              value={exam.maxMarks}
              onChange={handleChange}
            />
          </label>
          <label className="form-label">
            Pass Marks:
            <input
              className="form-input"
              name="passingMarks"
              type="text"
              placeholder="Enter Passing Score Marks"
              value={exam.passingMarks}
              onChange={handleChange}
            />
          </label>
          <label className="form-label">
            Total Number of Questions:
            <input
              className="form-input"
              name="numOfQues"
              type="text"
              placeholder="Enter Number of Questions"
              value={exam.numOfQues}
              onChange={handleChange}
            />
          </label>
          <label className="form-label">
            Standard:
            <select
              className="form-input"
              id="standard"
              name="standard"
              value={exam.standard}
              onChange={handleChange}
            >
              <option value="" disabled>Select</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="PGDCA">PGDCA</option>
            </select>
          </label>
          <label className="form-label">
            Duration (in minutes):
            <input
              className="form-input"
              name="duration"
              type="text"
              placeholder="Enter Duration in Minutes"
              value={exam.duration}
              onChange={handleChange}
            />
          </label>
          <div className="form-buttons">
            <button 
              onClick={postExam} 
              className="action-button"
              style={{width:'30%' ,marginRight:'10px'}}
              >
                Add
              </button>
            <button
              type="reset"
              onClick={() => setExam({})}
              className="action-button"
              style={{width:'30%' ,marginRight:'10px'}}
            >
              Reset
            </button>
            <button
              onClick={() => props.setShowForm(false)}
              className="action-button"
              style={{width:'30%' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>)
}
export default EnterExamAdmin