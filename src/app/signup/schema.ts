import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Enter your name"),

  email: z.email("Invalid email format").trim().toLowerCase(),

  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignupInput = z.infer<typeof signupSchema>;
