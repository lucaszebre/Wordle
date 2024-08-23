"use client"
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
import { SchemaLogin } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Icons } from "../icons/index"
import React, { useContext, useState } from "react"
import toast from "react-hot-toast"
import { ChromeIcon } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"


export function Login() {
  const [isLoading,setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof SchemaLogin>>({
    resolver: zodResolver(SchemaLogin),
    defaultValues: {
      email: "",
      password:""
      
    },
  })
  const router = useRouter()

  async function  onSubmit(values: z.infer<typeof SchemaLogin>) {
    const supabase = createClient()
      try {
        setIsLoading(true)
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        })
        if(!data.user){
          throw Error('could not loging')
        }

        toast.success('sucessfully loging')


        setIsLoading(false)

        
        router.push('/')
        
      } catch (error) {
        console.error(error)
        toast.error('could not loging the user')
      }
     

  }

  return (
    <>
    <Card className="p-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl ">Login an account</CardTitle>
        <CardDescription >
          Enter your email below to login your account
        </CardDescription>
      </CardHeader>
    <Form {...form} >
      <form  onSubmit={form.handleSubmit(onSubmit)} className="p-3 content-start items-start flex-col space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-col items-start content-start w-full">
              <FormLabel className="text-start w-full" >Email</FormLabel>
              <FormControl>
                <Input placeholder="lucas1@gmail.com" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-start items-start w-full" >Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="shadcn@dd11" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button  type="submit" className="w-full">{isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}Login</Button>
      </form>
    </Form>
    <div className="flex flex-row justify-center">
      <span className="">or</span>
    </div>
    <Button onClick={()=>{
      const supabase = createClient()
      supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      
    }}  variant="outline" className="w-full">
                      
                      <ChromeIcon className="w-4 h-4 mr-2" />
                      Login with Google
                    </Button>
    </Card>
    
</>
    
  )
}