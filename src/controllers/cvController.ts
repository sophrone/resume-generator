// src/controllers/cvController.ts
import { Request, Response } from "express";
import { generateCV } from "../utils/cvGenerator";

export const createCV = (req: Request, res: Response): void => {
  const { profile, jobListing } = req.body;

  // Validate input data (ensure profile and jobListing are provided)
  if (!profile || !jobListing) {
    res.status(400).json({ message: "Profile and job listing are required." });
    return;
  }

  const cv = generateCV(profile, jobListing);
  res.header("Content-Type", "text/plain");
  res.send(cv);
};
