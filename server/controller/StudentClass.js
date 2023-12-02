import Student_classes from "../models/student_classesModel.js";
import Classes from "../models/classModel.js";
import Lecturer from "../models/lecturerModel.js";
import Event from "../models/eventModel.js";
import Task from "../models/taskModel.js";
import Student from "../models/studentModel.js";
import Announcement from "../models/announcementModel.js";
import Material from "../models/materialModel.js";

// MENGAMBIL LIST CLASS SEBAGAI STUDENT ==================================
export const StudentClassList = async (req, res) => {
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
export const getClassDataStudent = async (req, res) => {
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
export const JoinClass = async (req, res) => {
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
export const ClassContent = async (req, res) => {
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
    });

    res.status(200).json(classContent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
