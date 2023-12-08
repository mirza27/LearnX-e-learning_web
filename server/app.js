import express from "express";
import db from "./db/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import dotenv from "dotenv";

dotenv.config(); // Memuat variabel lingkungan dari berkas .env

const port = process.env.PORT || 5000;
const app = express(); // Create an instance of express
const server = http.createServer(app); // Use the express app with http.createServer
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5001",
    method: ["GET", "POST"],
  },
});

try {
  await db.authenticate();
  console.log("Database connected");
  db.sync({ alter: true })
    .then(() => {
      console.log("Tabel berhasil disinkronisasi dengan opsi alter.");
      // ... Mulai aplikasi Anda di sini ...
    })
    .catch((error) => {
      console.error("Gagal menyinkronkan tabel:", error);
    });
} catch (error) {
  console.log("Error: " + error);
}

app.use(
  cors(
    // akses ke frontend
    { credentials: true, origin: "http://localhost:5001" }
  )
);

// configarion for class room chat forum
io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("join-room", (class_id) => {
    socket.join(class_id);
    console.log(`User with id ${socket.id} join class room chat ${class_id} `);
  });

  socket.on("send-message", (message) => {
    console.log("meesage :\n", message);

    // mengirim ke semua frontend
    socket.to(message.class_id).emit("receive-message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

app.use(cookieParser());
app.use(express.json());
app.use(router);

server.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
