import client from "../database";

type Message = {
  senderId: string;
  recieverId: string;
  text: string;
};

class Messages {
  async show(
    senderId: Message["senderId"],
    recieverId: Message["recieverId"]
  ): Promise<Message[]> {
    const sql = "SELECT * FROM messages WHERE senderId=$1 AND recieverId=$2";
    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [senderId, recieverId]);

      const messages: Message[] = res.rows;
      conn.release();

      return messages;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
  async create(
    senderId: Message["senderId"],
    recieverId: Message["recieverId"],
    text: Message["text"]
  ): Promise<Message> {
    const sql =
      "INSERT INTO messages (senderId,recieverId,text) VALUES ($1,$2,$3) RETURNING *";
    try {
      const conn = await client.connect();
      const res = await conn.query(sql, [senderId, recieverId, text]);

      const message: Message = res.rows[0];
      conn.release();

      return message;
    } catch (err) {
      throw new Error(`${err}`);
    }
  }
}
export default Messages;
