import ChatPic from "@Assets/chat-pic.jpg";

interface ChatBubbleProps {
  Message: Message;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ChatBubble = (props: ChatBubbleProps) => {
  return (
    <div className="flex gap-5">
      <img src={ChatPic} className="w-8 h-8 rounded-full"></img>
      <div className="rounded-md ">{props.Message.content}</div>
    </div>
  );
};

export default ChatBubble;
