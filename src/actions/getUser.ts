'use server'

import { auth } from "@/auth";
import { prisma } from "@/config/db";
import { redirect } from "next/navigation";

export async function getUser(email?:string) {

  if(email){
    
    const user = await prisma.user.findUnique({
      where: { mail: email }
  });





    return user
  }
  const session = await auth()

   if (!session?.user?.email) redirect('/auth');

  try {
    // Check if the history entry exists
 

    const user = await prisma.user.findUnique({
      where: { mail: session.user.email }
  });





    return user
  } catch (error) {
    console.error('Error saving letter:', error);
    
  }
}