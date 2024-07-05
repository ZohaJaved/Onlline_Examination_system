import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
import encrypt from 'mongoose-encryption';
import cors from 'cors';

mongoose.connect('mongodb://127.0.0.1:27017/schoolDB', { useNewUrlParser: true });

const adminSchema = new mongoose.Schema({
  userName: { type: String, required: [true, "please enter username"] },
  password: { type: String, required: [true, "please enter password"] },
  log: { type: Boolean }
});

const secret = "adminPassword";
adminSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });
const Admin = mongoose.model("Admin", adminSchema);

const admins = new Admin({
  userName: "Zoha123",
  password: "zoha@123",
  log: false
});

//admins.save()

//for login logout
const loginSchema = new mongoose.Schema({
  faculty: { type: String, required: [false] },
  admin: { type: String, required: [false] },
  student: { type: String, required: [false] }
});

const LogIn = mongoose.model("LogIn", loginSchema);

const login = new LogIn({
  faculty: null,
  admin: null,
  student: null
});

//login.save();

//database for teachers
const teacherSchema = new mongoose.Schema({
  title: { type: String, required: [true] },
  name: { type: String, required: [true] },
  contact: { type: Number, required: [true] },
  email: { type: String, required: [true] },
  interest: { type: Array, required: [true] },
  userName: { type: String, required: [true, "please enter username"] },
  password: { type: String, required: [true, "please enter password"] }
});

const secretP = "teacherPassword";
teacherSchema.plugin(encrypt, { secret: secretP, encryptedFields: ["password"] });
const Teacher = mongoose.model("Teacher", teacherSchema);

const teachers = new Teacher({
  id: 202,
  title: "Mr",
  name: "Rajendra Kumar Panday",
  contact: 1112254666,
  email: "rkp123@gmail.com",
  interest: ["Operating system and linux", "Programming", "python"],
  userName: "Rajendra123",
  password: "rajendra@123"
});

//teachers.save();

//database for students
const studentSchema = new mongoose.Schema({
  name: { type: String, required: [true] },
  rollNum: { type: Number, required: [true] },
  email: { type: String, required: [true] },
  class: { type: String, required: [true] },
  userName: { type: String, required: [true, "please enter username"] },
  password: { type: String, required: [true, "please enter password"] }
});

const secretPassword = "studentPassword";
studentSchema.plugin(encrypt, { secret: secretPassword, encryptedFields: ["password"] });
const Student = mongoose.model("Student", studentSchema);

const students = new Student({
  name: "Abhishek",
  rollNum: 1,
  email: "abhishek02@gmail.com",
  class: "BCA",
  userName: "abhishek",
  password: "abhishek@123"
});

//students.save();

//going to create a collection for questions
const questionSchema = new mongoose.Schema({
  level: { type: String, required: [true] },
  question: { type: String, required: [true] },
  opt1: { type: String, required: [true] },
  opt2: { type: String, required: [true] },
  opt3: { type: String, required: [true] },
  opt4: { type: String, required: [true] },
  answer: { type: String, required: [true] },
  subject: { type: String, required: [true] },
  standard: { type: String, required: [true] }
});

const Question = mongoose.model("Question", questionSchema);

const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: [true] },
  subjectType: { type: String },
  subjectCode: { type: String },
  standard: { type: String, required: [true] }
});

const Subject = mongoose.model("Subject", subjectSchema);

const subjects = new Subject({
  subjectName: "python",
  subjectCode: "BCA001",
  standard: "BCA"
});

//subjects.save()

const examSchema = new mongoose.Schema({
  paperName: { type: String, required: true },
  paperCode: { type: String, required: true },
  duration: { type: Number, required: true },
  maxMarks: { type: Number, required: true },
  passingMarks: { type: Number, required: true },
  createdAt: { type: Date, required: false, default: Date.now },
  updatedAt: { type: Date, required: false, default: Date.now },
  standard: { type: String, required: true },
  numOfQues: { type: Number, required: true }//
});

const Exam = mongoose.model('Exam', examSchema);

const exam = new Exam({
  paperName: "MongoDB",
  paperCode: "MCA001",
  startTime: "2023-11-07T09:00:00Z",
  endTime: "2023-11-07T10:30:00Z",
  duration: 90,
  maxMarks: 100,
  passingMarks: 40,
  createdAt: "8 November 2023",
  numOfQues: 30,
});

//exam.save();

//database for Classes with their respective subject/courses
const coursesSchema = new mongoose.Schema({
  course: { type: String, required: [true] },
  subjects: { type: Array, required: [true] },
});

