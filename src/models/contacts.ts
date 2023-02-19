import client from "../database";

type Contact = {
  id: string;
  user_id: string;
  contact_id: string;
};

class Contacts {
  async index(): Promise<Contact[]> {
    const sql = "SELECT * FROM contacts";
    try {
      const conn = await client.connect();
      const res = await conn.query(sql);

      const contacts: Contact[] = res.rows;
      conn.release();

      return contacts;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async show(user_id: Contact["user_id"]): Promise<Contact[]> {
    const sql =
      // "SELECT * FROM contacts WHERE user_id=$1";
      "SELECT contacts.*,users.username FROM contacts INNER JOIN users ON contacts.contact_id=users.id WHERE user_id=$1";
    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [user_id]);

      const contacts: Contact[] = res.rows;
      conn.release();

      return contacts;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async create(
    user_id: Contact["user_id"],
    contact_id: Contact["contact_id"]
  ): Promise<Contact> {
    const sql =
      "INSERT INTO contacts (user_id,contact_id) VALUES ($1,$2) RETURNING *";
    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [user_id, contact_id]);

      const contact: Contact = res.rows[0];
      conn.release();

      return contact;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }

  async checkContact(
    user_id: Contact["user_id"],
    contact_id: Contact["contact_id"]
  ): Promise<Contact> {
    const sql = "SELECT * FROM contacts WHERE user_id=$1 AND contact_id=$2";
    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [user_id, contact_id]);

      const contact: Contact = res.rows[0];
      conn.release();

      return contact;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}

export { Contacts, Contact };
