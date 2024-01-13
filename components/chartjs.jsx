import Navigation from "./navigation";
import FirstData from "./firstdata";
import SecondData from "./seconddata";
import { useNumberStore } from "../hooks/useNumber";
import Thirddata from "./thirddata";

const ChartJS = () => {
  const { currentNumber, setCurrentNumber } = useNumberStore();
  const { hasAnimationPlayed, hasSecondAnimationPlayed } = useNumberStore();

  const handlePreviousClick = () => {
    if (currentNumber > 1) {
      setCurrentNumber(currentNumber - 1);
    }
  };

  const handleNextClick = () => {
    if (currentNumber < 2 || (currentNumber === 2 && hasAnimationPlayed)) {
      setCurrentNumber(currentNumber + 1);
    }
  };

  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      // Empêche le défilement vers le haut si l'utilisateur est sur SecondData et que l'animation n'est pas terminée
      if (
        !(
          (currentNumber === 2 && !hasAnimationPlayed) ||
          (currentNumber === 3 && !hasSecondAnimationPlayed)
        )
      ) {
        handlePreviousClick();
      }
    } else if (event.deltaY > 0) {
      if (currentNumber < 2 || (currentNumber === 2 && hasAnimationPlayed)) {
        handleNextClick();
      }
    }
  };

  return (
    <>
      <Navigation />
      <div
        onWheel={handleWheel}
        className="lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2 top-[50.5%] left-[50.4%] lg:h-[54vh] lg:w-[66vw] text-2xl">
        {currentNumber === 1 && <FirstData />}

        {currentNumber === 2 && <SecondData />}

        {currentNumber === 3 && <Thirddata />}
      </div>
    </>
  );
};

export default ChartJS;
