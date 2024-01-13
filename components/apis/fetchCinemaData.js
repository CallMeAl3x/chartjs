// Cette fonction effectue un appel API pour récupérer les données des cinémas pour une région spécifique.
export const fetchDataCinemaForRegion = async (region) => {
  try {
    const url = `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=region_administrative=%22${region}%22&limit=99`;
    const response = await fetch(url);
    const data = await response.json();

    // Affiche la réponse complète de l'API dans la console
    console.log(`Réponse de l'API pour la région ${region}:`, data);

    // Assurez-vous que 'data.results' est bien un tableau et contient les propriétés attendues
    if (!Array.isArray(data.results)) {
      throw new Error(
        "Les données reçues ne sont pas dans un format de tableau attendu."
      );
    }

    const totalScreens = data.results.reduce((acc, cinema) => {
      return acc + cinema.ecrans;
    }, 0);

    const averageScreens = totalScreens / data.results.length;
    return averageScreens;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données de l'API:",
      error
    );
    return 0; // Retourner 0 ou gérer l'erreur comme approprié pour votre application
  }
};
