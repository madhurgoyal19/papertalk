import ActivityBar from "../ActivityBar";
import ChatBar from "../ChatBar";
import DocWindow from "../DocWindow";

const Workspace = () => {
  return (
    <section className="flex flex-row w-full h-screen">
      <ActivityBar />
      <ChatBar />
      <DocWindow />
    </section>
  );
};

export default Workspace;
