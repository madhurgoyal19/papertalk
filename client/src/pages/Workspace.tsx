import ActivityBar from "@Components/ActivityBar";
import ChatWindow from "@Components/ChatWindow";
import DocWindow from "@Components/DocWindow";
import createChat from "@Utility/createChat";
import { useParams } from "react-router-dom";

const Workspace = () => {
  let { chatId } = useParams();
  // const Navigate = useNavigate();

  if (!chatId) {
    chatId = createChat();
    // Navigate("/chats/" + newChatId, { replace: true });
  }

  return (
    <section className="flex flex-row w-full h-screen">
      <ActivityBar />
      <ChatWindow chatId={chatId!} />
      <DocWindow chatId={chatId!} />
    </section>
  );
};

export default Workspace;
