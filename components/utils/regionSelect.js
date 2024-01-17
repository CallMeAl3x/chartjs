export const handleRegionSelect = (regionValue, currentRegions) => {
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

  console.log("Nouvelles régions sélectionnées après mise à jour:", newRegions);
  return newRegions;
};
