"use server";

import { prisma } from "@/lib/db";
import { Component, categoryIdToDbType } from "@/lib/types";

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
