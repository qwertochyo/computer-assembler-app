import { prisma } from "./db";

export const getMyBuilds = async (userId: string) => {
  return prisma.build.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true } },
      components: {
        include: {
          component: {
            select: { name: true, type: true, price: true },
          },
        },
      },
    },
  });
};

export const getPublicBuilds = async (userId: string) => {
  return prisma.build.findMany({
    where: { isPublic: true },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true, name: true } },
      components: {
        include: {
          component: {
            select: { name: true },
          },
        },
      },
      _count: { select: { likes: true } },
      likes: { where: { userId }, select: { id: true } },
    },
  });
};

export const getBuildToEdit = async (buildId: string, userId: string) => {
  return await prisma.build.findFirst({
    where: { id: buildId, userId: userId },
    include: {
      components: {
        include: {
          component: true,
        },
      },
    },
  });
};
export const getPopularBuilds = async (limit = 3) => {
  return prisma.build.findMany({
    where: {
      isPublic: true,
      likes: { some: {} },
    },
    orderBy: { likes: { _count: "desc" } },
    take: limit,
    include: {
      _count: { select: { likes: true } },
    },
  });
};
