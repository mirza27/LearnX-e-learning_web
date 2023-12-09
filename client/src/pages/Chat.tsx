import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MessageBox, Input, Button } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import Swal from "sweetalert2";
import ScrollToBottom from "react-scroll-to-bottom";
import "../styles/chat.css";

interface ChatRoom {
  user_id: string;
  firstname: string;
  socket: any;
  roomClass: string;
}

interface Message {
  class_id: string;
  sender: string;
  sender_id: string;
  content: string;
  time: Date;
}
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function Chat(props: ChatRoom) {
  const [currentMessage, setCurrentMessage] = useState("");
  // const [messages, setMessage] = useState<any[]>([]);
  const [messageList, setMessageList] = useState<any[]>([]);
  const { user_id, firstname, socket, roomClass } = props;

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const message = {
        class_id: roomClass,
        sender: firstname,
        sender_id: user_id,
        content: currentMessage,
        createdAt: new Date(Date.now()),
      };

      // menyimpan riwayat chat
      try {
        const response = await axios.post(
          `${API_BASE_URL}/user/forum/save-chat`,
          {
            class_id: roomClass,
            sender_id: user_id,
            sender: firstname,
            content: currentMessage,
          }
        );
      } catch (error) {
        console.error("Error sending message:", error);
        return;
      }

      await socket.emit("send-message", message);
      setMessageList((list) => [...list, message]);
      setCurrentMessage("");
    }
  };

  // load chat history
  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/user/forum/get-chat/${roomClass}`
      );
      setMessageList(response.data); // Mengatur riwayat chat ke state
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // jika enter saat mengiri pesan
  const handleKeyPress = (e: any) => {
    // Cek apakah tombol yang ditekan adalah tombol "Enter" (kode kunci 13)
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    // load riwayat chat terlebih dahulu
    fetchChatHistory();

    // mengirim pesan ke semua berdasarkan room yang sama
    socket.on("receive-message", (message: Message) => {
      setMessageList((list) => [...list, message]);
    });
  }, [socket]);

  return (
    <main>
      <div className="chat-window">
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageItem, index) => (
              <MessageBox
                key={index}
                position={messageItem.sender_id === user_id ? "right" : "left"}
                type="text"
                text={messageItem.content}
                title={messageItem.sender}
                date={messageItem.createdAt}
                id={index}
                focus={false}
                titleColor="black"
                replyButton={false}
                forwarded={false}
                reply={""} // Specify if it's a reply to another message
                onReplyMessageClick={() => console.log("reply clicked!")}
                removeButton={false}
                status={"sent"}
                notch={false}
                retracted={false}
              />
            ))}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <Input
            placeholder="Type here..."
            autoHeight={true}
            onChange={(e: any) => setCurrentMessage(e.target.value)}
            value={currentMessage}
            onKeyPress={handleKeyPress}
            rightButtons={
              <Button
                color="white"
                backgroundColor="black"
                text="Send"
                onClick={sendMessage}
              />
            }
            maxHeight={100}
          />
        </div>
      </div>
    </main>
  );
}

export default Chat;
