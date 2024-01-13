import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useEffect, useState } from "react";

const FirstData = () => {
  const [shouldFetch, setShouldFetch] = useState(false); // Nouvel état pour contrôler le fetch
  const [cinemasName, setCinemasName] = useState([]);
  const [cinemaEntree2022, setCinemaEntree2022] = useState([]);
  const [region, setRegion] = useState("");

  const data = {
    labels: cinemasName,
    datasets: [
      {
        label: "Visites par Régions",
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
    responsive: true,
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

  const fetchData = async () => {
    let url =
      "https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?limit=10";
    if (region) {
      url = `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=region_administrative%3D%22${region}%22&limit=20`;
    }
    try {
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      setCinemasName(result.results.map((cinema) => cinema.nom));
      setCinemaEntree2022(result.results.map((cinema) => cinema.entrees_2022));
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
      setShouldFetch(false); // Réinitialiser pour une prochaine utilisation
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetch]);

  const handleConfirmClick = () => {
    setShouldFetch(true); // Mettre à jour shouldFetch pour déclencher le fetch
  };

  const handleInputChange = (e) => {
    setRegion(e.target.value);
  };

  return (
    <>
      <div>
        <Radar data={data} options={options} responsive={true} className="" />
        <div className="flex items-center gap-4 relative">
          <div className="flex items-center">
            <input
              type="text"
              value={region}
              onChange={handleInputChange}
              className="border-2 border-[#A6A6A6] rounded-lg py-2.5"
            />
          </div>
          <button
            className="inactive ml-2 text-black bg-white rounded-xl px-3 py-2.5 flex items-center gap-2 hover:bg-[#00ff47]"
            onClick={handleConfirmClick}>
            <img
              src="/check.svg"
              alt="check"
              width={30}
              height={45}
              className="ml-2"
            />
            <p className="text-xl font-semibold">Confirmer</p>
          </button>
        </div>
      </div>
    </>
  );
};
export default FirstData;
