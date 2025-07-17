// import DetailModel from "../models/DetailModel.js"; 

// export async function addDetails(req, res,next) {
//   try {
//     console.log("Received Data:", req.body);

//     const dataToAdd = new DetailModel(req.body);
//     await dataToAdd.save();

//     res.status(200).send("Data Added");
//   } catch (error) {
//     console.error("Error while saving data:", error);
//     res.status(500).json({
//       message: "There is an error while saving data",
//       error: error.message,
//     });
//   }
// }








import DetailModel from "../models/DetailModel.js";

export async function addDetails(req, res, next) {
  try {
    console.log("Received body:", req.body);
    console.log("Received file:", req.file); // This is where multer stores the uploaded file

    const { filename } = req.file || {}; // Get filename from multer

    const dataToAdd = new DetailModel({
      ...req.body,
      aadhaar1: filename || "", // Save the filename of uploaded file
    });

    await dataToAdd.save();

    res.status(200).send("Data Added");
  } catch (error) {
    console.error("Error while saving data:", error);
    res.status(500).json({
      message: "There is an error while saving data",
      error: error.message,
    });
  }
}




