import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { db } from "../../config/database";
import redisClient from "../../config/redisClient";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface UserType {
  id: number;
  username: string;
  password: string;
  email: string;
}

// SignUp Function
export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password, email } = req.body;

  try {
    // Check if the user already exists
    const existingUsers = (await db
      .select()
      .from(User)
      .execute()) as UserType[]; // Cast to UserType

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = (await db
      .insert(User)
      .values({
        username,
        password: hashedPassword,
        email,
      })
      .execute()) as unknown as UserType[]; // Cast to UserType

    if (newUser.length === 0) {
      return res.status(500).json({ message: "User creation failed" });
    }

    return res.status(201).json({
      message: "User created successfully",
      userId: newUser[0].id, // Access the ID from the inserted record
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// SignIn Function
export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req.body;

  try {
    // Check cache first
    const cachedUser = await redisClient.get(username);
    let user: UserType;

    if (cachedUser) {
      user = JSON.parse(cachedUser); // Parse cached user data
    } else {
      // Query database if not in cache
      const users = (await db.select().from(User).execute()) as UserType[];

      if (users.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      user = users[0]; // Get the first user
      // Cache the user data in Redis
      await redisClient.set(username, JSON.stringify(user), {
        EX: 3600, // Set expiration time to 1 hour
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
