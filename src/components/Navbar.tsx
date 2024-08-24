"use server"
import React from 'react';
import { Button } from "@/components/ui/button";
import { BarChart2, Settings, LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Toggle from './Toggle';

const Navbar: React.FC<any> = async ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const cookie =cookies()

    const supabase = createClient(cookie);
    const {data,error} = await supabase.auth.getUser();

    console.log(data.user?.email,'inside the navabr')
   
  return (
    <nav className="flex flex-row  items-center h-[4rem] justify-center  w-screen border-b">
        <div className='w-[90%] max-w-[1440px] flex flex-row justify-between'>
            <h1 className="text-2xl font-bold">Wordle</h1>
            <div className="flex  w-[10%] items-center justify-between">
                <Button variant="ghost" size="icon">
                    <Link href={'/stats'}>
                        <BarChart2 className="h-5 w-5" />
                    </Link>
                </Button>
                <Button asChild variant="ghost" size="icon">
                    <Link href='/setting'>
                        <Settings className="h-5 w-5" />
                    </Link>
                </Button>
               <Toggle email={data.user?.email}/>
                
            </div>
        </div>
       
    </nav>
  );
};

export default Navbar;