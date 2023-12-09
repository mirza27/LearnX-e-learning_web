const Student_classes = require("../models/student_classesModel.js");
const Classes = require("../models/classModel.js");
const Lecturer = require("../models/lecturerModel.js");
const Event = require("../models/eventModel.js");
const Task = require("../models/taskModel.js");
const Student = require("../models/studentModel.js");
const Announcement = require("../models/announcementModel.js");
const Material = require("../models/materialModel.js");

// MENGAMBIL LIST CLASS SEBAGAI STUDENT ==================================
exports.StudentClassList = async (req, res) => {
  try {
    // Mengambil student_id dari frontend
    const student_id = req.params.student_id;

    const studentClasses = await Student_classes.findAll({
      where: { student_id: student_id },
      attributes: ["student_class_id", "createdAt"],
      include: [
        {
          model: Classes,
          attributes: ["class_id", "class_name", "desc", "category"],
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

// GET CLASS DATA
exports.getClassDataStudent = async (req, res) => {
  const class_id = req.params.class_id;

  try {
    const classData = await Classes.findOne({
      where: { class_id: class_id },
      attributes: ["class_name", "desc", "createdAt", "category"],
    });
    // Convert createdAt to a formatted string
    if (classData && classData.createdAt) {
      classData.createdAt = classData.createdAt.toISOString().split("T")[0];
    }

    res.status(200).json(classData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// JOIN CLASS ==================================
exports.JoinClass = async (req, res) => {
  const { student_id, classCode } = req.body;

  // jika panjang kode tidak sama dengan 6
  if (classCode.length !== 6) {
    return res.status(400).json({
      message: "Invalid class code. Class codes must be 6 characters long.",
    });
  }

  // jika data kelas tidak ada
  const existingClass = await Classes.findOne({ where: { code: classCode } });
  if (!existingClass) {
    return res.status(404).json({
      message: "Class not found with the provided code",
    });
  }

  // Periksa apakah siswa sudah tergabung dalam kelas tersebut
  const existingStudentClass = await Student_classes.findOne({
    where: {
      class_id: existingClass.class_id, // Pastikan cara Anda menyimpan ID kelas dalam model Student_classes
      student_id: student_id,
    },
  });

  // Jika siswa sudah tergabung dalam kelas yang sama
  if (existingStudentClass) {
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
exports.ClassContent = async (req, res) => {
  try {
    const class_id = req.params.class_id;

    const classContent = await Event.findAll({
      where: { class_id: class_id },
      attributes: [
        "event_id",
        "event_category_id",
        "event_name",
        "class_id",
        "createdAt",
      ],
      include: [
        {
          model: Material,
          attributes: ["material_id", "material_name", "file", "link"],
        },
        {
          model: Task,
          attributes: [
            "task_id",
            "task_name",
            "task_desc",
            "file",
            "link",
            "deadline",
          ],
        },
        {
          model: Announcement,
          attributes: ["nama", "content"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(classContent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// MENGAMBIL DAFTAR STUDENT BERDASARKAN ID KELAS
exports.StudentList = async (req, res) => {
  const class_id = req.params.class_id;

  try {
    const listStudent = await Student.findAll({
      attributes: ["student_id", "firstname", "lastname"],
      include: [
        {
          model: Student_classes,
          where: { class_id: class_id },
          attributes: ["student_class_id"],
        },
      ],
    });

    res.status(200).json(listStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// MENGHAPUS KELAS STUDENT / LEAVE CLASS
exports.deleteStudentFromClass = async (req, res) => {
  const { student_id, class_id } = req.body; // Menambahkan classCode dari frontend
  console.log("ini jalan", student_id, class_id);
  try {
    // Ganti "where" dengan "where: { student_id, class_id }"
    const deletedStudentClass = await Student_classes.destroy({
      where: { student_id, class_id },
    });

    if (deletedStudentClass > 0) {
      res.status(200).json({
        success: true,
        message: "Successfully left the class",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Student not found in the specified class",
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error });
  }
};
