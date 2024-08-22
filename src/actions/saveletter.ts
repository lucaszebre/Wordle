'use server'

import { auth } from "@/auth";
import { prisma } from "@/config/db";
import { revalidatePath } from "next/cache";

export async function saveLetter(id: string, letter: string) {
  const session = await auth()

   if (!session) throw new Error('Authentication failed');
  if (!session.user) throw new Error('No user found');

  try {
    // Check if the history entry exists
    const historyEntry = await prisma.applyHistory.findUnique({
      where: { id }
    });

    if (!historyEntry) {
      throw new Error('History entry not found');
    }

    // Update the history entry with the new letter
    await prisma.applyHistory.update({
      where: { id },
      data: { letter }
    });

    // Revalidate the path to update the UI
    revalidatePath('/apply-history');

    return { success: true, message: 'Letter saved successfully' };
  } catch (error) {
    console.error('Error saving letter:', error);
    return { success: false, message: 'Failed to save letter' };
  }
}