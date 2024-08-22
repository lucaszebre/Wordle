
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
          
      
        {children}


 
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

