import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

interface UserData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  dateOfBirth: string;
  phoneNumber: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  role?: "ADMIN" | "CLIENT"; // Par défaut, on mettra CLIENT
}

export const createUser = async (userData: UserData) => {
  const { email, password, firstname, lastname, dateOfBirth, phoneNumber, street, city, zipCode, country, role } = userData;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Adresse mail non disponible.");
    }

    // Hash du mot de passe avant de le stocker (NextAuth le gérera aussi)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Convertion de dateOfBirth en Date
    const formattedDateOfBirth = dateOfBirth ? new Date(dateOfBirth): null;
    if (!formattedDateOfBirth || isNaN(formattedDateOfBirth.getTime())) {
      throw new Error('Format de date invalide. Utilisez YYYY-MM-DD');
    }
    // Création de l'utilisateur
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstname,
        lastname,
        dateOfBirth: formattedDateOfBirth,
        phoneNumber,
        addresses: {
            create: [
                {
                    street,
                    city,
                    zipCode,
                    country
                }
            ]
        },
        role: role || "CLIENT",
      },
    });

    return newUser;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    throw new Error("Impossible de créer l'utilisateur");
  }
};
