import { Server, Socket } from "socket.io";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const socket = (httpServer: http.Server) => {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
    },
  });

  io.on("connection", (socket: Socket) => {
    const username = socket.handshake.query?.username as unknown as string;
    socket.join(username);

    socket.on("send-msg", ({ reciever, msg }) => {
      socket.to(reciever).emit("recieve-msg", { sender: username, msg });
    });
  });
};

export default socket;
