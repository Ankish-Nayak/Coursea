import { z } from "zod";

export const userTypes = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});

export const adminTypes = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});

export const courseTypes = z.object({
  title: z.string().min(1),
  description: z.string().max(100),
  imageLink: z.string(),
  price: z.number(),
  published: z.boolean(),
});

export type adminParams = z.infer<typeof adminTypes>;
export type userParams = z.infer<typeof userTypes>;
export type courseParams = z.infer<typeof courseTypes>;
