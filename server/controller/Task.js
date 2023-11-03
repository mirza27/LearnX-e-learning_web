import Lecturer from "../models/lecturerModel.js";
import Student from "../models/studentModel.js";
import Task from "../models/taskModel.js";
import TaskUpload from "../models/taskUploadModel.js";
import Event from "../models/eventModel.js";

// MENNGAMBIL TUGAS / TASK SERTA HASIL UPLOAD JIKA ADA
export const GetTask = async (req, res) => {
  const event_id = req.params.event_id;
  const student_id = req.params.student_id;

  // jika student / membawa student_id
  if (student_id) {
    try {
      const TaskContent = await Event.findOne({
        where: { event_id: event_id },
        attributes: ["createdAt"],
        include: [
          {
            model: Task,
            attributes: ["task_name", "task_desc", "file", "link", "deadline"],
            include: [
              {
                model: TaskUpload,
                attributes: [
                  "task_Upload_id",
                  "student_id",
                  "file",
                  "link",
                  "coment",
                ],
                where: { student_id: student_id },
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
        attributes: ["createdAt"],
        include: [
          {
            model: Task,
            attributes: ["task_name", "task_desc", "file", "link", "deadline"],
            include: [
              {
                model: TaskUpload,
                attributes: [
                  "task_Upload_id",
                  "student_id",
                  "file",
                  "link",
                  "coment",
                ],
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
  const { event_name, class_id, task_desc, file, link, deadline } = req.body;

  try {
    // membuat data event
    const eventContent = await Event.create({
      event_category_id: 1,
      event_name: event_name,
      class_id: class_id,
    });

    // membuat data task
    await Task.create({
      event_id: eventContent.event_id,
      task_desc: task_desc,
      file: file,
      link: link,
      deadline: deadline,
    });

    res.status(200).json({
      message: "New Task created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
