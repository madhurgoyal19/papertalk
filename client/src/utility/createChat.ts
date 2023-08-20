import { v4 as uuidv4 } from "uuid";
import { ChatTable } from "@Database";
import { writeStorage } from "@rehooks/local-storage";

const createChat = () => {
  const newChat = localStorage.getItem("newChat");

  if (newChat) {
    return newChat;
  }
  const chatId = uuidv4();
  const chatList = localStorage.getItem("chatList");
  if (chatList) {
    const data = JSON.parse(localStorage.getItem("chatList")!);
    writeStorage("chatList", [...data, { chatId, chatTitle: "Welcome" }]);
  } else {
    writeStorage("chatList", [{ chatId, chatTitle: "Welcome" }]);
  }
  writeStorage("newChat", chatId);

  ChatTable.add(
    {
      chatId,
      chatTitle: "Welcome",
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an intelligent GPT bot that can help you to summarize the paper.",
        },
      ],
      updatedAt: new Date(),
    },
    chatId
  );
  return chatId;
};

export default createChat;
