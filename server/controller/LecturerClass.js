import Student_classes from "../models/student_classesModel.js";
import Lecturer from "../models/lecturerModel.js";
import Classes from "../models/classModel.js";
import Event from "../models/eventModel.js";
import Task from "../models/taskModel.js";
import Announcement from "../models/announcementModel.js";
import Material from "../models/materialModel.js";

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

// MENGAMBIL LIST MYCLASS SEBAGAI LECTURER ==================================
export const LecturerClassList = async (req, res) => {
  try {
    const lecturer_id = req.params.lecturer_id;

    const LecturerClass = await Classes.findAll({
      where: { lecturer_id: lecturer_id },
      attributes: [
        "class_id",
        "class_name",
        "code",
        "desc",
        "category",
        "createdAt",
      ],
    });

    res.status(200).json(LecturerClass);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// GET CLASS DATA
export const getClassData = async (req, res) => {
  const class_id = req.params.class_id;

  try {
    const classData = await Classes.findOne({
      where: { class_id: class_id },
      attributes: [
        "class_id",
        "class_name",
        "desc",
        "createdAt",
        "category",
        "code",
      ],
    });

    // Convert createdAt to a formatted string
    if (classData && classData.createdAt instanceof Date) {
      classData.createdAt = classData.createdAt.toISOString().split("T")[0];
    }

    console.log(classData.createdAt);
    res.status(200).json(classData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// ADD NEW CLASS ==================================
export const addNewClass = async (req, res) => {
  const { lecturer_id, class_name, desc, category } = req.body;

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
        category: category,
      });
      res.status(200).json({
        message: `New Class created successfully with code ${classCode}`,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  }
};

// MENGAMBIL CONTENT MYCLASS SEBAGAI LECTURER
export const MyClassContent = async (req, res) => {
  const class_id = req.params.class_id;

  try {
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
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json(classContent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
