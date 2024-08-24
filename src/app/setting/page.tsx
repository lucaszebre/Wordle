import { getUser } from '@/actions/getUser';
import ChangeUserName from '@/components/ChangeUserName';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'


const Page = async () => {
    const cookie =cookies()

    const supabase = createClient(cookie);
    const {data,error} = await supabase.auth.getUser();
    const user =  await getUser(data.user?.email)
    if (!data.user ||   !user?.email) {
         redirect('/auth')
     }

  return (
    <>
      <ChangeUserName user={{id:user.id,username:user?.username}} />
    </>
  )
}

export default Page


