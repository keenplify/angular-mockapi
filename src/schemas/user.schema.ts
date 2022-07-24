import { z } from 'zod';

export const userSchema = z.object({
  createdAt: z.string().optional(),
  fullName: z.string(),
  avatar: z.string().optional(),
  username: z.string(),
  password: z.string(),
  id: z.string().optional(),
});

export type IUser = z.infer<typeof userSchema>;
