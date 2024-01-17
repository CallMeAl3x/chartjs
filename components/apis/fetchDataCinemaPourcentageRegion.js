export const DataCinemaPourcentagePerRegion = async (
  region,
  filmFR,
  filmA,
  filmE,
  filmOther
) => {
  try {
    const url = `https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/etablissements-cinematographiques/records?where=region_administrative=%22${region}%22&limit=99`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error(`Aucune donnée reçue pour la région spécifiée.`);
    }

    let totalPourcentage = 0;
    let count = 0;

    data.results.forEach((item) => {
      if (filmFR && item.pdm_en_entrees_des_films_francais) {
        totalPourcentage += item.pdm_en_entrees_des_films_francais;
        count++;
      }
      if (filmA && item.pdm_en_entrees_des_films_americains) {
        totalPourcentage += item.pdm_en_entrees_des_films_americains;
        count++;
      }
      if (filmE && item.pdm_en_entrees_des_films_europeens) {
        totalPourcentage += item.pdm_en_entrees_des_films_europeens;
        count++;
      }
      if (filmOther && item.pdm_en_entrees_des_autres_films) {
        totalPourcentage += item.pdm_en_entrees_des_autres_films;
        count++;
      }
    });

    const moyennePourcentage = count > 0 ? totalPourcentage / count : 0;
    console.log(`Pourcentage moyen :`, moyennePourcentage);
    return moyennePourcentage;
  } catch (error) {
    console.error(`Erreur lors de la récupération des données :`, error);
    return 0;
  }
};
