import { Router, Request, Response } from "express";
import usersRoutes from "../handlers/users";

const routes = Router();

routes.use("/users", usersRoutes);

routes.all("*", (_req: Request, res: Response) => {
  res.status(404).json("page not found");
});

export default routes;
