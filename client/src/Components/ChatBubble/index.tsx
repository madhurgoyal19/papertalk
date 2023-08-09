import ChatPic from "../../assets/chat-pic.jpg";

const ChatBubble = () => {
  return (
    <div className="flex gap-5">
      <img src={ChatPic} className="w-8 h-8 rounded-full"></img>
      <div className="rounded-md ">Test text</div>
    </div>
  );
};

export default ChatBubble;
