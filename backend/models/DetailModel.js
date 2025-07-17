import mongoose from "mongoose";

const DetailSchema = new mongoose.Schema(
  {
    name: { type: String, minlength: 4, maxlength: 30, required: true },
    email: {
      type: String,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
      required: true,
    },
    phone: {
      type: Number,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
      required: true,
    },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female", "other"] },

    parentName: { type: String },
    parentPhone: {
      type: Number,
      match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
    },

    localAddress: { type: String },
    permanentAddress: { type: String },
    sameAddress: { type: Boolean, default: true },

    status: { type: String, enum: ["Student", "Working Professional"] },
    qualification: { type: String },
    year: { type: Number },
    college: { type: String },
    designation: { type: String },
    company: { type: String },

    course: { type: String },
    source: { type: String },
    friendName: { type: String },

    aadhaar1: { type: String }, 

    agreed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const DetailModel = mongoose.model("detail", DetailSchema);
export default DetailModel;
