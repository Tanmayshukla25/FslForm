import DetailModel from "../models/DetailModel.js"; 

export async function addDetails(req, res) {
  try {
    console.log("Received Data:", req.body);

    const dataToAdd = new DetailModel(req.body);
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
