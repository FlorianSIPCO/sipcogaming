import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getOrdersByUserId = async (userId: string) => {
  return await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};
