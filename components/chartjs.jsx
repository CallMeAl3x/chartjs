import Navigation from "./navigation";
import FirstData from "./firstdata";
import SecondData from "./seconddata";
import { useNumberStore } from "../hooks/useNumber";
import Thirddata from "./thirddata";
import Download from "./download";

const ChartJS = () => {
  const { currentNumber, setCurrentNumber } = useNumberStore();
  const {
    hasAnimationPlayed,
    hasSecondAnimationPlayed,
    hasThirdAnimationPlayed,
  } = useNumberStore();

  const handlePreviousClick = () => {
    if (currentNumber > 1) {
      setCurrentNumber(currentNumber - 1);
    }
  };

  const handleNextClick = () => {
    if (
      currentNumber < 2 ||
      (currentNumber === 2 && hasSecondAnimationPlayed)
    ) {
      setCurrentNumber(currentNumber + 1);
    }
  };

  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      // Permet le défilement vers le haut si l'animation sur la page actuelle est terminée
      if (
        !(
          (currentNumber === 1 && !hasAnimationPlayed) ||
          (currentNumber === 2 && !hasSecondAnimationPlayed) ||
          (currentNumber === 3 && !hasThirdAnimationPlayed)
        )
      ) {
        handlePreviousClick();
      }
    } else if (event.deltaY > 0) {
      // Gère le défilement vers le bas
      if (
        currentNumber < 2 ||
        (currentNumber === 2 && hasSecondAnimationPlayed)
      ) {
        handleNextClick();
      } else if (currentNumber === 3 && hasThirdAnimationPlayed) {
        handleNextClick();
      }
    }
  };

  return (
    <>
      <Download />
      <Navigation />
      <div
        onWheel={handleWheel}
        className="lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2 top-[50.5%] left-[50.4%] lg:h-[54vh] lg:min-w-[66vw] text-2xl flex justify-evenly">
        {currentNumber === 1 && <FirstData />}

        {currentNumber === 2 && <SecondData />}

        {currentNumber === 3 && <Thirddata />}
      </div>
    </>
  );
};

export default ChartJS;
