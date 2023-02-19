import { Request, Response, NextFunction } from "express";
import { Users } from "../models/users";

const u = new Users();

const checkEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body.user;

    const user = await u.checkEmail(email);
    if (!user?.email?.length) {
      return next();
    }
    throw new Error("email already used");
  } catch (err) {
    res.status(403).json(`${err}`);
  }
};

export default checkEmail;
