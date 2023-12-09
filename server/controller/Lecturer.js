const bcrypt = require("bcrypt");
const Lecturer = require("../models/lecturerModel.js");
const { generateToken } = require("../middleware/auth.js");

// MENGAMBIL DATA STUDENT
exports.GetLecturer = async (req, res) => {
  try {
    // Mengambil lecturer_id dari payload token
    const userPayload = req.user;
    const token = req.token;
    const lecturer_id = userPayload.lecturer_id;

    // Menggunakan lecturer_id dari payload sebagai kriteria pencarian
    const lecturer = await Lecturer.findOne({
      where: {
        lecturer_id: lecturer_id,
      },
      attributes: ["lecturer_id", "email", "firstname"],
    });

    if (!lecturer) {
      return res.status(404).json({ message: "lecturer not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.cookie("myCookie", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    res.status(200).json({ lecturer, token });
    console.log(json({ lecturer, token }));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// REGISTRASI SEBAGAI Guru
exports.LecturerRegister = async (req, res) => {
  const { firstname, lastname, email, password, confPassword } = req.body;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  if (password !== confPassword) {
    // jika password dan confpassword tidak sama
    return res.status(400).json({
      message: "Password not same",
    });
  } else {
    // jika password dan confirmasi password sama
    try {
      await Lecturer.create({
        email: email,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
      });
      res.json({
        message: "Register success",
      });
    } catch (error) {}
  }
};

// LOGIN STUDENT
exports.LecturerLogin = async (req, res) => {
  try {
    // Mencari email dalam basis data
    const lecturer = await Lecturer.findOne({
      where: {
        email: req.body.email,
      },
    });

    const lecturer_id = lecturer.lecturer_id;
    const firstname = lecturer.firstname;
    const email = lecturer.email;
    const lastname = lecturer.lastname;

    // Memeriksa apakah email ditemukan
    if (!lecturer) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Membandingkan kata sandi yang dimasukkan dengan kata sandi yang telah di-hash
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      lecturer.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // generate token
    const { _, refreshToken } = generateToken({
      lecturer_id,
      email,
      firstname,
      lastname,
    });

    // mengirim cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
