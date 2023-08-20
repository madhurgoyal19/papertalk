import useLocalStorage from "@rehooks/local-storage";

interface ChatHistoryProps {
  visible: boolean;
}

const ChatHistory = (props: ChatHistoryProps) => {
  const [chatList] = useLocalStorage<Array<Chat>>("chatList");
  if (!props.visible) return;

  return (
    <div>
      {chatList?.map((chat) => {
        return <div>{chat.chatTitle}</div>;
      })}
    </div>
  );
};

export default ChatHistory;
