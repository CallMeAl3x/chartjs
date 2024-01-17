// Cette fonction effectue un appel API pour récupérer les données des cinémas pour une région spécifique.
export const fetchDataCinemaForRegion = async (region) => {
  try {
    const url = `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=region_administrative=%22${region}%22&limit=99`;
    const response = await fetch(url);
    const data = await response.json();

    if (!Array.isArray(data.results)) {
      throw new Error(
        "Les données reçues ne sont pas dans un format de tableau attendu."
      );
    }

    const totalFauteuils = data.results.reduce(
      (acc, cinema) => acc + cinema.fauteuils,
      0
    );
    const moyenneFauteuils = totalFauteuils / data.results.length;

    // Utilisez 'total_count' pour obtenir le nombre total de cinémas dans la région
    const nombreCinemas = data.total_count;

    // Calculez la moyenne des fauteuils pour l'ensemble de la région
    const moyenneTotaleFauteuils = moyenneFauteuils * nombreCinemas;

    return moyenneTotaleFauteuils;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de l'API:",
      error
    );
    return 0;
  }
};
