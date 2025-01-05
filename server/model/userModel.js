import mongoose from "mongoose";


  const userSchema = new mongoose.Schema({
    userName:{type:String,required:true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Student', 'Teacher', 'Admin'], default: 'Student' },
    contact:{type:Number,required:false}, //optional for students,
    title: { type: String, required: [false] },
    name: { type: String,enum:['Mr','Mrs'], required: [false] },
    email: { type: String, required: [true] },
    interest: { type: Array, required: [false] },//interested subject for teacher
    rollNum: { type: Number, required: [false] },
    class: { type: String, required: [false] },
    createdTime:{type:Date,default:Date.now},
    completedExams:{type:Array,required:[false]} // student completed exams
  });

const User=mongoose.model('User',userSchema);

export default User;