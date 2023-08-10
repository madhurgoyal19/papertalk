import ChatPic from "../../assets/chat-pic.jpg";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ChatBubble = (chat: Chat) => {
  return (
    <div className="flex gap-5">
      <img src={ChatPic} className="w-8 h-8 rounded-full"></img>
      <div className="rounded-md ">{chat.result}</div>
    </div>
  );
};

export default ChatBubble;
