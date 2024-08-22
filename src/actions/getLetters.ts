'use server'

import { prisma } from "@/config/db";
import axios from "axios";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export async function getLetters() {
  const session = await auth()

   if (!session) {
    redirect('/auth')

   };
  //  if (!data.user) throw new Error('No user found');

  try {
 


    const user = await prisma.user.findUnique({
        where: { mail: session.user?.email!},
        include:{cvInfos:true}
    });

    if(!user){
        return new Response("No user", { status: 400 });

    }
    const templates = await prisma.letterModel.findMany({where:{
        userId:user.id
    }})

    if (!user) throw new Error('User not found in database');

    
        
      const message =    await prisma.applyHistory.findMany({where:{
        userId:user?.id
      }})


    return {user,message,templates}
  } catch (error) {
    console.error('Error saving letter:', error);
    
  }
}