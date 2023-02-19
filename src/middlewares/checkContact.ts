import { Response, Request, NextFunction } from "express";
import { Users } from "../models/users";
import { Contacts } from "../models/contacts";

const c = new Contacts();
const u = new Users();

const checkContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.params;
    const { contact_username } = req.body.contact;
    if (username !== contact_username) {
      const user_id = (await u.show(username)).id;
      const contact_id = (await u.show(contact_username)).id;
      const contact = await c.checkContact(user_id, contact_id);
      if (!contact?.user_id?.length) {
        return next();
      }
    }
    throw new Error("contact already exits");
  } catch (err) {
    res.status(406).json(`${err}`);
  }
};

export default checkContact;
