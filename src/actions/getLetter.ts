'use server'

import { auth } from "@/auth";
import { prisma } from "@/config/db";

export async function getLetter(id: string) {
  const session = await auth()

   if (!session) throw new Error('Authentication failed');

  if (!session.user?.email) throw new Error('No user found');

  try {
    // Check if the history entry exists
    const historyEntry = await prisma.applyHistory.findUnique({
      where: { id }
    });

    const user = await prisma.user.findUnique({
      where: { mail: session.user.email }
  });

    if (!historyEntry) {
      throw new Error('History entry not found');
    }




    return {letter:historyEntry.letter,user}
  } catch (error) {
    console.error('Error saving letter:', error);
    
  }
}