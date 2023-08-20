// import ChatHistory from "@Components/ChatHistory";
import useLocalStorage from "@rehooks/local-storage";
import createChat from "@Utility/createChat.ts";
import { useNavigate } from "react-router-dom";

const ActivityBar = () => {
  const [chatList] = useLocalStorage<Array<ChatSmall>>("chatList");
  const Navigate = useNavigate();

  const createChatHandler = () => {
    const chatId = createChat();
    Navigate("/chats/" + chatId, { replace: true });
  };

  return (
    <div className="h-full w-72 bg-midnight-light border-r border-midnight-highlight">
      <div className="border-b border-midnight-highlight h-14 flex items-center text-white">
        <div>PaperTalk</div>
        <div></div>
      </div>
      <div>
        <div onClick={createChatHandler} className="cursor-pointer">
          New Chat
        </div>
        <section>
          {chatList?.map((chat: ChatSmall) => {
            return <div key={chat.chatId}>{chat.chatTitle}</div>;
          })}
        </section>
        <section></section>
      </div>
    </div>
  );
};

export default ActivityBar;
