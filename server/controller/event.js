const Event = require("../models/eventModel.js");
const Student_classes = require("../models/student_classesModel.js");
const Classes = require("../models/classModel.js");

// MENGAMBIL SEMUA EVENT TERBARU BERDASARKAN STUDENT ID
exports.getAllEventByStudent = async (req, res) => {
  const student_id = req.params.student_id;

  try {
    const studentClasses = await Student_classes.findAll({
      where: { student_id: student_id },
      attributes: ["class_id"],
    });

    const classList = studentClasses.map((row) => row.class_id);

    const eventList = await Event.findAll({
      where: { class_id: classList },
      attributes: ["event_name", "event_id", "createdAt", "event_category_id"],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(eventList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// MENGAMBIL SEMUA EVENT TERBARU BERDASARKAN LECTURER ID
exports.getAllEventByLecturer = async (req, res) => {
  const lecturer_id = req.params.lecturer_id;

  try {
    const lecturerClasses = await Classes.findAll({
      where: { lecturer_id: lecturer_id },
      attributes: ["class_id"],
    });

    const classList = lecturerClasses.map((row) => row.class_id);

    const eventList = await Event.findAll({
      where: { class_id: classList },
      attributes: ["event_name", "event_id", "createdAt", "event_category_id"],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(eventList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
