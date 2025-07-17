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
    console.log("Received Body Data:", req.body);
    console.log("Received File:", req.file);

    const {
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      parentName,
      parentPhone,
      localAddress,
      permanentAddress,
      sameAddress,
      status,
      qualification,
      year,
      college,
      designation,
      company,
      course,
      source,
      friendName,
      agreed,
    } = req.body;

    const aadhaar1 = req.file ? req.file.filename : null;

    const dataToAdd = new DetailModel({
      name,
      email,
      phone,
      dateOfBirth,
      gender,
      parentName,
      parentPhone,
      localAddress,
      permanentAddress,
      sameAddress,
      status,
      qualification,
      year,
      college,
      designation,
      company,
      course,
      source,
      friendName,
      aadhaar1,
      agreed,
    });

    await dataToAdd.save();

    res.status(200).send("Data Added Successfully");
  } catch (error) {
    console.error("Error while saving data:", error);
    res.status(500).json({
      message: "There is an error while saving data",
      error: error.message,
    });
  }
}
