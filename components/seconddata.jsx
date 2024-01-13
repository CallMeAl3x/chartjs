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
import regionMapping from "./utils/regionMapping";
import { fetchPopulationForRegion } from "./apis/fetchDataForRegion";
import { fetchDataCinemaForRegion } from "./apis/fetchCinemaData";

const SecondData = () => {
  const { hasAnimationPlayed, setHasAnimationPlayed } = useNumberStore();
  const [calculateAverage, setCalculateAverage] = useState(false);

  const preventWheelScroll = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!hasAnimationPlayed) {
      // Ajouter l'écouteur d'événements pour bloquer le défilement de la molette
      window.addEventListener("wheel", preventWheelScroll, { passive: false });

      const timer = setTimeout(() => {
        setHasAnimationPlayed(true); // Marquez que l'animation a été jouée après 5 secondes
        // Supprimer l'écouteur d'événements après 5 secondes
        window.removeEventListener("wheel", preventWheelScroll);
      }, 5000);

      return () => {
        clearTimeout(timer); // Nettoyer le timer si le composant est démonté
        window.removeEventListener("wheel", preventWheelScroll);
      };
    }
  }, [hasAnimationPlayed, setHasAnimationPlayed]);

  const [selectedRegions, setSelectedRegions] = useState([
    "OCCITANIE",
    "ILE-DE-FRANCE",
  ]);

  const normalizeRegionNameForPopulationAPI = (regionName) => {
    return regionMapping[regionName] || regionName;
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const getChartData = async () => {
      try {
        // Récupérer la moyenne des écrans pour chaque région sélectionnée
        const screenAverages = await Promise.all(
          selectedRegions.map((region) => fetchDataCinemaForRegion(region))
        );

        let chartData = { labels: selectedRegions, datasets: [] };

        if (calculateAverage) {
          const populations = await Promise.all(
            selectedRegions.map((region) =>
              fetchPopulationForRegion(
                normalizeRegionNameForPopulationAPI(region)
              )
            )
          );

          // Calculer la moyenne d'écrans par personne pour chaque région
          const averagesPerPerson = screenAverages.map((avg, index) => {
            const population = populations[index];
            // Convertissez le nombre moyen d'écrans par personne en nombre d'écrans pour 100,000 habitants.
            // Utilisez Math.max pour s'assurer que la population n'est jamais 0, ce qui éviterait une division par zéro.
            return (avg / Math.max(population, 1)) * 100000;
          });

          // Mettre à jour les données du graphique
          chartData.datasets.push({
            label: "Écrans pour 100,000 habitants",
            data: averagesPerPerson,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
            ],
          });
        } else {
          // Utiliser uniquement la moyenne des écrans si calculateAverage n'est pas activé
          chartData.datasets.push({
            label: "Moyenne des salles de cinéma",
            data: screenAverages,
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
            ],
          });
        }

        setChartData(chartData);
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
  };

  return (
    <>
      {!hasAnimationPlayed && <Video />}
      <div className="flex items-center h-full max-lg:items-center max-lg:flex-col-reverse max-lg:mt-12">
        <div className="flex flex-col items-center">
          <div className="lg:!h-[250px] lg:!w-[500px] !h-[160px] !w-[320px] !max-w-none max-lg:mt-12">
            {chartData.datasets && chartData.datasets.length > 0 && (
              <Bar data={chartData} options={options} id="moyenne" />
            )}
          </div>
          <div className="">
            <input
              type="checkbox"
              checked={calculateAverage}
              onChange={(e) => setCalculateAverage(e.target.checked)}
            />
            <label>Calculer la moyenne d&apos;écrans par personne</label>
          </div>
        </div>
        <div
          id="conteneur"
          className="w-[40%] min-w-[90%] lg:min-w-[375px] lg:m-auto max-w-[375px] max-lg:!w-fit max-lg:max-w-none">
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
