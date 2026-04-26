import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

function Chat() {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  //
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  // CODE To fetch already existing chat with help of API
  const fetchChatMessage = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(chat.data.message);
    const chatMessage = chat?.data?.message.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg.text,
      };
    });
    setMessages(chatMessage);
  };

  useEffect(() => {
    fetchChatMessage();
  }, []);

  // As soon as page loads we want to connect to server

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    // from here we are sending join chat event to the  backend socket file, we are sending details like targetUserId(to whom we want to chat)
    //
    socket.emit("joinchat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("message Received", ({ firstName, lastName, text }) => {
      // text contain the message coming from backend
      console.log(firstName + " " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    // As soon as chat  component unmount socket is disconnected.
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    // through this event we are sending these messages { firstName: user.firstName,userId,targetUserId,text: newMessage,  }
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  //
  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col ">
      <h1 className="p-5 border-gray-600">Chat</h1>
      {/* one div for displaying chat message */}
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " +
                (user?.firstName === msg?.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName}`}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      {/* one div for input box and chat btn */}
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-600 text-black rounded p-2"
        ></input>
        <button
          onClick={sendMessage}
          className="bg-pink-700 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
