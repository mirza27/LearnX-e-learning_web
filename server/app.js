import express from "express";
import db from "./db/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

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
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// const data = {
//   message: "Ini adalah data dari server.",
//   items: ["Item 1", "Item 2", "Item 3"],
// };

// // ROUTING endpoint
// app.get("/api/home", (req, res) => {
//   res.json(data);
// });

// // Contoh rute login
// app.post("/api/login", (req, res) => {
//   const { email, password } = req.body;

//   const user = login(email, password); // Menggunakan fungsi login

//   if (!user) {
//     return res.status(401).json({ message: "Login gagal" });
//   }

//   const token = generateToken(user.id);

//   res.json({ token });
// });

app.use(
  cors(
    // akses ke frontend
    { credentials: "true", origin: "https://localhost:5001" }
  )
);
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
