import express from "express";
import cors from "cors";
import { cvGenerator } from "../controllers/cvCreationController.js";

const router = express.Router();

// Enable CORS for all routes
router.use(cors());

router.route("/resume")
  .post(cvGenerator);

export default router;
