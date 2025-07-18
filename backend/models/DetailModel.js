import mongoose from "mongoose";

const DetailSchema = new mongoose.Schema(
  {
     name:{type:String,required:true},
    email:{type:String,required:true ,unique:true},
    phone:{type:Number,required:true},
    dob:{type:Date,required:true},
    gender:{type:String,required:true},
    aadhaarFront:{type:String, default:"", unique:true},
    aadhaarBack:{type:String, default:"", unique:true},
    parentName:{type:String,required:true},
    parentPhone:{type:Number,required:true},
    localAddress:{type:String,required:true},
    permanentAddress:{type:String,required:true},
    status:{type:String,required:true},
    year:{type:Number,required:true},
    college:{type:String,required:true},
    course:{type:String,required:true},
    source:{type:String,required:true},
    friendName:{type:String},
  },
  {timestamps:true}
);

const DetailModel = mongoose.model("detail", DetailSchema);
export default DetailModel;