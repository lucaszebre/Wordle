
import '../../globals.css'

import React from 'react'

import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import ReactQueryProvider from '@/providers/ReactProvidersQuery';
import { ThemeProvider } from '@/providers/theme-provider';
import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserNav } from '@/components/user-nav';
import { TokenBalance } from '@/components/TokenBalance';


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  

 
 


  return (
  <html lang="en">
    <body >
    <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
    <ReactQueryProvider>
    
    <Toaster />
      
      
      <div className=" flex-col flex ">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav >
                <div>
                <TokenBalance />
                </div>
              </UserNav >

              <ThemeToggle />

            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-4 pt-2">
        {children}


         
        </div>
      </div>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>

    </ReactQueryProvider>
    </ThemeProvider>

    </body>

  </html>
  )
}

