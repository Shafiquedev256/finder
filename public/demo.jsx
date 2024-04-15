import { useState, useEffect } from "react";
import { UseAuth } from "../authentications/auth";
import SendIcone from "../assets/send-svgrepo-com.svg";
import { SentMessage } from "../components/message";
import { ChatroomHeader } from "../components/header";

type MESSAGE = {
  message: string;
  room: string;
  userName: string;
  userEmail: string;
};

const ChatRoom = ({ socket }: any) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MESSAGE[]>([]);

  const user = UseAuth().userEl;
  const room = UseAuth().inChartRoom().name;

  useEffect(() => {
    socket.on("message", (msg: MESSAGE) => {
      setMessages((state) => [...state, msg]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    socket.emit("getOldmessages", { old: true });
    socket.on("oldmessages", (msg: any) => {
      const old = msg.old;
      setMessages((state) => [...old, ...state]);
    });
    return () => {
      socket.off("oldmessages");
    };
  }, [socket]);

  const handleInputChange = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message) {
      socket.emit("sendMessage", { message, ...user, room });
    }
    setMessage("");
  };

  return (
    <>
      <ChatroomHeader />
      <div className='flex flex-col h-screen bg-blue-100 bg-opacity-25 relative overflow-scroll'>
        {messages &&
          messages.map((item) => {
            if (item.userName === user.name) {
              return (
                <div className='flex justify-end'>
                  <SentMessage
                    message={item.message}
                    color='bg-green-500'
                    userName='You'
                  />
                </div>
              );
            }
            return (
              <SentMessage
                message={item.message}
                color='bg-purple-500'
                userName={item.userName}
              />
            );
          })}
        <div className='p-1 bg-none w-screen h-[150px] my-16'></div>
        <div className='flex items-center justify-center fixed bottom-0 bg-white w-screen left-0'>
          <input
            type='text'
            value={message}
            onChange={handleInputChange}
            placeholder='Type your message...'
            className='outline-none  py-5 px-2 border-0 w-4/5'
          />
          <button
            onClick={handleSendMessage}
            className='bg-blue-500 text-white flex items-center py-1.5 w-1/5 border-0'
          >
            <img src={SendIcone} className='' alt='img' />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