const Courses = mongoose.model('Courses', coursesSchema);


// Creating courses
const BCA = new Courses({
  course: "BCA",
  subjects: ["python", "Computer Organization And architecture", "DBMS", "Artificial Intelligence"],
});

const MCA = new Courses({
  course: "MCA",
  subjects: ["C# with .NET framework", "machine learning", "DBMS", "Cryptography and Cyber Sequrity"],
});

// BCA.save()
// MCA.save()

async function saveAdmin() {
  try {
    await admins.save();
    console.log("saved successfully");
  } catch {
    console.error('Error while saving:');
  }
}
// saveAdmin();
//

const app = express();
const port = 3001;
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(bodyParser.json());

// For authentication of login
app.post("/login", async (req, res) => {
  const { userName, password, userType } = req.body;
  // Check if the provided username and password match the admin user
  try {
    let found;
    if (userType === "admin") {
      found = await Admin.findOne({ userName });
    } else if (userType === "teacher") {
      found = await Teacher.findOne({ userName });
    } else {
      found = await Student.findOne({ userName });
    }
    if (found) {
      if (found.password === password) {
        console.log("you are logged in", found._id)
        return res.status(200).json({ message: 'Login successful', idd: found._id, })
      } else {
        return res.status(401).json({ error: 'Invalid Credentials' });

      }
    }
    else{
      return res.status(401).json({ error: 'Invalid Credentials' });
    }
  } catch (err) {
    console.log(err);
  }
});

