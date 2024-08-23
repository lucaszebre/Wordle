'use server'

import prisma from "@/config/db";

export async function ChangeUserNameAction(id:number,username:string) {

   if (!username || !id ) throw new Error('Missing the paramaters');



    const user = await prisma.user.findUnique({where:{
        username
    }})

    if(!user){
        const newUser = await prisma.user.update({
            where:{
                id
            },
            data: {
              username,
            },
          });

          return newUser

    }


      throw new Error('UserName already take');
    

 
}