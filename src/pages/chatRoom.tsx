import { useEffect, useRef, useState } from "react";
import iconeEl from "../assets/attach-svgrepo-com.svg";

type Message = {
  text: string;
  user: string;
  room: string;
  date: string;
};

type Props = { socket: any };

const Chat_room = ({ socket }: Props) => {
  const [user, setUser] = useState("");
  const messageEl = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([{} as Message]);

  useEffect(() => {
    socket.connect();
    socket.on("message", (msg: Message) => {
      setMessages((state) => [...state, msg]);
    });
    return () => {
      socket.off("message");
    };
  }, []);
  useEffect(() => {
    const getUser = localStorage.getItem("__user");
    if (getUser) {
      let userEl = JSON.parse(getUser);
      setUser(userEl.userName);
    }
  }, []);

  useEffect(() => {
    socket.connect();
    socket.emit("oldMessages", { room: "community" });
    socket.on("oldmessages", (msg: any) => {
      const old = msg.old;
      setMessages((state) => [...old, ...state]);
    });
    return () => {
      socket.off("oldmessages");
    };
  }, []);

  useEffect(() => {
    if (messageEl.current) {
      messageEl.current.scrollIntoView();
    }
  }, [messages]);

  const handleMessageSend = () => {
    if (newMessage) {
      socket.emit("sendMessage", {
        text: newMessage,
        user,
        room: "community",
        date: new Date(),
      });
      setNewMessage("");
    }
  };

  return (
    <>
      <div className='flex flex-col h-[100%] min-h-screen w-screen bg-gray-900   text-white'>
        <div className='flex-1 p-4 w-[100%]'>
          {messages.map((message) => (
            <div
              key={message.date + message.user}
              className={`flex ${message.user == user ? "justify-end mr-2" : "justify-start"} mb-1 w-[100%]`}
            >
              <div
                className={`flex flex-col ${message.user == user ? "items-end mr-2" : "items-start"}  max-w-[80%]`}
              >
                <span className='w-fit h-fit my-1 font-bold text-sm text-gray-400'>
                  {message.user}
                </span>
                <div
                  className={` rounded-lg shadow-md w-fit p-2 ${message.user == user ? "bg-blue-500" : "bg-gray-600"}`}
                >
                  <p className='text-sm'>{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div className=' p-10' ref={messageEl}>
            {/*this div create that extra space at the end of the conversation */}
          </div>
        </div>
        <div className='flex flex-row space-x-2  items-center w-[100%] md:p4 p-2 bg-gray-800 fixed bottom-0 left-0'>
          <input
            type='text'
            placeholder='Type your message...'
            className='flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className=''>
            {open && (
              <div className='absolute top-[-150%] bg-gray-600 p-2 rounded mr-3 shadow-md flex-col flex'>
                <span className='p-2 font-medium border-0 border-b-2 border-gray-500 text-gray-300 hover:text-white'>
                  Image
                </span>
                <span className='p-2 font-medium text-gray-300 hover:text-white'>
                  Video
                </span>
              </div>
            )}

            <img src={iconeEl} onClick={() => setOpen(!open)} />
          </div>

          <button
            className='md:px-3 md:py-2  p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
            onClick={handleMessageSend}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat_room;
