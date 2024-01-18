import { useNumberStore } from "../hooks/useNumber";

const Navigation = () => {
  const { currentNumber, isDivVisible, setCurrentNumber } = useNumberStore();

  const handlePreviousClick = () => {
    if (currentNumber > 1 && !isDivVisible) {
      setCurrentNumber(currentNumber - 1);
    }
  };

  const handleNextClick = () => {
    if (currentNumber < 3 && !isDivVisible) {
      setCurrentNumber(currentNumber + 1);
    }
  };

  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      handlePreviousClick();
    } else if (event.deltaY > 0) {
      handleNextClick();
    }
  };

  return (
    <>
      <div
        className="lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2 top-[50.5%] left-[5.8%]"
        onWheel={handleWheel}>
        <div className="flex justify-center max-lg:mt-6 lg:justify-between items-center flex-col max-lg:gap-x-3 lg:gap-y-6 max-lg:flex-row">
          <div className="buttons">
            <button onClick={handlePreviousClick}>
              <div className="bg-white rounded-full p-3 flex justify-center items-center">
                <img src="/down.svg" className="h-5 w-5" />
              </div>
            </button>
          </div>

          {currentNumber === 1 && (
            <img
              src="/numero1.svg"
              width={100}
              height={100}
              alt="numero1"
              draggable="false"
            />
          )}
          {currentNumber === 2 && (
            <img
              src="/numero2.svg"
              width={100}
              height={100}
              alt="numero2"
              draggable="false"
            />
          )}
          {currentNumber === 3 && (
            <img
              src="/numero3.svg"
              width={100}
              height={100}
              alt="numero3"
              draggable="false"
            />
          )}

          <div className="buttons">
            <button onClick={handleNextClick}>
              <div className="bg-white rounded-full p-3 flex justify-center items-center">
                <img src="/down.svg" className="h-5 w-5 rotate-180" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
