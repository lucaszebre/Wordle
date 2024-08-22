import { prisma } from "@/config/db";

export async function checkLetterExists(id: string): Promise<boolean> {
  try {
    const letter = await prisma.applyHistory.findUnique({
      where: { id },
      select: { id: true }, // We only need to know if it exists, so we just select the id
    });

    return !!letter; // Return true if letter exists, false otherwise
  } catch (error) {
    console.error("Error checking if letter exists:", error);
    throw new Error("Failed to check if letter exists");
  }
}