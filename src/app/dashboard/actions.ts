"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Component, categoryIdToDbType } from "@/lib/types";
import { revalidatePath } from "next/cache";

export interface SaveBuildFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

export const saveBuildAction = async (
  _prevState: SaveBuildFormState,
  formData: FormData
): Promise<SaveBuildFormState> => {
  const name = String(formData.get("name") ?? "").trim();
  const componentsIds = String(formData.get("componentsIds") ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  const result = await saveBuild(name, componentsIds);

  if (!result.success) {
    return {
      status: "error",
      message: result.error,
    };
  }

  return {
    status: "success",
    message: "The build has been successfully saved"
  }
};

export const saveBuild = async (
  name: string,
  componentIds: string[]
): Promise<
  { success: true; buildId: string } | { success: false; error: string }
> => {
  const session = await auth();

  if (!session?.user.id) {
    return { success: false, error: "Need to login" };
  }

  const trimmedName = name.trim();

  if (!trimmedName) {
    return { success: false, error: "Enter the build name" };
  }

  if (componentIds.length === 0) {
    return { success: false, error: "Add at least one component" };
  }

  const components = await prisma.component.findMany({
    where: { id: { in: componentIds } },
  });

  if (components.length !== componentIds.length) {
    return { success: false, error: "Some components have not been found" };
  }

  const totalPrice = components.reduce(
    (sum, component) => (sum += component.price),
    0
  );

  try {
    const build = await prisma.$transaction(async (tx) => {
      const newBuild = await tx.build.create({
        data: {
          name: trimmedName,
          totalPrice,
          userId: session.user.id,
        },
      });

      await tx.buildComponent.createMany({
        data: componentIds.map((componentId) => ({
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

export const getComponentsByCategory = async (
  categoryId: string
): Promise<Component[]> => {
  const dbType = categoryIdToDbType[categoryId];

  if (!dbType) {
    return [];
  }

  const components = await prisma.component.findMany({
    where: { type: dbType },
    orderBy: { price: "asc" },
  });

  return components.map((component) => ({
    id: component.id,
    name: component.name,
    price: component.price,
    type: component.type,
    socket: component.socket,
  }));
};
