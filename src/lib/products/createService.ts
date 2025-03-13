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
    if (!productData.images || !Array.isArray(productData.images) || productData.images.length === 0) {
      throw new Error("Les images sont obligatoires");
    }

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
