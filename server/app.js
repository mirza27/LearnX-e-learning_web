// server.js
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Middleware untuk mengizinkan CORS jika diperlukan
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const data = {
  message: "Ini adalah data dari server.",
  items: ["Item 1", "Item 2", "Item 3"],
};

app.get("/api", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
