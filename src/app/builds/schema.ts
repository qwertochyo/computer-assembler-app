import { z } from "zod";

export const buildIdSchema = z.object({
  buildId: z.string().min(1, "Build ID is required"),
});

export const setBuildPublicSchema = buildIdSchema.extend({
  isPublic: z.boolean(),
});
