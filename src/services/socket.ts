import { Server, Socket } from "socket.io";
import http from "http";
import dotenv from "dotenv";
import Messages from "../models/messages";

const m = new Messages();

dotenv.config();

const socket = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
    },
  });

  io.on("connection", async (socket: Socket) => {
    const username = socket.handshake.query?.username as unknown as string;
    const userId = socket.handshake.query?.userId as unknown as string;
    socket.join(username);
    socket.leave(socket.id);
    /* ---------------------------------------- */
    io.to(username).emit("offline-msgs", await m.show(userId));

    socket.on("send-msg", async ({ reciever, msg, senderId, recieverId }) => {
      if (io.sockets.adapter.rooms.get(reciever)) {
        return socket
          .to(reciever)
          .emit("recieve-msg", { sender: username, msg });
      }
      const message = await m.create(senderId, recieverId, msg);
    });
  });
};

export default socket;
