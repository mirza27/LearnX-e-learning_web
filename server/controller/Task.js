import Task from "../models/taskModel.js";
import TaskUpload from "../models/taskUploadModel.js";
import Classes from "../models/classModel.js";
import Event from "../models/eventModel.js";
import Student from "../models/studentModel.js";
import Class from "../models/classModel.js";
import Student_classes from "../models/student_classesModel.js";

// MENNGAMBIL TUGAS / TASK SERTA HASIL UPLOAD JIKA ADA
export const GetTask = async (req, res) => {
  const event_id = req.params.event_id;
  const student_id = req.params.student_id;

  // jika student / membawa student_id
  if (student_id) {
    try {
      const TaskContent = await Event.findOne({
        where: { event_id: event_id },
        attributes: ["event_name", "createdAt"],
        include: [
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
            include: [
              {
                model: TaskUpload,
                attributes: [
                  "task_upload_id",
                  "student_id",
                  "file",
                  "link",
                  "comment",
                  "is_late",
                  "updatedAt",
                  "score",
                ],
                where: { student_id: student_id },
                required: false, // jika student_id tidak ada tetap menampilkan data Task
              },
            ],
          },
        ],
      });

      res.status(200).json(TaskContent);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    }

    // jika lectuer / tidak membawa student_id
  } else {
    try {
      const TaskContent = await Event.findOne({
        where: { event_id: event_id },
        attributes: ["event_name", "createdAt", "class_id"],
        include: [
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
        ],
      });

      res.status(200).json(TaskContent);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error: error });
    }
  }
};

// MENGAMBIL TASK UPLOAD SEMUA SISWA BERDASARKAN TASK ID
export const GetAllStudentTaskByTaskId = async (req, res) => {
  const task_id = req.params.task_id;
  const class_id = req.params.class_id;

  try {
    // Mengambil daftar student_id dari tabel Student_classes
    const studentIdList = await Student_classes.findAll({
      where: { class_id: class_id },
      attributes: ["student_id"],
    });

    // Mengambil daftar studentData berdasarkan student_id
    const studentData = await Student.findAll({
      where: { student_id: studentIdList.map((row) => row.student_id) },
      attributes: ["student_id", "firstname"],
    });

    const taskStudentData = await Student.findAll({
      where: {
        student_id: studentData.map((row) => row.student_id),
      },
      attributes: ["student_id", "firstname", "lastname"],
      include: [
        {
          model: TaskUpload,
          attributes: [
            "task_upload_id",
            "task_id",
            "is_late",
            "updatedAt",
            "score",
          ],
          where: { task_id: task_id },
          required: false,
        },
      ],
    });

    res.status(200).json(taskStudentData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// MENGAMBIL SEMUA TUGAS BERDASARKAN TASK ID
export const GetAllTaskByLecturerId = async (req, res) => {
  const lecturer_id = req.params.lecturer_id;

  try {
    // Subquery untuk mendapatkan class_id
    const classData = await Class.findAll({
      attributes: ["class_id"],
      where: {
        lecturer_id: lecturer_id,
      },
    });

    const classIds = classData.map((row) => row.class_id);

    // Query utama untuk mendapatkan tugas dari event dengan class_id yang dihasilkan oleh subquery
    const taskData = await Event.findAll({
      where: {
        event_category_id: 1,
        class_id: classIds,
      },
      include: [
        {
          model: Task,
          attributes: ["task_id", "task_name", "deadline"],
        },
      ],
    });

    res.status(200).json(taskData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// MENGGAMBIL TASK UPLOAD
export const getTaskUpload = async (req, res) => {
  const task_upload_id = req.params.task_upload_id;

  try {
    const TaskUploadContent = await TaskUpload.findOne({
      where: { task_upload_id: task_upload_id },
      attributes: [
        "task_upload_id",
        "link",
        "file",
        "comment",
        "updatedAt",
        "is_late",
        "score",
      ],
    });

    res.status(200).json(TaskUploadContent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// UPDATE TASK UPLOAD
export const updateTaskUpload = async (req, res) => {
  const { task_upload_id, link, file, comment } = req.body;

  try {
    const [updatedRows] = await TaskUpload.update(
      { link, file, comment },
      {
        where: { task_upload_id: task_upload_id },
        fields: ["link", "file", "comment"], // Specify the columns to update
      }
    );

    if (updatedRows > 0) {
      res.status(200).json({ message: "Your Assignment updated successfully" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// MENGUMPULKAN TUGAS
export const addTaskUpload = async (req, res) => {
  const { task_id, student_id, link, file, comment } = req.body;

  try {
    await TaskUpload.create({
      task_id: task_id,
      student_id: student_id,
      link: link,
      file: file,
      coment: comment,
    });

    res.status(200).json({ message: "Task Uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// MEMBUAT TASK
export const addNewTask = async (req, res) => {
  const { event_name, class_id, task_name, task_desc, file, link, deadline } =
    req.body;

  try {
    // Membuat data event
    const eventContent = await Event.create({
      event_category_id: 1,
      event_name: event_name,
      class_id: class_id,
      createdAt: new Date(),
    });

    // Membuat data task dengan URL gambar yang diunggah
    await Task.create({
      event_id: eventContent.event_id,
      task_name: task_name,
      task_desc: task_desc,
      file: file, // Menggunakan URL gambar yang diunggah
      link: link,
      deadline: new Date(deadline),
    });

    res.status(200).json({
      message: "New Task created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// MENGUPDATE NILAI TASK UPLOAD STUDENT
export const updateScore = async (req, res) => {
  const { task_upload_id, score } = req.body;

  try {
    await TaskUpload.update(
      {
        score,
      },
      {
        where: { task_upload_id: task_upload_id },
        fields: ["score"],
      }
    );

    res.status(200).json({
      message: "Task Upload Scored successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

export const StudentTaskList = async (req, res) => {
  const student_id = req.params.student_id;
  const is_all = req.params.is_all === "1"; // Convert to boolean

  try {
    // Fetching list of classes for the student
    const studentClasses = await Student_classes.findAll({
      where: { student_id: student_id },
      attributes: ["student_class_id", "createdAt", "class_id"],
    });

    const classList = studentClasses.map((row) => row.class_id);

    // Filtering conditions based on is_all
    const taskFilter = {
      where: {
        class_id: classList,
        event_category_id: 1,
      },
      attributes: ["event_name", "event_id", "class_id"],
      include: [
        {
          model: Task,
          attributes: ["task_name", "task_id", "deadline"],
          required: true,
          include: [
            {
              model: TaskUpload,
              attributes: ["task_upload_id", "is_late", "updatedAt", "score"],
              where: { student_id: student_id },
              required: !is_all, // Show only tasks that haven't been done if is_all is false
            },
          ],
        },
      ],
    };

    // Fetching the task list based on the filter
    const taskList = await Event.findAll(taskFilter);

    res.status(200).json(taskList);
    // res.status(200).json(classList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
