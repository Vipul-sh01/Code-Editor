import { Lawyer } from "../Models/LawyerModel.js";
import { AsyncHandler } from "../Utility/AsyncHandler.js";
import { ApiError } from "../Utility/ApiError.js";
import { ApiResponse } from "../Utility/ApiResponse.js"; 
import stateMapping from "../Utility/stateMapping.js"; 


const createLawyer = AsyncHandler(async (req, res) => {
  const { name, enrollmentId, state, status } = req.body;

  if (!name || !enrollmentId || !state || name.trim() === "" || enrollmentId.trim() === "" || state.trim() === "") {
    throw new ApiError(400, "Please provide all required fields");
  }

  
  const existingLawyer = await Lawyer.findOne({ enrollmentId });
  if (existingLawyer) {
    throw new ApiError(400, "Lawyer with this enrollment ID already exists");
  }

  
  const lawyer = await Lawyer.create({
    name,
    enrollmentId,
    state,
    status: status || "Active", 
  });

  return res.status(201).json(new ApiResponse(201, lawyer, "Lawyer created successfully"));
});


const verifyEnrollmentId = AsyncHandler(async (req, res) => {
  const { enrollmentId } = req.body;

 
  const match = enrollmentId.match(/^([A-Z]{1,3})\/\d{4,5}\/\d{4}$/);
  if (!match) {
    throw new ApiError(400, "Invalid enrollment ID format");
  }

  const stateCode = match[1]; 

  const stateName = stateMapping[stateCode];
  if (!stateName) {
    throw new ApiError(404, "State not found for given enrollment ID");
  }

  
  const lawyer = await Lawyer.findOne({ enrollmentId });
  if (!lawyer) {
    throw new ApiError(404, "No lawyer found with this enrollment ID");
  }

  return res.status(200).json(new ApiResponse(200, {stateName }, "Enrollment ID verified successfully"));
});

export { createLawyer, verifyEnrollmentId };
