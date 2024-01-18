import { useState } from "react";
import Graph from "./Graph";

const Download = () => {
  const [isGraphOpen, setIsGraphOpen] = useState(false);

  const openGraph = () => {
    setIsGraphOpen(true);
  };

  const closeGraph = () => {
    setIsGraphOpen(false);
  };

  return (
    <div className="lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2 top-[5.8%] left-[49.3%] h-[7.5vh] w-[8vw] z-[99]">
      <button className="relative bg-white rounded-full p-3 flex justify-center items-center top-[25%] left-[34%]">
        <img src="/download.svg" className="h-10 w-10" onClick={openGraph} />
        <Graph isOpen={isGraphOpen} onClose={closeGraph} />
      </button>
    </div>
  );
};

export default Download;
