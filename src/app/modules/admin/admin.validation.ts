import { z } from 'zod';

const updateDistrictValidationSchema = z.object({
  body: z.object({
    isEnvironmentallyCritical: z.boolean().optional(),
    isEcoZone: z.boolean().optional(),
    environmentalScore: z.number().min(0).max(100).optional(),
    greenCoverage: z.number().min(0).max(100).optional(),
  }),
});

const updateUserRoleValidationSchema = z.object({
  body: z.object({
    role: z.enum(['USER', 'ADMIN']),
  }),
});

const updateUserStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']),
  }),
});

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const AdminValidation = {
  updateDistrictValidationSchema,
  updateUserRoleValidationSchema,
  updateUserStatusValidationSchema,
  updateProfileValidationSchema,
};
