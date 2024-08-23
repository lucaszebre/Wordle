// import prisma from '@/config/db';


// export async function GET(req: Request) {
    
//     try {
     

//         const session = await auth()

//         const user = await prisma.user.findFirst({
//            where:{
//           email:session?.user?.email!
//         }
//         }
//          )
        
//         return new Response(JSON.stringify({user}), { status: 200 })
//     } catch (error) {
//         if (error instanceof Error) {
//             return new Response(error.message, { status: 400 })

//         }
//     }

  
// }


// export async function PUT(req: Request) {
    
//     try {
//         const session = await auth()


//         if (!session) throw new Error('No user found');

//         const user = await prisma.user.findUnique({
//             where: { email: session.user?.email! }
//         });

//         if (!user) throw new Error('User not found in database');

//         // Assuming body data is JSON and needs to be parsed
//         const updates = await req.json();

//         // Update user with new data; only fields present in `updates` will be changed
//         const updatedUser = await prisma.user.update({
//             where: { email: session.user?.email! },
//             data: updates,
          
//         });

//         return new Response(JSON.stringify(updatedUser), { status: 200 });
//     } catch (error) {
//         return new Response("server error", { status: 400 });
//     }

  
// }



