import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ProductUpdateData {
  name?: string;
  price?: number;
  images?: string[];
  specs?: string[];
  description?: string;
  stock?: number;
}

export const updateProduct = async (id: string, productData: ProductUpdateData) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { ...productData },
    });

    return updatedProduct;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du produit:", error);
    throw new Error("Impossible de mettre à jour le produit.");
  }
};
