import { z } from 'zod';

const updateProfileValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    avatarUrl: z.string().url().optional(),
  }),
});

export const UserValidation = {
  updateProfileValidationSchema,
};
