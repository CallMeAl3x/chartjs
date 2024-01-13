import regionMapping from "../utils/regionMapping";

const normalizeRegionNameForPopulationAPI = (regionName) => {
  return regionMapping[regionName] || regionName;
};

export const fetchPopulationForRegion = async (region) => {
  const normalizedRegionName = normalizeRegionNameForPopulationAPI(region); // Ajoutez cette ligne
  try {
    const url = `https://data.opendatasoft.com/api/records/1.0/search/?dataset=demographyref-france-pop-legale-region@public&q=${normalizedRegionName}&rows=1`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(
      `Réponse de l'API pour la région ${normalizedRegionName}:`,
      data
    );

    if (!data.records || data.records.length === 0 || !data.records[0].fields) {
      throw new Error(
        `Aucune donnée reçue pour la région spécifiée: ${normalizedRegionName}.`
      );
    }

    const population = data.records[0].fields.reg_pop_tot || 0;
    console.log(
      `Population pour la région ${normalizedRegionName}:`,
      population
    );
    return population;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des données de population pour la région ${normalizedRegionName}:`,
      error
    );
    return 0;
  }
};
