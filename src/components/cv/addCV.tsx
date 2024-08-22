/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
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
import Image from "next/image"
import axios from "axios"
import pdfToText from "react-pdftotext"
import { fromBuffer } from "pdf2pic";
import { Textarea } from "../ui/textarea"
import FancyLoader from "../FancyLoader"

export default function addCV(props:{children:React.ReactNode}) {
    const [isLoading,setIsLoading] = useState(false)
    const [file, setFile] = useState<File | null>(null);
    const [open, setOpen] = useState(false);

  const router = useRouter()
  const queryClient = useQueryClient()

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
        const uploadedFile = files[0];
        setFile(uploadedFile);

        const fileName = uploadedFile.name.replace(/\.[^/.]+$/, "");

        const currentName = form.getValues("name");
        if (!currentName) {
            form.setValue("name", fileName, { shouldValidate: true });
        }
    }
};

  
  const form = useForm<z.infer<typeof SchemaUploadCV>>({
    resolver: zodResolver(SchemaUploadCV),
    defaultValues: {
      name: "",
      
    },
  })

  async function  onSubmit(values: z.infer<typeof SchemaUploadCV>) {
       
if(file){
     setIsLoading(true)
     
     try {
      // const convert = fromBuffer(file);

            const extractedText = await pdfToText(file);


            const response = await axios.post('/api/cv', { name:values.name,text: extractedText.toString(),description:values.description });

            queryClient.refetchQueries({ queryKey: ['cvs'] })

            toast.success('just add a new cv')

        } catch (error) {
            console.error("Failed at adding a cv", error);
            toast.error('Error to add a cv')

        }
          setOpen(false)
          setIsLoading(false)
}
        
 
  }
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        {!isLoading &&   <DialogHeader>
          <DialogTitle>Submit Your CV</DialogTitle>
          <DialogDescription>Fill out the form below to submit your CV in PDF format.</DialogDescription>
        </DialogHeader> }
     

        {isLoading ? (
       <FancyLoader 
       message="Crafting your cv. This may take a moment..." 
       size="large"
     />
      ) : <Form {...form} >
      <form  onSubmit={form.handleSubmit(onSubmit)} className="p-3 content-start items-start flex-col space-y-8">
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
         <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-col items-start content-start w-full">
              <FormLabel className="text-start w-full" >Description</FormLabel>
              <FormControl>
                <Textarea placeholder="CV to get my new jobs as develloper" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
          <FormField
          control={form.control}
          name="cv"
          render={({ field }) => (
            <FormItem className="flex-col items-start content-start w-full">
              <FormLabel className="text-start w-full" >CV (PDF)</FormLabel>
              <FormControl>
                <Input type="file" accept=".pdf"  
                    {...form.register("cv")}   
                    onChange={onFileChange} 
                        placeholder="Upload your CV"   />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        /> 
       

          <Button className="w-full" type="submit">{isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}Submit CV</Button>
        </form>
    </Form> }
       
       
      </DialogContent>
      
        
    </Dialog>
  )
}