// To delete subject from the database
app.post("/delSubject", async (req, res) => {
  const id = req.body.id;
  console.log("come inside server to delete subject", id)
  try {
    const db = mongoose.connection;
    // Convert the ID to an ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Find the subject by its ID
    const foundOne = await Subject.findById(objectId);

    console.log(foundOne)
    if (!foundOne) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    // Use deleteOne with a filter based on the found document
    await Subject.deleteOne({ _id: objectId });

    return res.status(200).json({ message: 'Deleted successfully from the server side' });
  } catch (error) {
    console.log("Error during deletion", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// To delete question from the database
app.post("/delQuestion", async (req, res) => {
  const id = req.body.id;
  console.log("come inside server to delete subject", id)
  try {
    const db = mongoose.connection;
    // Convert the ID to an ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Find the subject by its ID
    const foundOne = await Question.findById(objectId);

    console.log(foundOne)
    if (!foundOne) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Use deleteOne with a filter based on the found document
    await Question.deleteOne({ _id: objectId });
     console.log("found n going to delete")
    return res.status(200).json({ message: 'Deleted successfully from the server side' });
  } catch (error) {
    console.log("Error during deletion", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// To delete exam from the database
app.post("/delExam", async (req, res) => {
  const id = req.body.id;
  console.log("come inside server to delete exam", id)
  try {
    // "mongoose.connection" property is a reference to the current MongoDB database connection.
    const db = mongoose.connection;
    // Convert the ID to an ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Find the subject by its ID
    const foundOne = await Exam.findById(objectId);

    console.log(foundOne)
    if (!foundOne) {
      return res.status(404).json({ message: 'Question not found' });
    }

    // Use deleteOne with a filter based on the found document
    await Exam.deleteOne({ _id: objectId });

    return res.status(200).json({ message: 'Deleted successfully from the server side' });
  } catch (error) {
    console.log("Error during deletion", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

//add new interest by add new subject (AddInterest.jsx)
app.put('/addInterest/:id', async (req, res) => {
  const teacherId = (req.params.id);
  console.log("gegegge",teacherId)
  const { newSubject } = req.body;

  try {
    const teacher = await Teacher.findOne({ _id: teacherId });

    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Assuming newSubject is an array of interests to add
    teacher.interest = [...teacher.interest, ...newSubject];

    await teacher.save();

    return res.status(200).json({ message: 'Interest added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//updating subject
app.put(`/update/:id`,async(req,res)=>{
  console.log(req.params.id)
  try{
    const updatedValue=await Subject.findByIdAndUpdate(req.params.id,req.body,{new:true})
    console.log(updatedValue)
    return res.status(200).json({ message: 'updated successfully from the server side' });
  }
  catch(error){
    console.error(error);
  }
})

//updating examDetails
app.put(`/updateExam/:id`,async(req,res)=>{
  console.log(req.params.id)
  try{
    const updatedValue=await Exam.findByIdAndUpdate(req.params.id,req.body,{new:true})
    console.log(updatedValue)
    return res.status(200).json({ message: 'updated successfully from the server side' });
  }
  catch(error){
    console.error(error);
  }
})

//updating question
app.put(`/updateQuestion/:id`,async(req,res)=>{
  console.log(req.params.id)
  try{
    const updatedValue=await Question.findByIdAndUpdate(req.params.id,req.body,{new:true})
    console.log(updatedValue)
    return res.status(200).json({ message: 'updated successfully from the server side' });
  }
  catch(error){
    console.error(error);
  }
})
//Login Logout
app.put(`/updateLogin/:id`,async(req,res)=>{
  console.log(req.params.id)
  try{
    const updatedValue=await LogIn.findByIdAndUpdate(req.params.id,req.body,{new:true})
    console.log(updatedValue)
    return res.status(200).json({ message: 'updated successfully login from the server side' });
  }
  catch(error){
    console.error(error);
  }
})


//to add questions to the database
app.post("/addQuestions", async(req, res) => {
  
  console.log("came to post addQuestions",req.body)
  
  const {question, opt1,opt2,opt3,opt4,answer,level,subject,standard } = req.body;
  
  const questions=new Question({
   question, opt1,opt2,opt3,opt4,answer,level,subject,standard
  })
  // Save the Subject document to the database
  try {
    await questions.save();

    // Send a success response to the client
    res.status(200).json({ message: "Questions added successfully" });
  }catch(err) {
    
      
      // Handle other types of errors
      console.error(err);
      // Return a general error response to the client
      res.status(500).json({ error: "Internal server error" });
    
  }})

  //to add new exams  to the database
app.post("/addExam", async(req, res) => {
  
  console.log("came to post addExam",req.body)
  const {paperName,paperCode,duration,maxMarks,passingMarks,numOfQues,standard } = req.body;
  
  const exams=new Exam({
    paperName,paperCode,duration,maxMarks,passingMarks,numOfQues,standard
  })
  // Save the Exam document to the database
  try {
    await exams.save();

    // Send a success response to the client
    res.status(200).json({ message: "Exams details added successfully" });
  }catch(err) {
    

      // Return a general error response to the client
      res.status(500).json({ error: "Internal server error" });
    }
  })


//to add subjects to the database
app.post("/addSubject", async(req, res) => {
  
  console.log("came to post(addsubject)")
  const { subjectName, subjectType,subjectCode,standard } = req.body;
  
  const subjects=new Subject({
    subjectName,
    subjectType,
    standard,
    subjectCode
  })
  // Save the Subject document to the database
  try {
    await subjects.save();

    // Send a success response to the client
    res.status(200).json({ message: "Subject added successfully" });
  } catch (err) {
    console.log(err);
  }
});

//getting subject collection of teachers and display
app.get("/subjects", async(req, res) => {
  try{
  const subjectsFound= await Subject.find();
  // Send the collection of users to the client in the JSON format
  //console.log(subjectsFound)
  res.send(JSON.stringify(subjectsFound))
}
catch(error){
  console.log(error)
  res.status(500).send("Internal Server Error");
}
})

//getting subjectsList
app.get("/subjectsList", async(req, res) => {
  console.log("subjectslist")
  try{
  const subjectsListFound= await Subject.find();

  // Extract only subject names from the array of objects
const subjectsNamesOnly = subjectsListFound.map(subject => subject.subjectName);
  
  console.log("subjectsNamesOnly",subjectsNamesOnly)
  res.send(JSON.stringify(subjectsNamesOnly))
}
catch(error){
  console.log(error)
  res.status(500).send("Internal Server Error");
}
})

//getting exam collection and display
app.get("/exams", async(req, res) => {
  try{
  const examsFound= await Exam.find();
  // Send the collection of users to the client in the JSON format
  //console.log(subjectsFound)
  res.send(JSON.stringify(examsFound))
}
catch(error){
  console.log(error)
  res.status(500).send("Internal Server Error");
}
})

//getting login status
app.get("/subjects", async(req, res) => {
  try{
  const subjectsFound= await Subject.find();
  // Send the collection of users to the client in the JSON format
  //console.log(subjectsFound)
  res.send(JSON.stringify(subjectsFound))
}
catch(error){
  console.log(error)
  res.status(500).send("Internal Server Error");
}
})

//getting questions collection and display
app.get("/questions", async(req, res) => {
  try{
  const questionsFound= await Question.find();
  // Send the collection of users to the client in the JSON format
  //console.log(subjectsFound)
  res.send(JSON.stringify(questionsFound))
}
catch(error){
  console.log(error)
  res.status(500).send("Internal Server Error");
}
})
//getting teacher details 
app.get(`/teachersInfo/:id`, async(req, res) => {
  console.log("came to teachersInfo")
  try{
    const teacherId = req.params.id;
    
   // Use findById to find a specific teacher by ID
    const teacherFound = await Teacher.findById(teacherId);

    if (!teacherFound) {
      // If the teacher is not found, return a 404 status
      return res.status(404).json({ error: "Teacher not found" });
    }
    //console.log(teacherFound.name)
    console.log("interest",teacherFound.interest)
    // Send the found teacher to the client in JSON format
        return res.status(200).json({
      title:teacherFound.title,
      teacherName:teacherFound.name,
      interest:teacherFound.interest,
    });
   
  }
catch(error){
  console.log(error)
  res.status(500).send("Internal Server Error");
}
})

//getting student details 
app.get(`/studentDetails/:id`, async(req, res) => {
  console.log("came to studentDetails")
  try{
    const studentId = req.params.id;
    
   // Use findById to find a specific teacher by ID
    const studentFound = await Student.findById(studentId);

    if (!studentFound) {
      // If the teacher is not found, return a 404 status
      return res.status(404).json({ error: "Student not found" });
    }
    console.log("Course to which student enrolledd",studentFound.class)
    // Send the found teacher to the client in JSON format
        return res.status(200).json({
      studentName:studentFound.name,
      class:studentFound.class,
    });
   
  }
catch(error){
  console.log(error)
  res.status(500).send("Internal Server Error");
}
})

//getting subjects of class in class
app.get(`/subOfClass/:class`, async(req, res) => {
  console.log("came to studentDetails")
  try{
    const { class: standard } = req.params; // Extract class from request parameters

    
   // Use findById to find a specific  by class name
    const subjectsFound =await Subject.find({standard})
  
    if (!subjectsFound) {
      // If the teacher is not found, return a 404 status
      return res.status(404).json({ error: "Subjects not found" });
    }
    console.log("subjects", subjectsFound);
const subjects = subjectsFound.map(sub => sub.subjectName);

    // Send the found teacher to the client in JSON format
        return res.status(200).json({
      subjects
    });
   
  }
catch(error){
  console.log(error)
  res.status(500).send("Internal Server Error");
}
})


//getting details of an exam
app.get(`/examDetails/:paperName`, async(req, res) => {
  console.log("came to Details of exam")
  try{
    const {paperName} = req.params; // Extract class from request parameters

    console.log("paperName",paperName)
    const detailsFound =await Exam.findOne({paperName})
  
    if (!detailsFound) {
      // If the teacher is not found, return a 404 status
      return res.status(404).json({ error: "Details not found" });
    }
    console.log("exam details",detailsFound)
    // Send the found teacher to the client in JSON format
        return res.status(200).json({
      examDetails:detailsFound,
    });
   
  }
catch(error){
  console.log(error)
  res.status(500).send("Internal Server Error");
}
})
//questions to display for questions of exam
app.get(`/QuestionsOfSub/:subject/:standard`, async (req, res) => {
  console.log("came to question of subject..");
  try {
    const subject = req.params.subject;
    const standard = req.params.standard?req.params.standard:null;
    console.log("standardddd",standard)
    const questions = await Question.find({ subject, standard }).sort({ level: 1 });

    console.log("collection found", questions);

    if (!questions || questions.length === 0) {
      // If no questions are found, return a 404 status
      return res.status(404).json({ error: "No questions available" });
    }

    return res.status(200).json({
      questions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

//questions to display for "interset of teachers"
app.get(`/QuestionsOfInterest/:subject`, async (req, res) => {
  console.log("came to question of subject..");
  try {
    const subject = req.params.subject;
    const questions = await Question.find( {subject} );

    console.log("collection found", questions);

    if (!questions || questions.length === 0) {
      // If no questions are found, return a 404 status
      return res.status(404).json({ error: "No questions available" });
    }

    return res.status(200).json({
      questions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.get('/logout',(req,res)=>{
  log=false;
  res.status(200).json({error:'logout successful'})
})


//require login middleware
function requireLogin(req,res,next){
  if(log){
    console.log("permitted")
    next();
  }
  else{
    res.status(401).json({error:'Unauthorized'})
    res.redirect('/login')
  }
}

app.listen(port, () => {
  console.log("Server is running on", port);
});
