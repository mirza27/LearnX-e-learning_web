import Event from "../models/eventModel.js";
import Material from "../models/materialModel.js";

// MENGAMBIL ISI MATERIAL
export const getMaterial = async (req, res) => {
  const event_id = req.params.event_id;

  try {
    const materialContent = await Event.findOne({
      where: { event_id: event_id },
      attributes: ["event_name", "createdAt"],
      include: [
        {
          model: Material,
          attributes: ["material_id", "file", "link", "material_name"],
        },
      ],
    });

    res.status(200).json(materialContent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

// MEMBUAT MATERIAL BARU
export const addNewMaterial = async (req, res) => {
  const { event_name, class_id, file, link, material_name } = req.body;

  try {
    const eventContent = await Event.create({
      event_category_id: 2,
      event_name: event_name,
      class_id: class_id,
    });

    await Material.create({
      event_id: eventContent.event_id,
      file: file,
      link: link,
      material_name: material_name,
    });

    res.status(200).json({
      message: "New Material created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
