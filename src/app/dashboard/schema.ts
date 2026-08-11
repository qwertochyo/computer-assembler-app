import { z } from "zod";

export const saveBuildSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter the build name")
    .max(100, "Build name is too long"),

  componentIds: z.array(z.string().min(1)).min(1, "Add at least one component"),
});

export type SaveBuildInput = z.infer<typeof saveBuildSchema>;
