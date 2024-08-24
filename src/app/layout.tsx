
import './globals.css'

import React from 'react'

import toast, { Toaster } from 'react-hot-toast';
import ReactQueryProvider from '@/providers/ReactProvidersQuery';
import { ThemeProvider } from '@/providers/theme-provider';



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
          
      
      <div className=" flex-col flex justify-center items-center overflow-x-hidden h-screen w-full ">
        
        {children}


         
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
