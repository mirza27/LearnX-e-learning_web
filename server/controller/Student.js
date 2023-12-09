const bcrypt = require("bcrypt");
const Student = require("../models/studentModel.js");
const { generateToken } = require("../middleware/auth.js");

// MENGAMBIL DATA STUDENT
exports.GetStudent = async (req, res) => {
  try {
    // Mengambil student_id dari payload token
    const userPayload = req.user;
    const token = req.token;
    const student_id = userPayload.student_id;

    // Menggunakan student_id dari payload sebagai kriteria pencarian
    const student = await Student.findOne({
      where: {
        student_id: student_id,
      },
      attributes: ["student_id", "email", "firstname"],
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ student, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// REGISTRASI SEBAGAI MURID
exports.StudentRegister = async (req, res) => {
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
      await Student.create({
        email: email,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
      });
      res.json({
        message: "Register success",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  }
};

// LOGIN STUDENT
exports.StudentLogin = async (req, res) => {
  try {
    // Mencari email dalam basis data
    const student = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });

    const student_id = student.student_id;
    const firstname = student.firstname;
    const email = student.email;
    const lastname = student.lastname;

    // Memeriksa apakah email ditemukan
    if (!student) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Membandingkan kata sandi yang dimasukkan dengan kata sandi yang telah di-hash
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      student.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // generate token
    const { _, refreshToken } = generateToken({
      student_id,
      email,
      firstname,
      lastname,
    });

    // mengirim cookie
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", token: refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
