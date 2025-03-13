import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({ where: { id } });
    return { message: "Produit supprimé avec succès" };
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    throw new Error("Impossible de supprimer le produit.");
  }
};
