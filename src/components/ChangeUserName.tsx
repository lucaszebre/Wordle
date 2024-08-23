'use client';

import { ChangeUserNameAction } from '@/actions/changeUserName';
import { SchemaUserName } from '@/types';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Icons } from "./Icons"
import React, { useContext, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface User {
  id: number;
  username: string;
}

export default function ChangeUserName({ user }: { user: User }) {
  const [username, setUserName] = useState(user.username);
  const router = useRouter();





  const [isLoading,setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof SchemaUserName>>({
    resolver: zodResolver(SchemaUserName),
    defaultValues: {
      username: user.username,
     
      
    },
  })

  async function  onSubmit(values: z.infer<typeof SchemaUserName>) {
      try {
        setIsLoading(true)
        
        const response = await ChangeUserNameAction(user.id,values.username)
      
        if (response) {
            toast.success('UserName updated successfully');
            setIsLoading(false)
            router.refresh();
          } else {
            setIsLoading(false)
            toast.error('Failed to update name');
          }

        
      } catch (error) {
        console.error('Error updating name:', error);
        setIsLoading(false)
        if(error instanceof Error){
            toast.error(error.message);

        }else{
            toast.error('Server error')
        }
      }
     

  }

  return (
    <>





<Card className="p-4">
    <CardHeader className="space-y-1">
        <CardTitle className="text-2xl ">Change your UserName</CardTitle>
        {/* <CardDescription >
          Enter your email below to login your account
        </CardDescription> */}
    </CardHeader>
    <Form {...form} >
      <form  onSubmit={form.handleSubmit(onSubmit)} className="p-3 content-start items-start flex-col space-y-8">
      <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-start items-start w-full" >UserName</FormLabel>
              <FormControl>
                <Input  placeholder="shadcn@dd11" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  type="submit" className="w-full">{isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}Change the UserName</Button>
      </form>
    </Form>
</Card>
    </>
   
  );
}