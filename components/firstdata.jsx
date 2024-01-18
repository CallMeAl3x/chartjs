import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useNumberStore } from "../hooks/useNumber";
import { useEffect, useState } from "react";
import { DataCinemaPourcentagePerRegion } from "./apis/fetchDataCinemaPourcentageRegion";
import { getChartLabelPlugin } from "chart.js-plugin-labels-dv";
import { Info } from "lucide-react";
import Modal from "./Modal";
ChartJS.register(getChartLabelPlugin(), Legend);

const FirstData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { hasAnimationPlayed, setHasAnimationPlayed } = useNumberStore();

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

  useEffect(() => {
    if (!hasAnimationPlayed) {
      const timer = setTimeout(() => {
        setHasAnimationPlayed(true); // Marquez que l'animation a été jouée après 5 secondes
      }, 5000);

      return () => clearTimeout(timer); // Nettoyer le timer si le composant est démonté
    }
  }, [hasAnimationPlayed, setHasAnimationPlayed]);

  const [filmFR, setFilmFR] = useState(true);
  const [filmA, setfilmA] = useState(false);
  const [filmE, setfilmE] = useState(false);
  const [filmOther, setfilmOther] = useState(false);

  const handlefilmFR = () => {
    setFilmFR(!filmFR);
    setfilmA(false);
    setfilmE(false);
    setfilmOther(false);
  };

  const handlefilmA = () => {
    setFilmFR(false);
    setfilmA(!filmA);
    setfilmE(false);
    setfilmOther(false);
  };

  const handlefilmE = () => {
    setFilmFR(false);
    setfilmA(false);
    setfilmE(!filmE);
    setfilmOther(false);
  };

  const handlefilmOther = () => {
    setFilmFR(false);
    setfilmA(false);
    setfilmE(false);
    setfilmOther(!filmOther);
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

  const [selectedRegions, setSelectedRegions] = useState([
    "OCCITANIE",
    "ILE-DE-FRANCE",
  ]);

  const [datasets, setDatasets] = useState({
    labels: selectedRegions,
    datasets: [],
  });

  const handleRegionSelect = (regionValue) => {
    setSelectedRegions((currentRegions) => {
      let newRegions;
      if (currentRegions.includes(regionValue)) {
        // Si la région cliquée est déjà dans la liste, la retirer.
        newRegions = currentRegions.filter((region) => region !== regionValue);
      } else if (currentRegions.length < 8) {
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

  useEffect(() => {
    const getChartData = async () => {
      const moyennePourcentagefilmFR = await Promise.all(
        selectedRegions.map((region) =>
          DataCinemaPourcentagePerRegion(
            region,
            filmFR,
            filmA,
            filmE,
            filmOther
          )
        )
      );

      const datasets = [
        {
          label: "Pourcentage moyen de film français par dans cette région ",
          data: moyennePourcentagefilmFR,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#db3d44",
            "#4257b2",
            "#FFCE56",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#db3d44",
            "#4257b2",
            "#36A2EB",
          ],
        },
      ];

      setDatasets({ labels: selectedRegions, datasets: datasets });
    };

    getChartData();
  }, [selectedRegions, filmFR, filmA, filmE, filmOther]);

  const options = {
    responsive: true,
    plugins: {
      labels: {
        render: "percentage",
        fontColor: "black",
        precision: 2,
        fontSize: 16,
      },
      datalabels: {
        color: "black",
        font: {
          size: 22,
        },
      },
      legend: {
        display: true,
        labels: {
          fontSize: 24,
          fontColor: "rgb(255, 99, 132)",
        },
      },
    },
  };
  return (
    <>
      <div className="flex items-center h-full max-lg:items-center max-lg:flex-col-reverse max-lg:mt-12 lg:w-[80vw]">
        <div className="flex flex-col items-center mt-[36px] gap-[75px] justify-center">
          <div className="lg:!h-full lg:!w-[500px] !h-auto -mt-8 max-lg:w-full max-lg:flex justify-center lg:flex relative">
            <Pie
              data={datasets}
              options={options}
              className="max-lg:!w-[320px] max-lg:!h-[320px]"
            />
            <div className="absolute top-[5%] left-[84%]">
              <Info
                size={38}
                className="text-[#FFC107] -mt-2"
                onClick={openModal}
              />
              <Modal isOpen={isModalOpen} onClose={closeModal} />
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 -mt-8 gap-4">
            <button
              onClick={handlefilmFR}
              className={`${
                filmFR ? "bg-[#00FF47]" : "bg-red-500"
              } p-1 rounded-xl`}>
              Films français
            </button>
            <button
              onClick={handlefilmA}
              className={`${
                filmA ? "bg-[#00FF47]" : "bg-red-500"
              } p-1 rounded-xl`}>
              Films américains
            </button>
            <button
              onClick={handlefilmE}
              className={`${
                filmE ? "bg-[#00FF47]" : "bg-red-500"
              } p-1 rounded-xl`}>
              Films européens
            </button>
            <button
              onClick={handlefilmOther}
              className={`${
                filmOther ? "bg-[#00FF47]" : "bg-red-500"
              } p-1 rounded-xl`}>
              Autres films
            </button>
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
export default FirstData;
