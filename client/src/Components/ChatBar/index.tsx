import { useState } from "react";
import { motion } from "framer-motion";
import ChatBubble from "../../Components/ChatBubble";
import Toggle from "../../Components/Toggle";
import chain from "../../Services/localModels";

interface ChatAreaProps{
  ChatHistory: Array<Chat>
}

const ChatArea = (props:ChatAreaProps) => {
  const [localMode, setLocalMode] = useState<boolean>(false);
  const localModeHandler = () => {
    setLocalMode(!localMode);
  };
  console.log(props.ChatHistory)
  return (
    <div className="flex-1 flex flex-col self-center w-full max-w-[768px] px-4 max-lg:px-0  pt-8">
      <section className="flex-1">
        {props.ChatHistory.map((chat: Chat) => {
        return <ChatBubble {...chat}/>;
        })}
      </section>

      <div className="text-center mt-10 pb-20">
        <div className="w-auto flex justify-center pb-8">
          <Toggle toggleState={localMode} toggleHandler={localModeHandler} />
        </div>
        <p>To get started, enter your OpenAI API key below.</p>
        <span className="text-xs">
          Your API Key is stored locally on your browser and never sent anywhere
          else.
        </span>
        <p>Enter OpenAI Key</p>
      </div>
    </div>
  );
};

const ChatHeader = () => {
  return (
    <div className="flex-none flex border-b justify-center border-midnight-highlight h-14 items-center px-3">
      Chat Name & Details
    </div>
  );
};

interface PromptInputProps{
  ChatHistory: Array<Chat>,
  ChatHandler: (arg0: Chat) => void
}

const PromptInput = (props: PromptInputProps) => {
  const [prompt, setPrompt] = useState<string>("");

  const submitPromptHandler = async () => {
    if (prompt.length == 0) return;
    props.ChatHandler({user: "User", result: prompt})
    const result = await chain.call({ question: prompt });
    props.ChatHandler({user:"GPT", result: result.text});
    // chatHandler(result);
    console.log(result);
  };

  return (
    <div className="flex-none self-center w-full max-w-[768px] px-3 max-lg:px-0  pb-3">
      <input
        className="w-full h-12 bg-midnight-highlight rounded-xl text-white px-4 focus:outline-none  focus:outline-blue-600 "
        placeholder="Ask your question"
        value={prompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
        onKeyUp={(e) => {
          e.key == "Enter" && submitPromptHandler();
        }}
      />
    </div>
  );
}

const ChatBar = () => {
  const [expand, setExpand] = useState<boolean>(false);
  const variants = {
    expand: { width: "60%" },
    closed: { width: "30vw" },
  };
  const [chatHistory, setChatHistory] = useState<Chat[]>([
    {user: "GPT", result: "Hi, I am a GPT Bot."}
  ]);

  const historyHandler = (newChat: Chat) => {
    chatHistory.push(newChat);
    setChatHistory(chatHistory);
    console.log(chatHistory);
  }

  return (
    <motion.div
      animate={expand ? "closed" : "expand"}
      variants={variants}
      className={`bg-midnight-light   text-white relative border-l border-midnight-highlight flex flex-col`}
    >
      <ChatHeader />

      <section className="flex-1 flex flex-col ">
        <ChatArea ChatHistory={chatHistory}/>
        <PromptInput ChatHistory={chatHistory} ChatHandler={historyHandler}   />
      </section>
    </motion.div>
  );
};

export default ChatBar;
