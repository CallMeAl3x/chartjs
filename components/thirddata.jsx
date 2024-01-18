import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useNumberStore } from "../hooks/useNumber";
import Video from "./video";
import { fetchDataCinemaProd } from "./apis/fetchDataCinemaProd";
import { Info } from "lucide-react";
import Modal3 from "./Modal3";

const ThirdData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchDataCinemaProd().then((data) => {
      setChartData({
        labels: data.labels,
        datasets: data.datasets,
      });
    });
  }, []);

  const { hasThirdAnimationPlayed, setHasThirdAnimationPlayed } =
    useNumberStore();

  const preventWheelScroll = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!hasThirdAnimationPlayed) {
      // Ajouter l'écouteur d'événements pour bloquer le défilement de la molette
      window.addEventListener("wheel", preventWheelScroll, { passive: false });

      const timer = setTimeout(() => {
        setHasThirdAnimationPlayed(true); // Marquez que l'animation a été jouée après 5 secondes
        // Supprimer l'écouteur d'événements après 5 secondes
        window.removeEventListener("wheel", preventWheelScroll);
      }, 5500);

      return () => {
        clearTimeout(timer); // Nettoyer le timer si le composant est démonté
        window.removeEventListener("wheel", preventWheelScroll);
      };
    }
  }, [hasThirdAnimationPlayed, setHasThirdAnimationPlayed]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
      label: {
        display: "",
      },
    },
  };

  return (
    <>
      {!hasThirdAnimationPlayed && <Video />}
      <div className="flex items-center h-full max-lg:items-center max-lg:flex-col-reverse max-lg:mt-12">
        <div className="flex flex-col items-center mt-[42px] gap-[75px] ml-3 max-lg:justify-center">
          <div className="lg:!h-[55vh] lg:!w-[65vw] -mt-8">
            <Line
              data={chartData}
              options={options}
              className="max-lg:mt-24 max-lg:!h-[260px] max-lg:!w-[370px] max-lg:rotate-90"
            />
            <div className="absolute top-0 left-full">
              <Info
                size={38}
                className="text-[#FFC107] -mt-2"
                onClick={openModal}
              />
              <Modal3 isOpen={isModalOpen} onClose={closeModal} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ThirdData;
