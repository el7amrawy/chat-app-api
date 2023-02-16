import { Router, Request, Response, json } from "express";
import usersRoutes from "../handlers/users";
import cors from "cors";

const routes = Router();

routes.use(cors());
routes.use(json());

routes.use("/users", usersRoutes);

routes.all("*", (_req: Request, res: Response) => {
  res.status(404).json("page not found");
});

export default routes;
