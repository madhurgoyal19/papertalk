//*? Imports from Node Modules
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

//*? Imports from src
import ChatBubble from "@Components/ChatBubble";
import chain from "@Services/localModels";
import { ChatTable } from "@Database";

interface ChatAreaProps {
  Messages: Array<Message> | null;
  Loading: boolean;
}
interface PromptInputProps {
  Context: Array<Message> | null;
  ChatHandler: (arg0: Message) => void;
  Loading: boolean;
  LoadingHandler: () => void;
}
interface ChatWindowProps {
  chatId: string;
}

const Header = () => {
  return (
    <div className="flex-none flex border-b justify-center border-midnight-highlight h-14 items-center px-3">
      Chat Name & Details
    </div>
  );
};

const ChatArea = (props: ChatAreaProps) => {
  const container = useRef<HTMLDivElement>(null);

  const Scroll = () => {
    if (container) {
      const { offsetHeight, scrollHeight, scrollTop } =
        container.current as HTMLDivElement;

      if (scrollHeight <= scrollTop + offsetHeight + 100) {
        container.current?.scrollTo(0, scrollHeight);
      }
    }
  };

  useEffect(() => {
    Scroll();
  }, [props.Messages]);

  return (
    <div
      className="flex-1 flex justify-center w-full pt-8 overflow-y-scroll custom-scrollbar"
      ref={container}
    >
      <section className="flex-1 flex flex-col w-full max-w-[768px] mx-4 max-lg:mx-0 h-max pb-[18%]">
        {props.Messages &&
          props.Messages.map((message: Message, index: number) => {
            return <ChatBubble Message={message} key={index} />;
          })}
        {props.Loading ? <div className="text-center">Loading...</div> : ""}
      </section>
    </div>
  );
};

const PromptInput = (props: PromptInputProps) => {
  const submitPromptHandler = async (e: {
    key: string;
    currentTarget: { value: string };
  }) => {
    // Only run when the Enter key is pressed
    if (e.key != "Enter") return;
    const prompt = e.currentTarget.value;
    if (prompt.length == 0) return;
    e.currentTarget.value = "";
    props.ChatHandler({ role: "user", content: prompt });

    let chat_history = "";
    props.Context?.map((message: Message) => {
      chat_history += message.role + ": " + message.content + "\n";
    });

    props.LoadingHandler();
    const result = await chain.call({
      chat_history: chat_history,
      question: prompt,
    });
    props.LoadingHandler();
    if (result) {
      props.ChatHandler({ role: "assistant", content: result.text });
    }
  };

  return (
    <div className="">
      <input
        disabled={props.Loading}
        className="w-full h-14 bg-midnight-highlight rounded-xl text-white px-6 focus:outline-none  focus:outline-blue-600 text-lg"
        placeholder="Ask your question"
        onKeyUp={submitPromptHandler}
      />
    </div>
  );
};

const ChatWindow = (props: ChatWindowProps) => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    ChatTable.get(props.chatId).then((chat: Chat | undefined) => {
      if (!chat) return;
      setMessages(chat.messages);
    });
  }, [props.chatId]);

  useEffect(() => {
    if (messages.length > 0)
      ChatTable.update(props.chatId, { messages: [...messages] });
  }, [messages]);

  // const variants = {
  //   expand: { width: "50%" },
  //   closed: { width: "30vw" },
  // };

  const historyHandler = (ChatMessage: Message) => {
    setMessages((messages) => [...messages, ChatMessage]);
  };
  console.log(messages);

  const loadingHandler = () => {
    setLoading((loading) => !loading);
  };

  return (
    <motion.div
      // animate={"expand"}
      // variants={variants}
      className={`bg-midnight-light w-[50%] text-white relative border-r border-midnight-highlight  chat-window flex flex-col`}
    >
      <Header />
      <ChatArea Messages={messages} Loading={loading} />
      <div className="gradient-blur h-[15%]">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="flex-none self-center w-full max-w-[768px] px-3 max-lg:px-0 absolute bottom-[30px] z-10 ">
        {/* <div className="text-center mt-10 pb-20">
          <div className="w-auto flex justify-center pb-8"></div>
          <p>To get started, enter your OpenAI API key below.</p>
          <span className="text-xs">
            Your API Key is stored locally on your browser and never sent
            anywhere else.
          </span>
          <p>Enter OpenAI Key</p>
        </div> */}
        <PromptInput
          Context={messages}
          ChatHandler={historyHandler}
          Loading={loading}
          LoadingHandler={loadingHandler}
        />
      </div>
    </motion.div>
  );
};

export default ChatWindow;
