import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Auth from '@/components/auth/auth';


  function Home() {
   
   
    

    return (
        <>
            <Auth />
        </>
    );
}


export default Home