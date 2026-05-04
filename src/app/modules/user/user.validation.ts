import { z } from 'zod';

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    avatarUrl: z.string().url().optional(),
    address: z.string().optional(),
    districtId: z.string().optional(),
  }),
});

export const UserValidation = {
  updateProfileValidationSchema,
};
