import { Router, Request, Response } from "express";
import { User, Users } from "../models/users";
import { verifyAuthToken, createAuthToken } from "../services/authorization";
import checkUsername from "../middlewares/checkUsername";
import checkEmail from "../middlewares/checkEmail";
import contactsRoutes from "./contacts";

const u = new Users();

const create = async (req: Request, res: Response) => {
  const { email, password, username, name } = req.body.user;

  try {
    const user: User = await u.create(email, password, username, name);
    res.json({ user, authToken: createAuthToken(user) });
  } catch (err) {
    res.status(500).json(`${err}`);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const { email, password } = req.body.user;
  try {
    const user = await u.authenticate(email, password);
    if (user) {
      res.json({ user, authToken: createAuthToken(user) });
      return;
    }
    throw new Error("");
  } catch (err) {
    res.status(400).json("wrong email or password");
  }
};

const usersRoutes = Router();

usersRoutes.post("/signin", authenticate);
usersRoutes.post("/signup", checkUsername, checkEmail, create);

usersRoutes.use(verifyAuthToken);

usersRoutes.use("/:username/contacts", contactsRoutes);

export default usersRoutes;
