/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
/* eslint-disable react/jsx-no-undef */

import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SchemaUploadCV } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Icons } from "../Icons"
import React, {  useState } from "react"
import { useRouter } from 'next/navigation'
import toast, { Toaster } from "react-hot-toast"
import { QueryClient, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { JsonEditor } from 'json-edit-react'
import { ScrollArea } from "../ui/scroll-area"

export default function editCV(props:{children:React.ReactNode,cv:Object,name:string,id:string}) {
    const [isLoading,setIsLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [data,setData] = useState(props.cv)
  const queryClient = useQueryClient()

 
  
  const form = useForm<z.infer<typeof SchemaUploadCV>>({
    resolver: zodResolver(SchemaUploadCV),
    defaultValues: {
      name: props.name,
      
    },
  })

  async function  onSubmit(values: z.infer<typeof SchemaUploadCV>) {
       
     setIsLoading(true)
     
     try {

            const response = await axios.put('/api/cv', { id:props.id, name:values.name,content:data,lastUpdated:new Date().toISOString() });

           toast.success('cv update sucessfully');
           queryClient.invalidateQueries({ queryKey: ['cvs'] })
           queryClient.refetchQueries({ queryKey: ['cvs'] })
           setOpen(false)

        } catch (error) {
          toast.error('error to update the cv');

            console.error("Failed at updating the cv", error);
        }
       
          setIsLoading(false)
        

  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        {props.children}
      </DialogTrigger>

      <DialogContent className="max-h-[90%] w-full max-w-[60%] h-full p-4 ">

      <ScrollArea className="h-full w-full space-y-4 overflow-hidden">

        <DialogHeader>
          <DialogTitle>Edit Your CV</DialogTitle>
          <DialogDescription>CV are stock as json , check if all the information are valid</DialogDescription>
        </DialogHeader>

        <Form {...form} >
      <form  onSubmit={form.handleSubmit(onSubmit)} className="p-5 content-start items-start flex-col space-y-8">
         <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-col items-start content-start w-full">
              <FormLabel className="text-start w-full" >Name</FormLabel>
              <FormControl>
                <Input placeholder="lucas1@gmail.com" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        /> 
        
         
       

        

          <div className="flex justify-center w-full">
            <JsonEditor
                    className="w-full h-full"
                    
                data={ data}
                onUpdate={ ({newData} ) => {
                  // Do something with the new data, e.g. update jsonData
                  console.log(newData)
                  setData(newData)
              }}
            />
          </div>
       
       <DialogFooter>
          <Button type="reset" onClick={()=>{setOpen(false)}}>Cancel</Button>
          <Button type="submit" >{isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}Update</Button>
        </DialogFooter>
        </form>
    </Form>
    </ScrollArea>

      </DialogContent>

        
    </Dialog>
  )
}