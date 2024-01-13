import { useEffect, useState } from "react";
import Video from "./video";
import { useNumberStore } from "../hooks/useNumber";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

const Thirddata = () => {
  const [cinemasName, setCinemasName] = useState([]);
  const [cinemaEntree2022, setCinemaEntree2022] = useState([]);
  const { hasSecondAnimationPlayed, setHasSecondAnimationPlayed } =
    useNumberStore();

  useEffect(() => {
    if (!hasSecondAnimationPlayed) {
      const timer = setTimeout(() => {
        setHasSecondAnimationPlayed(true); // Marquez que l'animation a été jouée après 5 secondes
      }, 5000);

      return () => clearTimeout(timer); // Nettoyer le timer si le composant est démonté
    }
  }, [hasSecondAnimationPlayed, setHasSecondAnimationPlayed]);

  const data = {
    labels: cinemasName,
    datasets: [
      {
        label: "Comparaison de régions",
        data: cinemaEntree2022,
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Couleur d'arrière-plan plus douce
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2, // Bordure un peu plus épaisse
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
        pointRadius: 4, // Taille des points
        pointHitRadius: 10,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: "rgba(255, 255, 255, 0.3)", // Lignes d'angle plus discrètes
        },
        grid: {
          color: "black", // Grille plus discrète
        },
        ticks: {
          backdropColor: "transparent", // Fond des étiquettes des ticks transparent
          color: "black", // Couleur des étiquettes
        },
        pointLabels: {
          font: {
            size: 14, // Taille de police plus grande
          },
          color: "black", // Couleur des labels de points
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "black", // Couleur du texte de la légende
          font: {
            size: 14, // Taille de police pour la légende
          },
        },
        position: "top", // Position de la légende
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Couleur de fond des infobulles
        titleFont: {
          size: 14, // Taille de police du titre des infobulles
        },
        bodyFont: {
          size: 12, // Taille de police du corps des infobulles
        },
        cornerRadius: 4, // Rayon des coins des infobulles
        displayColors: false, // Ne pas afficher les couleurs dans les infobulles
      },
    },
    elements: {
      line: {
        borderWidth: 2, // Épaisseur des lignes entre les points
      },
    },
  };

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  useEffect(() => {
    fetch(
      "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?limit=5"
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setCinemasName(result.results.map((cinema) => cinema.nom));
        setCinemaEntree2022(
          result.results.map((cinema) => cinema.entrees_2022)
        );
      });
  }, []);

  return (
    <div>
      {!hasSecondAnimationPlayed && <Video />}
      <Radar data={data} options={options} />
    </div>
  );
};

export default Thirddata;
