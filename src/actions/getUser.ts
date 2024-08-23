'use server'

import prisma from "@/config/db";
import { redirect } from "next/navigation";

export async function getUser(email?:string) {

  if(email){
    try {

      const user = await prisma.user.findUnique({
        where: { email: email }
    });
  
  
  
  
  
      return user
      
    } catch (error) {
      console.error('Error saving letter:', error);

    }


  }
    
 
  


 






}