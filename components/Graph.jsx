import { useNumberStore } from "../hooks/useNumber";
import logo from "/logo.svg";
import france from "/france.svg";
import Close from "/close.svg";
// eslint-disable-next-line react/prop-types
const Graph1 = ({ isOpen, onClose }) => {
  const { currentNumber } = useNumberStore();
  if (!isOpen) {
    return null;
  }

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 top-[-43.5%] left-[-565%] z-[99999] w-[100vw] h-[100vh] bg-black/40  flex items-center justify-center"
      onClick={onClose}>
      <div
        className="z-[99999] min-h-[50vh] w-[50vw] bg-white rounded-lg p-4 shadow-xl flex justify-start items-start"
        onClick={stopPropagation}>
        <button onClick={onClose}>
          <img src={Close} className="h-8 w-8" />
        </button>
        {currentNumber === 1 && <img src={logo} alt="" className="h-24 w-24" />}
        {currentNumber === 2 && (
          <img src={france} alt="" className="h-24 w-24" />
        )}
        {currentNumber === 3 && <img src={logo} alt="" className="h-24 w-24" />}
      </div>
    </div>
  );
};

export default Graph1;
