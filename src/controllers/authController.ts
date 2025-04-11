// src/controllers/authController.ts
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { db } from "../../config/database";
import redisClient from "../../config/redisClient"; // Import Redis client

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req.body;

  try {
    // Check cache first
    const cachedUser = await redisClient.get(username);
    let user;

    if (cachedUser) {
      user = JSON.parse(cachedUser); // Parse cached user data
    } else {
      // Query database if not in cache
      user = await db.select().from(User).where({ username }).execute();
      if (user.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Cache the user data in Redis
      await redisClient.set(username, JSON.stringify(user[0]), {
        EX: 3600, // Set expiration time to 1 hour
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user[0].id, username: user[0].username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
