import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email format").trim().toLowerCase(),

  password: z.string().min(1, "Enter password"),
});

export type LoginInput = z.infer<typeof loginSchema>;