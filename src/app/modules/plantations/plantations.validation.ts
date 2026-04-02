import { z } from 'zod';

const createPlantationReportValidationSchema = z.object({
  body: z.object({
    districtId: z.string().min(1, 'District ID is required'),
    numberOfTrees: z.number().min(1, 'Number of trees must be at least 1'),
    location: z.string().min(1, 'Location is required'),
  }),
});

export const PlantationValidation = {
  createPlantationReportValidationSchema,
};
