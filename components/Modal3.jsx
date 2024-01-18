import Close from "/close.svg";
// eslint-disable-next-line react/prop-types
const Modal3 = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 top-[-43.5%] left-[-26%] z-[9999] w-[100vw] h-[100vh] bg-black/40  flex items-center justify-center"
      onClick={onClose}>
      <div
        className="z-[9999] min-h-[50vh] w-[50vw] bg-white rounded-lg p-4 shadow-xl"
        onClick={stopPropagation}>
        <button onClick={onClose}>
          <img src={Close} className="h-8 w-8" />
        </button>
        <div className="w-full flex justify-center items-center">
          <p className="max-w-[40vw]">
            Sur cette page, vous verrez un graphique en forme de lignes qui
            illustre la répartition des films d&lsquo;initiative française selon
            leur budget d&lsquo;investissement pour chaque année (de 1994 à
            2022)
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal3;
