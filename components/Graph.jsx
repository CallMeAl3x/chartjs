import { useNumberStore } from "../hooks/useNumber";
import Close from "/close.svg";
import graph1 from "/graph1.png";
import graph2 from "/graph2.png";
import graph3 from "/graph3.png";
import pdf from "/BONEFONS_CEDRONE_KOUMAGNANOU_Data.pdf";
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
        {currentNumber === 1 && (
          <div>
            <img src={graph1} alt="" className="h-full w-full" />
            <a
              href={pdf}
              type="file"
              target="_blank"
              download="Graphique 1"
              rel="noreferrer">
              <button>Télécharger tout les graphs en PDF</button>
            </a>
          </div>
        )}
        {currentNumber === 2 && (
          <div>
            <img src={graph2} alt="" className="h-full w-full" />
            <a
              href={pdf}
              type="file"
              target="_blank"
              download="Graphique 1"
              rel="noreferrer">
              <button>Télécharger tout les graphs en PDF</button>
            </a>
          </div>
        )}
        {currentNumber === 3 && (
          <div>
            <img src={graph3} alt="" className="h-full w-full" />
            <a
              href={pdf}
              type="file"
              target="_blank"
              download="Graphique 1"
              rel="noreferrer">
              <button>Télécharger tout les graphs en PDF</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Graph1;
