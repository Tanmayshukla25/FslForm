import DetailModel from "../models/DetailModel.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
const storage = multer.memoryStorage(); 
const upload = multer({ storage });
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

function uploadToCloudinary(buffer, folder) {
  console.log("Deepesh");
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (result) resolve(result);
        else reject(err);
      }
    );
    stream.end(buffer);
  });
}

export async function addDetails(req, res) {
  console.log("first");
  upload.fields([
    { name: "aadhaarFront", maxCount: 1 },
    { name: "aadhaarBack", maxCount: 1 },
  ])(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload error", error: err.message });
    }
    const aadhaarFrontFile = req.files?.aadhaarFront?.[0];
    const aadhaarBackFile = req.files?.aadhaarBack?.[0];
     
    if (!aadhaarFrontFile || !aadhaarBackFile) {
      return res
        .status(400)
        .json({ message: "Both Aadhar files are required" });
    }

    const fileSize = 5 * 1024 * 1024;
    if (aadhaarFrontFile.size > fileSize || aadhaarBackFile.size > fileSize) {
      return res
        .status(400)
        .json({ message: "Aadhaar images must be under 5MB" });
    }
    const { email, ...rest } = req.body;

    try {
      const userExists = await DetailModel.findOne({ email });

      if (userExists) {
        return res.status(409).json({ message: "Email already register." });
      }
      console.log("Tanmay");

      const [aadhaarFrontImg, aadhaarBackImg] = await Promise.all([
        uploadToCloudinary(aadhaarFrontFile.buffer, "aadhaar"),
        uploadToCloudinary(aadhaarBackFile.buffer, "aadhaar"),
      ]);

      console.log(aadhaarFrontImg);
      console.log(aadhaarBackImg);

      const userData = {
        email,
        ...rest,
        aadhaarFront: aadhaarFrontImg.secure_url,
        aadhaarBack: aadhaarBackImg.secure_url,
      };
      const newUser = new DetailModel(userData);
      const saveduser = await newUser.save();

      res.status(201).json({ message: "User register", user: saveduser });
    } catch (error){
      console.log("Register Error", err);
      res.status(500).json({ message: "server error", error: error.message });
    }
  });
}

// export async function addDetails(req, res, next) {
//   try {
//     // console.log(" Received Body:", req.body);
//     // console.log(" Received Files:", req.files);

//     const aadhaarFrontFile = req.files?.aadhaarFront?.[0] || null;
//     const aadhaarBackFile = req.files?.aadhaarBack?.[0] || null;

//     const newDetail = new DetailModel({
//       ...req.body,
//       aadhaarFront: aadhaarFrontFile ? aadhaarFrontFile.filename : "",
//       aadhaarBack: aadhaarBackFile ? aadhaarBackFile.filename : "",
//     });

//     await newDetail.save();

//     res.status(200).json({ message: " Data added successfully!" });
//   } catch (error) {
//     console.error(" Error while saving data:", error);
//     res.status(500).json({
//       message: "There was an error while saving data.",
//       error: error.message,
//     });
//   }
// }
