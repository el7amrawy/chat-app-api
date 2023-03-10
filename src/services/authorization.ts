import Jwt from "jsonwebtoken";
import { User } from "../models/users";
import { Request, Response, NextFunction } from "express";

const TOKEN_SECRET = process.env.TOKEN_SECRET as unknown as string;

const createAuthToken = (user: User): string => {
  // return Jwt.sign(user, TOKEN_SECRET, { expiresIn: "2h" });
  return Jwt.sign(user, TOKEN_SECRET);
};

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as unknown as string;
    Jwt.verify(token, TOKEN_SECRET);
    next();
  } catch (err) {
    res.status(401).json(`${err}`);
  }
};

export { createAuthToken, verifyAuthToken };
