import jwt from "jsonwebtoken";

const secretKey = "hagsydgsdjkasdkbh7yiuJHBJGCD";

// fungsi membuat token
export const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, secretKey, { expiresIn: "1m" });

  const refreshToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });

  return { accessToken, refreshToken };
};

// Fungsi untuk memverifikasi token
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded; // Token valid, kembalikan payload token
  } catch (error) {
    return null; // Token tidak valid atau verifikasi gagal
  }
};

// fungsi untuk mengecek login / cek cookie
export const authenticateUser = async (req, res, next) => {
  try {
    // mengambil cookie yang dikirim
    const refreshToken = req.cookies.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = verifyToken(refreshToken);

    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decodedToken; // nilai login yang memuat id user, dikirim ke fungsi GetStudent

    next(); // Lanjutkan ke rute berikutnya
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// fungsi logout
export const logout = (req, res) => {
  res.clearCookie("refresh_token"); // Menghapus cookie dengan nama "refresh_token"
  res.json({ message: "Logout successful" });
};
