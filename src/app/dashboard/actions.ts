"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Component, categoryIdToDbType } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { SaveBuildInput, saveBuildSchema } from "./schema";

export interface SaveBuildFormState {
  status: "idle" | "success" | "error";
  message?: string;
  buildId?: string;
}

export const saveBuildAction = async (
  _prevState: SaveBuildFormState,
  formData: FormData
): Promise<SaveBuildFormState> => {
  const componentIds = formData
    .get("componentIds")
    ?.toString()
    .split(",")
    .filter(Boolean);

  const result = saveBuildSchema.safeParse({
    name: formData.get("name"),
    componentIds,
  });

  if (!result.success) {
    return {
      status: "error",
      message: result.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  const saveResult = await saveBuild(result.data);

  if (!saveResult.success) {
    return {
      status: "error",
      message: saveResult.error,
    };
  }

  return {
    status: "success",
    message: "The build has been successfully saved",
    buildId: saveResult.buildId,
  };
};

const saveBuild = async (
  data: SaveBuildInput
): Promise<
  { success: true; buildId: string } | { success: false; error: string }
> => {
  const session = await auth();

  if (!session?.user.id) {
    return { success: false, error: "Need to login" };
  }

  const components = await prisma.component.findMany({
    where: { id: { in: data.componentIds } },
  });

  if (components.length !== data.componentIds.length) {
    return { success: false, error: "Some components have not been found" };
  }

  const totalPrice = components.reduce(
    (sum, component) => sum + component.price,
    0
  );

  try {
    const build = await prisma.$transaction(async (tx) => {
      const newBuild = await tx.build.create({
        data: {
          name: data.name,
          totalPrice,
          userId: session.user.id,
        },
      });

      await tx.buildComponent.createMany({
        data: data.componentIds.map((componentId) => ({
          buildId: newBuild.id,
          componentId,
        })),
      });

      return newBuild;
    });

    revalidatePath("/dashboard");
    revalidatePath("/build");

    return { success: true, buildId: build.id };
  } catch (error) {
    return { success: false, error: "The build could not be saved" };
  }
};
