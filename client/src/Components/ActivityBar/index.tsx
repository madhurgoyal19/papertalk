// import ChatHistory from "@Components/ChatHistory";
import useLocalStorage from "@rehooks/local-storage";
import createChat from "@Utility/createChat.ts";
import { useNavigate } from "react-router-dom";

const ActivityBar = () => {
  const [chatList] = useLocalStorage<Array<ChatSmall>>("chatList");
  const Navigate = useNavigate();

  const createChatHandler = async () => {
    const chatId = await createChat();
    Navigate("/chats/" + chatId, { replace: true });
  };

  const openChatHandler = async (chatId: string) => {
    Navigate("/chats/" + chatId, { replace: true });
  };

  return (
    <div className="h-full w-72 bg-midnight-light border-r border-midnight-highlight">
      <div className="border-b border-midnight-highlight h-14 flex items-center text-white">
        <div>PaperTalk</div>
        <div></div>
      </div>
      <div className="p-2">
        <div
          onClick={createChatHandler}
          className="cursor-pointer bg-slate-300 m-1 rounded-sm text-base p-2 hover:-translate-y-1 transition"
        >
          New Chat
        </div>
        <section>
          {chatList?.map((chat: ChatSmall) => {
            return (
              <div
                onClick={() => openChatHandler(chat.chatId)}
                key={chat.chatId}
                className="cursor-pointer"
              >
                {chat.chatTitle}
              </div>
            );
          })}
        </section>
        <section></section>
      </div>
    </div>
  );
};

export default ActivityBar;
