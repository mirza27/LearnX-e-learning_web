import express from "express";
import db from "./db/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";

const port = process.env.PORT || 5000;
const app = express();

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

// // Middleware untuk mengizinkan CORS jika diperlukan
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5001");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(
  cors(
    // akses ke frontend
    { credentials: true, origin: "http://localhost:5001" }
  )
);
// app.use(multer());
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
