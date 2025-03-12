import { Router } from "express";
import {createLawyer, verifyEnrollmentId} from "../Controllers/Lawyer.Controller.js";

const router = Router();

router.route('/CreateLawer').post(createLawyer);
router.route('/Verify-Enrol').post(verifyEnrollmentId);

export default router;
