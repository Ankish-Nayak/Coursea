import { z } from "zod";

export const userTypes = z.object({
  username: z.string(),
  password: z.string(),
});

export const adminTypes = z.object({
  username: z.string(),
  password: z.string(),
});

export const courseTypes = z.object({
  title: z.string(),
  description: z.string(),
  imageLink: z.string(),
  price: z.number(),
  published: z.boolean(),
});

export const adminParams = z.infer<typeof adminTypes>;
export const userParams = z.infer<typeof userTypes>;
export const courseParams = z.infer<typeof courseTypes>;
