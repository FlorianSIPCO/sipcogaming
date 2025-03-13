import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProducts = async () => {
  try {
    return await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    throw new Error("Impossible de récupérer les produits.");
  }
};

export const getProductById = async (id: string) => {
  try {
    return await prisma.product.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error);
    throw new Error("Produit introuvable.");
  }
};
