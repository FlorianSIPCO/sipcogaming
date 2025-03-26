import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ProductData {
  name: string;
  price: number;
  images: string[];
  specs: { key: string; value: string }[];
  description: string;
  ratings?: Record<string, number>;
  stock: number;
}

export const createProduct = async (productData: ProductData) => {
  try {
    if (!productData.images || !Array.isArray(productData.images) || productData.images.length === 0) {
      throw new Error("Les images sont obligatoires");
    }

    const formattedSpecs = productData.specs.map(spec => `${spec.key}: ${spec.value}`);

    const newProduct = await prisma.product.create({
      data: {
        name: productData.name,
        price: productData.price,
        images: productData.images,
        specs: formattedSpecs,
        ratings: productData.ratings ?? undefined,
        description: productData.description,
        stock: productData.stock,
      },
    });

    return newProduct;
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    throw new Error("Impossible de créer le produit");
  }
};
