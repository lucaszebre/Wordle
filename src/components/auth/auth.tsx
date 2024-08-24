// import { useState } from 'react'
import React, { useState } from 'react';
import { Login } from './login'
import { Button, buttonVariants } from '../ui/button'
import { cn } from '../../lib/utils'
import { Register } from './register';
import Link from 'next/link';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function Auth(props:{Close:()=>void}) {

  return (
    
   

    
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-row justify-center space-y-6 sm:w-[350px]">
        
        <Tabs defaultValue="register" className="max-w-[400px]">
  <TabsList>
    <TabsTrigger value="login">Login</TabsTrigger>
    <TabsTrigger value="register">Register</TabsTrigger>
  </TabsList>
  <TabsContent value="login"><Login Close={props.Close} /></TabsContent>
  <TabsContent value="register"><Register /></TabsContent>
</Tabs>
          
        </div>
      </div>

    
    
  )
}

export default Auth