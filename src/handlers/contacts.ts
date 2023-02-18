import { Router, Request, Response } from "express";
import { Contacts } from "../models/contacts";
import { Users } from "../models/users";

const c = new Contacts();
const u = new Users();

const create = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const { contact_username } = req.body.contact;
    const user_id = (await u.show(username)).id;
    const contact_id = (await u.show(contact_username)).id;
    const contact = await c.create(user_id, contact_id);
    res.json(contact);
  } catch (err) {
    res.status(400).json(`couldn't create contact ${err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    const user_id = (await u.show(username)).id;
    const contacts = await c.show(user_id);
    if (contacts.length) {
      return res.json(contacts);
    }
    throw new Error("user has no contacts");
  } catch (err) {
    res.status(404).json(`contacts not found ${err}`);
  }
};

const contactsRoutes = Router({ mergeParams: true });

contactsRoutes.get("/", show);
contactsRoutes.post("/", create);

export default contactsRoutes;
