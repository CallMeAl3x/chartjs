import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from "react";
import { useNumberStore } from "../hooks/useNumber";
import Video from "./video";

const ThirdData = () => {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    fetch('/data.php')
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setChartData({
            labels: data.map(item => item.films), // Assurez-vous que 'films' est la colonne contenant les années
            datasets: [
              {
                label: 'Plus de 15M €',
                data: data.map(item => item.plusde15M),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ]
          });
        } else {
          console.error(data.error);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
      });
  }, []);


  const { hasThirdAnimationPlayed, setHasThirdAnimationPlayed } = useNumberStore();

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
      }, 5000);

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

  return (
    <>
    {!hasThirdAnimationPlayed && <Video />}
      <div className="flex items-center h-full max-lg:items-center max-lg:flex-col-reverse max-lg:mt-12">
        <div className="flex flex-col items-center mt-[100px] gap-[75px]">
          <div className="lg:!h-[250px] lg:!w-[400px] !h-[250px] !w-[500px] -mt-8">
            <Line data={chartData} className="!h-fit !w-fit" />
          </div>
        </div>
      </div>
    </>
  );
};
export default ThirdData;
