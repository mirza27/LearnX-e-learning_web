import Event from "../models/eventModel.js";
import Announcement from "../models/announcementModel.js";

// MENGAMBIL ISI PENGUMUMAN
export const getAnnouncement = async (req, res) => {
  const event_id = req.params.event_id;

  try {
    const announcementContent = await Event.findOne({
      where: { event_id: event_id },
      attributes: ["event_name", "createdAt"],
      include: [
        {
          model: Announcement,
          attributes: ["announcement_id", "nama", "content"],
        },
      ],
    });

    res.status(200).json(announcementContent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// MEMBUAT PENGUMUMAN BARU
export const addNewAnnouncement = async (req, res) => {
  const { event_name, class_id, nama, content } = req.body;

  try {
    const eventContent = await Event.create({
      event_category_id: 3,
      event_name: event_name,
      class_id: class_id,
    });

    await Announcement.create({
      event_id: eventContent.event_id,
      nama: nama,
      content: content,
    });

    res.status(200).json({
      message: "New Announcement created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
