"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const setBuildPublicAction = async (formData: FormData) => {
  const session = await auth();

  if (!session?.user.id) {
    return;
  }

  const buildId = String(formData.get("buildId")) ?? "";
  const isPublic = formData.get("isPublic") === "true";

  if (!buildId) {
    return;
  }

  await prisma.build.updateMany({
    where: {
      id: buildId,
      userId: session?.user.id,
    },
    data: { isPublic },
  });

  revalidatePath("/builds");
  revalidatePath("/builds/explore");
};

export const deleteBuildAction = async (formData: FormData) => {
  const session = await auth();

  if (!session?.user.id) {
    return;
  }

  const buildId = String(formData.get("buildId")) ?? "";

  if (!buildId) {
    return;
  }

  await prisma.build.deleteMany({
    where: {
      id: buildId,
      userId: session?.user.id,
    },
  });

  revalidatePath("/builds");
}
