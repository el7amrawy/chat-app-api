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
    socket.join(socket.handshake.query?.id as unknown as string);
    console.log(socket.id);
  });
};

export default socket;
