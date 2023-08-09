import { useState } from "react";
import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Toggle = (toggleState: any, toggleHandler: any) => {
  const [currentState, setCurrentState] = useState<boolean>(toggleState);
  const currentStateHandler = () => {
    setCurrentState(!currentState);
    toggleHandler();
  };
  return (
    <div>
      <div
        className={`w-12 ${
          currentState ? "bg-midnight-highlight" : "bg-blue-700"
        } h-7 rounded-full flex items-center px-1 transition-all duration-300`}
        onClick={currentStateHandler}
        style={{ justifyContent: currentState ? "flex-start" : "flex-end" }}
      >
        <motion.div
          layout
          className={`${
            currentState ? "bg-slate-400" : "bg-white"
          } w-5 h-5 rounded-full`}
        ></motion.div>
      </div>
    </div>
  );
};

export default Toggle;
