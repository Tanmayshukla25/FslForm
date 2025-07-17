import DetailModel from "../models/DetailModel.js"; 
export async function addDetails(req, res, next) {
  try {
    // console.log(" Received Body:", req.body);
    // console.log(" Received Files:", req.files);

    const aadhaarFrontFile = req.files?.aadhaarFront?.[0] || null;
    const aadhaarBackFile = req.files?.aadhaarBack?.[0] || null;

    const newDetail = new DetailModel({
      ...req.body,
      aadhaarFront: aadhaarFrontFile ? aadhaarFrontFile.filename : "",
      aadhaarBack: aadhaarBackFile ? aadhaarBackFile.filename : "",
      
    });

    await newDetail.save();

    res.status(200).json({ message: " Data added successfully!" });
  } catch (error) {
    console.error(" Error while saving data:", error);
    res.status(500).json({
      message: "There was an error while saving data.",
      error: error.message,
    });
  }
}
