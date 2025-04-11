// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from the header
  if (token) {
    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET || "", (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden if token is invalid
      req.user = user; // Attach user information to the request
      next(); // Proceed to the next middleware or route handler
    });
  } else {
    res.sendStatus(401); // Unauthorized if no token is provided
  }
};
