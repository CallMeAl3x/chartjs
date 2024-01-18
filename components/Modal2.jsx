import Close from "/close.svg";
// eslint-disable-next-line react/prop-types
const Modal2 = ({ isOpen, onClose }) => {
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
        className="z-[9999] h-fit pb-12 w-[50vw] bg-white rounded-lg p-4 shadow-xl"
        onClick={stopPropagation}>
        <button onClick={onClose}>
          <img src={Close} className="h-8 w-8" />
        </button>
        <div className="w-full flex justify-center items-center">
          <p className="max-w-[40vw]">
            Sur cette page, vous trouverez un graphique en forme de barres qui
            affiche le nombre total de sièges de cinéma par région, une donnée
            que vous pouvez modifier selon la région choisie.
            <br />
            <br />
            Vous pouvez via le bouton voir le nombre moyen de sièges par
            personne dans la région sélectionnée.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
