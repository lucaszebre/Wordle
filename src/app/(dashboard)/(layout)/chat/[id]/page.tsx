import { checkLetterExists } from '@/actions/CheckLetter';
import { getLetter } from '@/actions/getLetter';
import { getUser } from '@/actions/getUser';
import { auth } from '@/auth';
import TextEditor from '@/components/chat/chat';
import DisplayCV from '@/components/cv/displayCV'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
    const session = await auth();

	if (!session) {
	 	return redirect("/auth");
	 }

   const letterExists = await checkLetterExists(params.id);
   let letter = null;
 
   if (letterExists) {
     letter = await getLetter(params.id);
   }

   const user = await getUser()


  return (
    <>
      <TextEditor id={params.id}  letter={letter?.letter||''} new={!letterExists} user={user} />
    </>
  )
}

export default page