/**
 * Environmental Calculation Constants
 * Based on average absorption rates for trees in South Asian climates.
 */
const CO2_ABSORPTION_PER_TREE_KG_YEAR = 21.8; // Average kg of CO2 absorbed per tree per year

/**
 * Calculates estimated CO2 offset
 * @param treeCount Number of trees
 * @returns Object with yearly and monthly offset in KG
 */
export const calculateCO2Offset = (treeCount: number) => {
  const yearlyOffset = treeCount * CO2_ABSORPTION_PER_TREE_KG_YEAR;
  const monthlyOffset = yearlyOffset / 12;

  return {
    yearlyKg: Number(yearlyOffset.toFixed(2)),
    monthlyKg: Number(monthlyOffset.toFixed(2)),
    tonnesPerYear: Number((yearlyOffset / 1000).toFixed(2))
  };
};
