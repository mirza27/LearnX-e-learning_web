import Chat from "../models/chatModel.js";

// MENGAMBIL RIWAYAT CHAT BERDASARKAN CLASS ID
export const getChat = async (req, res) => {
  const class_id = req.params.class_id;

  try {
    const messageData = await Chat.findAll({
      where: { class_id: class_id },
      attributes: ["class_id", "sender_id", "sender", "content", "createdAt"],
    });

    res.status(200).json(messageData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// MENYIMPAN DATA CHAT
export const saveChat = async (req, res) => {
  const { class_id, sender_id, content, sender } = req.body;

  try {
    await Chat.create({
      class_id: class_id,
      sender_id: sender_id,
      sender: sender,
      content: content,
    });

    res.status(200).json({ message: "Chat saved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};
