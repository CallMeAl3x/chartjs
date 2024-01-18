import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import Video from "./video";
import { useNumberStore } from "../hooks/useNumber";
import { PoppulationParRegion } from "./apis/PoppulationParRegion.js";
import { fetchDataCinemaForRegion } from "./apis/fetchDataCinemaForRegion.js";

const SecondData = () => {
  const { hasSecondAnimationPlayed, setHasSecondAnimationPlayed } =
    useNumberStore();
  const [calculateAverage, setCalculateAverage] = useState(false);

  const preventWheelScroll = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!hasSecondAnimationPlayed) {
      // Ajouter l'écouteur d'événements pour bloquer le défilement de la molette
      window.addEventListener("wheel", preventWheelScroll, { passive: false });

      const timer = setTimeout(() => {
        setHasSecondAnimationPlayed(true); // Marquez que l'animation a été jouée après 5 secondes
        // Supprimer l'écouteur d'événements après 5 secondes
        window.removeEventListener("wheel", preventWheelScroll);
      }, 5500);

      return () => {
        clearTimeout(timer); // Nettoyer le timer si le composant est démonté
        window.removeEventListener("wheel", preventWheelScroll);
      };
    }
  }, [hasSecondAnimationPlayed, setHasSecondAnimationPlayed]);

  const [selectedRegions, setSelectedRegions] = useState([
    "OCCITANIE",
    "ILE-DE-FRANCE",
  ]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const getChartData = async () => {
      try {
        const seatTotals = await Promise.all(
          selectedRegions.map((region) => fetchDataCinemaForRegion(region))
        );

        const populations = await Promise.all(
          selectedRegions.map((region) => PoppulationParRegion(region))
        );

        let datasets;
        if (calculateAverage) {
          const seatsPerRegion = seatTotals.map((totalseats, index) => {
            const population = populations[index];
            return population > 0 ? totalseats / population : 0;
          });

          datasets = [
            {
              label: "Nombre moyen de sièges de cinéma par habitant",
              data: seatsPerRegion,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
              ],
            },
          ];
        } else {
          datasets = [
            {
              label: "Nombre de sièges de cinéma de la région",
              data: seatTotals,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
              ],
            },
          ];
        }

        setChartData({
          labels: selectedRegions,
          datasets: datasets,
        });
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour des données du graphique:",
          error
        );
      }
    };

    getChartData();
  }, [selectedRegions, calculateAverage]);

  const handleRegionSelect = (regionValue) => {
    setSelectedRegions((currentRegions) => {
      let newRegions;
      if (currentRegions.includes(regionValue)) {
        // Si la région cliquée est déjà dans la liste, la retirer.
        newRegions = currentRegions.filter((region) => region !== regionValue);
      } else if (currentRegions.length < 4) {
        // Ajouter la région cliquée seulement si on n'a pas encore atteint la limite de 4.
        newRegions = [...currentRegions, regionValue];
      } else {
        // Si la limite est atteinte, remplacer la première région sélectionnée par la nouvelle.
        newRegions = [...currentRegions.slice(1), regionValue];
      }

      console.log(
        "Nouvelles régions sélectionnées après mise à jour:",
        newRegions
      );
      return newRegions;
    });
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: window.innerWidth < 600 ? "y" : "x", // 'y' pour un graphique vertical, 'x' pour horizontal
  };

  return (
    <>
      {!hasSecondAnimationPlayed && <Video />}
      <div className="flex items-center h-full max-lg:items-center max-lg:flex-col-reverse max-lg:mt-12 lg:w-[80vw]">
        <div className="flex flex-col items-center mt-[30px] gap-[75px] justify-center">
          <div className="lg:!h-[453px] lg:!w-[500px] !h-[280px] !w-[280px] -mt-8">
            {chartData.datasets && chartData.datasets.length > 0 && (
              <Bar
                data={chartData}
                options={options}
                className="!h-full !w-full"
              />
            )}
          </div>
          <div className="">
            <input
              type="checkbox"
              checked={calculateAverage}
              onChange={(e) => setCalculateAverage(e.target.checked)}
            />
            <label>
              Calculer la moyenne de sièges par personne dans chaque région
            </label>
          </div>
        </div>
        <div
          id="conteneur"
          className="w-[80vw] lg:w-[40%] lg:min-w-[375px] lg:m-auto max-lg:max-w-none">
          <div id="imgg" className="max-lg:flex max-lg:items-center relative">
            <img src="/carte-france.svg" draggable={false} />
            <a
              className={`FR-ARA ${
                selectedRegions.includes("AUVERGNE-RHONE-ALPES")
                  ? "selected-region"
                  : ""
              }`}
              onClick={() => handleRegionSelect("AUVERGNE-RHONE-ALPES")}>
              <span>Auvergne-Rhône-Alpes</span>
            </a>
            <a
              className={`FR-BFC ${
                selectedRegions.includes("BOURGOGNE-FRANCHE-COMTE")
                  ? "selected-region"
                  : ""
              }`}
              onClick={() => handleRegionSelect("BOURGOGNE-FRANCHE-COMTE")}>
              <span>Bourgogne-Franche-Comté</span>
            </a>
            <a
              className={`FR-BRE ${
                selectedRegions.includes("BRETAGNE") ? "selected-region" : ""
              }`}
              onClick={() => handleRegionSelect("BRETAGNE")}>
              <span>Bretagne</span>
            </a>
            <a
              className={`FR-CVL ${
                selectedRegions.includes("CENTRE-VAL DE LOIRE")
                  ? "selected-region"
                  : ""
              }`}
              onClick={() => handleRegionSelect("CENTRE-VAL DE LOIRE")}>
              <span>Centre-Val de Loire</span>
            </a>
            <a
              className={`FR-COR ${
                selectedRegions.includes("CORSE") ? "selected-region" : ""
              }`}
              onClick={() => handleRegionSelect("CORSE")}>
              <span>Corse</span>
            </a>
            <a
              className={`FR-GES ${
                selectedRegions.includes("GRAND EST") ? "selected-region" : ""
              }`}
              onClick={() => handleRegionSelect("GRAND EST")}>
              <span>Grand Est</span>
            </a>
            <a
              className={`FR-HDF ${
                selectedRegions.includes("HAUTS DE FRANCE")
                  ? "selected-region"
                  : ""
              }`}
              onClick={() => handleRegionSelect("HAUTS DE FRANCE")}>
              <span>Hauts-de-France</span>
            </a>
            <a
              className={`FR-IDF ${
                selectedRegions.includes("ILE-DE-FRANCE")
                  ? "selected-region"
                  : ""
              }`}
              onClick={() => handleRegionSelect("ILE-DE-FRANCE")}>
              <span>Île-de-France</span>
            </a>
            <a
              className={`FR-NOR ${
                selectedRegions.includes("NORMANDIE") ? "selected-region" : ""
              }`}
              onClick={() => handleRegionSelect("NORMANDIE")}>
              <span>Normandie</span>
            </a>
            <a
              className={`FR-NA ${
                selectedRegions.includes("NOUVELLE AQUITAINE")
                  ? "selected-region"
                  : ""
              }`}
              onClick={() => handleRegionSelect("NOUVELLE AQUITAINE")}>
              <span>Nouvelle-Aquitaine</span>
            </a>
            <a
              className={`FR-OCT ${
                selectedRegions.includes("OCCITANIE") ? "selected-region" : ""
              }`}
              onClick={() => handleRegionSelect("OCCITANIE")}>
              <span>Occitanie</span>
            </a>
            <a
              className={`FR-PL ${
                selectedRegions.includes("PAYS DE LA LOIRE")
                  ? "selected-region"
                  : ""
              }`}
              onClick={() => handleRegionSelect("PAYS DE LA LOIRE")}>
              <span>Pays de la Loire</span>
            </a>
            <a
              className={`FR-PACA ${
                selectedRegions.includes("PROVENCE-ALPES-COTE D'AZUR")
                  ? "selected-region"
                  : ""
              }`}
              onClick={() => handleRegionSelect("PROVENCE-ALPES-COTE D'AZUR")}>
              <span>Provence-Alpes-Côte D&apos;Azur</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecondData;
