import { User } from "../models/users";
import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

const verifyTokenOwner = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.params;
    const token = req.headers.authorization?.split(" ")[1] as unknown as string;
    const tokenUser = Jwt.decode(token) as unknown as User;
    if (tokenUser.id == user_id) {
      next();
      return;
    }
    throw new Error("unacceptable token");
  } catch (err) {
    res.status(406).json(`${err}`);
  }
};

export default verifyTokenOwner;
