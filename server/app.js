const express = require("express");
const db = require("./db/db.js");
const router = require("./routes/index.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const dotenv = require("dotenv");

dotenv.config(); // Memuat variabel lingkungan dari berkas .env

const port = process.env.PORT || 5000;
const app = express(); // Create an instance of express
const server = http.createServer(app); // Use the express app with http.createServer
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    method: ["GET", "POST"],
  },
});

try {
  db.authenticate();
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
    {
      credentials: true,
      origin: process.env.CORS_ORIGIN || "*",
    }
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
  console.log(`Server berjalan diPORT${port}`);
});
