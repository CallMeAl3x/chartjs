// Cette fonction effectue un appel API pour récupérer les données des cinémas pour une région spécifique.
export const fetchDataCinemaProd = async () => {
  try {
    const url = `https://retoolapi.dev/SPMAOY/data`;
    const response = await fetch(url);
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error(
        "Les données reçues ne sont pas dans un format de tableau attendu."
      );
    }

    const labels = data.map(item => item.films); // années
const datasets = [
  {
    label: 'Moins de 1M',
    data: data.map(item => item.moins_de_1M),
    borderColor: 'rgb(4, 0, 195)',
    backgroundColor: 'rgba(4, 0, 195, 0.5)',
    hidden: false,
  },
  {
    label: '15 M ou plus',
    data: data.map(item => item['15_M_ou_plus']),
    borderColor: 'rgb(158, 0, 255)',
    backgroundColor: 'rgba(158, 0, 255, 0.5)',
    hidden: true,
  },
  {
    label: '1M à 2M',
    data: data.map(item => item['1_a_2M']),
    borderColor: 'rgb(209, 0 , 0)',
    backgroundColor: 'rgba(299, 0, 0, 0.5)',
    hidden: true,
  },
  {
    label: '2M à 4M',
    data: data.map(item => item['2_a_4M']),
    borderColor: 'rgb(255, 92, 0)',
    backgroundColor: 'rgba(255, 92, 0, 0.5)',
    hidden: false,
  },
  {
    label: '4M à 5M',
    data: data.map(item => item['4_a_5M']),
    borderColor: 'rgb(255, 229, 0)',
    backgroundColor: 'rgba(255, 229, 0, 0.5)',
    hidden: true,
  },
  {
    label: '5M à 7M',
    data: data.map(item => item['5_a_7M']),
    borderColor: 'rgb(0, 244, 255)',
    backgroundColor: 'rgba(0, 244, 255, 0.5)',
    hidden: false,
  },
  {
    label: '7M à 10M',
    data: data.map(item => item['7_a_10M']),
    borderColor: 'rgb(255, 0 , 138)',
    backgroundColor: 'rgba(255, 0, 138, 0.5)',
    hidden: true,
  },
  {
    label: '10M à 15M',
    data: data.map(item => item['10_a_15M']),
    borderColor: 'rgb(14, 172, 0)',
    backgroundColor: 'rgba(14, 172, 0, 0.5)',
    hidden: true,
  },
];

return { labels, datasets };

  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de l'API:",
      error
    );
    return 0;
  }
};
