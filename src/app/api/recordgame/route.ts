import prisma from '@/config/db';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';



export async function GET(req: Request) {
    const cookiesStore = cookies()
const supabase = createClient(cookiesStore)
    try {
        
        const CurrentUser = await supabase.auth.getUser()

        if(!CurrentUser){
            return new Response("Need to be auth", { status: 400 })

        }


        const user = await prisma.user.findFirst({
           where:{
          email:CurrentUser.data.user?.email!
        }})

         if(user){
            const stat = await prisma.statistics.findFirst({
                where:{
               userId:user.id
             }
             }
              )

              return new Response(JSON.stringify(stat), { status: 200 })

         }


                    return new Response("User not found", { status: 400 })

    } catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 400 })

        }
    }

  
}

interface GameRecordType{
    guesses: number,
    won: boolean, 
    word: string
}


export async function POST(req: Request) {
    const cookiesStore = cookies()
    const supabase = createClient(cookiesStore)
    try {
        const CurrentUser = await supabase.auth.getUser()



        if(!CurrentUser.data.user){
            return new Response("Need to be auth", { status: 400 })

        }


        const user = await prisma.user.findFirst({
            where:{
           email:CurrentUser.data.user?.email!
         }})

         if(!user?.id){
            if(!CurrentUser){
                return new Response("User not found", { status: 400 })
    
            }
         }
        const { word, guesses, won } =  await req.json() as any ;


    
        const result = await prisma.$transaction(async (prisma) => {
            // Record the game
            const game = await prisma.game.create({
              data: {
                userId:user?.id,
                word,
                guesses,
                won,
              },
            });
      
            // Fetch current statistics
            let stats = await prisma.statistics.findUnique({
              where: { userId:user?.id },
            });

            if(user?.id){
                if (!stats ) {
                
                    stats = await prisma.statistics.create({
                      data: {
                        userId:user?.id,
                        gamesPlayed: 0,
                        gamesWon: 0,
                        currentStreak: 0,
                        maxStreak: 0
                      },
                    });
                  }
                  
            
                  const updatedStats = await prisma.statistics.update({
                    where: { userId:user?.id },
                    data: {
                      gamesPlayed: stats.gamesPlayed + 1,
                      gamesWon: stats.gamesWon + (won ? 1 : 0),
                      currentStreak: won ? stats.currentStreak + 1 : 0,
                      maxStreak: won ? Math.max(stats.maxStreak, stats.currentStreak + 1) : stats.maxStreak,
                    },
                  });
            
                  return { game, stats: updatedStats };

            }
      
           
          });
        return new Response(JSON.stringify({result}), { status: 200 })

    
      } catch (error) {
        console.error('Error recording game:', error);
        if (error instanceof Error) {
            return new Response(error.message, { status: 400 })

        }      }

  
}