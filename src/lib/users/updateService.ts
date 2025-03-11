import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface UserUpdateData {
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  role?: "ADMIN" | "CLIENT";
}

export const updateUser = async (userId: string, userData: UserUpdateData) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { addresses: true }, // Inclure les adresses pour obtenir leur ID
    });

    if (!existingUser) {
      throw new Error("Utilisateur non trouvé.");
    }

    let hashedPassword;
    if (userData.password) {
      hashedPassword = await bcrypt.hash(userData.password, 10);
    }

    const formattedDateOfBirth = userData.dateOfBirth ? new Date(userData.dateOfBirth) : undefined;
    if (formattedDateOfBirth && isNaN(formattedDateOfBirth.getTime())) {
      throw new Error("Format de date invalide. Utilisez YYYY-MM-DD");
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email: userData.email ?? existingUser.email,
        password: hashedPassword ?? existingUser.password,
        firstname: userData.firstname ?? existingUser.firstname,
        lastname: userData.lastname ?? existingUser.lastname,
        dateOfBirth: formattedDateOfBirth ?? existingUser.dateOfBirth,
        phoneNumber: userData.phoneNumber ?? existingUser.phoneNumber,
        role: userData.role ?? existingUser.role,
        addresses: userData.street
          ? {
              upsert: {
                where: { id: existingUser.addresses[0]?.id || "" }, // Utilisation de l'ID de l'adresse existante
                create: {
                  street: userData.street,
                  city: userData.city ?? "",
                  zipCode: userData.zipCode ?? "",
                  country: userData.country ?? "",
                },
                update: {
                  street: userData.street,
                  city: userData.city ?? "",
                  zipCode: userData.zipCode ?? "",
                  country: userData.country ?? "",
                },
              },
            }
          : undefined,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    throw new Error("Impossible de mettre à jour l'utilisateur.");
  }
};
