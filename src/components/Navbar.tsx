"use server"
import React from 'react';
import { Button } from "@/components/ui/button";
import { BarChart2, Settings } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import ToggleSignin from './Toggle';
import { getUser } from '@/actions/getUser';
import { ThemeToggle } from './theme-toggle';

const Navbar: React.FC<any> = async ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const cookie =cookies()

    const supabase = createClient(cookie);
    const {data,error} = await supabase.auth.getUser();

    const user = await getUser(data.user?.email)
   
  return (
    <nav className="flex flex-row  items-center h-[4rem] justify-center  w-screen border-b">
        <div className='w-[90%] max-w-[1440px] items-center  relative flex flex-row justify-between'>
            <h1 className="text-2xl font-bold">Wordle</h1>
       
               <ToggleSignin user={user}/>
                
        </div>
       
    </nav>
  );
};

export default Navbar;