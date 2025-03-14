import { PrismaClient } from "@prisma/client";
import { unlink } from "fs/promises";
import { join } from "path";

const prisma = new PrismaClient();

export const deleteProduct = async (productId: string) => {
  try {
    // Récupérer les infos du produit avant suppression
    const product = await prisma.product.findUnique({ where: { id: productId }})

    if (!product) {
      throw new Error('Produit introuvable')
    }

    // Supprimer les images du dossier /uploads
    if (product.images.length > 0) {
      await Promise.all(
        product.images.map(async (imagePath) => {
          // Vérifier que l'image est bien stockée dans /uploads avant de supprimer
          if (imagePath.startsWith('/uploads')) {
            const filePath = join(process.cwd(), "public", imagePath);
            try {
              await unlink(filePath);
              console.log(`Fichier supprimé : ${filePath}`);
            } catch (err) {
              console.error(`Erreur suppression de fichier ${filePath}:`, err)
            }
          }
        })
      )
    }

    // Suppression de la base de données
    await prisma.product.delete({ where: { id: productId } });
    return { message: "Produit supprimé avec succès" };
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    throw new Error("Impossible de supprimer le produit.");
  }
};
