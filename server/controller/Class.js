import Student_classes from "../models/student_classesModel.js";
import Classes from "../models/classModel.js";
import Lecturer from "../models/lecturerModel.js";

// GENERATE FOR CLASS CODE
function generateRandomCode(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}

// MENGAMBIL LIST CLASS SEBAGAI STUDENT ==================================
export const StudentClassList = async (req, res) => {
  try {
    // Mengambil student_id dari frontend
    const { student_id } = req.body;

    const studentClasses = await Student_classes.findAll({
      where: { student_id: student_id },
      attributes: ["student_class_id"],
      include: [
        {
          model: Classes,
          attributes: ["class_id", "class_name"],
          include: {
            model: Lecturer,
            attributes: ["firstname"],
          },
        },
      ],
    });

    // Mengirimkan data kelas ke klien
    res.status(200).json(studentClasses);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// JOIN CLASS ==================================
export const JoinClass = async (req, res) => {
  const { student_id, classCode } = req.body;

  // jika panjang kode tidak sama dengan 6
  if (classCode.length !== 6) {
    return res.status(400).json({
      message: "Invalid class code. Class codes must be 6 characters long.",
    });
  }

  const existingClass = await Classes.findOne({ code: classCode });

  // Periksa apakah siswa sudah tergabung dalam kelas tersebut
  const existingStudentClass = await Student_classes.findOne({
    class_id: existingClass._id, // Pastikan cara Anda menyimpan ID kelas dalam model Student_classes
    student_id: student_id,
  });

  // jika data kelas tidak ada
  if (!existingClass) {
    return res.status(404).json({
      message: "Class not found with the provided code",
    });

    // Jika siswa sudah tergabung dalam kelas yang sama
  } else if (existingStudentClass) {
    return res.status(400).json({
      message: "You are already a member of the class",
    });

    // jika kelas ada
  } else {
    try {
      await Student_classes.create({
        class_id: existingClass.class_id,
        student_id: student_id,
      });

      res.status(200).json({
        message: "Successfully joined the class",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  }
};

// MENGAMBIL CONTENT CLASS SEBAGAI STUDENT ==================================

// MENGAMBIL LIST MYCLASS SEBAGAI LECTURER ==================================

// ADD NEW CLASS ==================================
export const addNewClass = async (req, res) => {
  const { lecturer_id, class_name, desc } = req.body;

  if (!class_name) {
    return res.status(400).json({
      message: "Class name not specified",
    });
  } else {
    // generate random code (6 digit) for new class
    const classCode = generateRandomCode(6);
    try {
      await Classes.create({
        class_name: class_name,
        lecturer_id: lecturer_id,
        desc: desc,
        code: classCode,
      });
      res.status(200).json({
        message: "New Class created successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  }
};

// MENGAMBIL CONTENT MYCLASS SEBAGAI LECTURER
