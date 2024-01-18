import Close from "/close.svg";
// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 top-[-43.5%] left-[-13%] z-[9999] w-[100vw] h-[100vh] bg-black/40  flex items-center justify-center"
      onClick={onClose}>
      <div
        className="z-[9999] min-h-[50vh] w-[50vw] bg-white rounded-lg p-4 shadow-xl"
        onClick={stopPropagation}>
        <button onClick={onClose}>
          <img src={Close} className="h-8 w-8" />
        </button>
        <div className="w-full flex justify-center items-center">
          <p className="max-w-[40vw]">
            Sur cette page, vous verrez un graphique en forme de donut qui
            illustre le nombre moyen de films français par rapport au total des
            films projetés dans les cinémas de la région que vous avez
            sélectionnée. Si vous séléctionner plus de 2 régions celà vas
            comparer les 2 régions (ou plus).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
