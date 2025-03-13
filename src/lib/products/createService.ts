import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ProductData {
  name: string;
  price: number;
  images: string[];
  specs: string[];
  description: string;
  stock: number;
}

export const createProduct = async (productData: ProductData) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        ...productData,
      },
    });

    return newProduct;
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    throw new Error("Impossible de créer le produit");
  }
};
