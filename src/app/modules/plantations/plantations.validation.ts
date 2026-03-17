import { z } from 'zod';

const createPlantationReportValidationSchema = z.object({
  body: z.object({
    districtId: z.string().min(1, 'District ID is required'),
    treeCount: z.number().min(1, 'Tree count must be at least 1'),
    treeType: z.string().min(1, 'Tree type is required'),
    location: z.string().min(1, 'Location is required'),
    image: z.string().optional(),
  }),
});

export const PlantationValidation = {
  createPlantationReportValidationSchema,
};
