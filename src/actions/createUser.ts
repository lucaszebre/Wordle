'use server'

import prisma from "@/config/db";

export async function CreateUser(username:string,email:string) {

   if (!username || !email) throw new Error('Authentication failed');


  try {
    const newUser = await prisma.user.create({
        data: {
          email,
          username,
        },
      });

    if (!newUser) {
      throw new Error('User already create');
    }

    return newUser
  } catch (error) {
    console.error('Error create user:', error);
    
  }
}