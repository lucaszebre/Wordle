/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
"use client"


import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button, buttonVariants } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { newschemaLetter } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Icons } from "../Icons"
import React, {  useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import toast, { Toaster } from "react-hot-toast"
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import axios from "axios"
import Link from "next/link"
import FancyLoader from "../FancyLoader"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { ScrollArea } from "../ui/scroll-area"
import { v4 as uuidv4 } from 'uuid';

const CreateResume = (props:{children:React.ReactNode,cvInfo?:any,user:any,templates:any}) => {
    const [open, setOpen] = useState(false);

    const [isLoading,setIsLoading] = useState(false)
    const [letter,setLetter] = useState("")
    const [defaultCV,setDefCV] = useState("")
    const [defaultTemplate,setDefTemplate] = useState("")
    const router = useRouter()
    const queryClient = useQueryClient()
    const [editMode, setEditMode] = useState(false);



  if(!props.cvInfo.length){
    return (
      <Dialog>
      <DialogTrigger>{props.children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Oupsi You need to add a CV Before</DialogTitle>
         
        </DialogHeader>
        <Image width={500} height={500} src={"/90rN.gif"} alt={"chat potté gif"} />

  <DialogFooter>
       <Link href='/cv' className={buttonVariants({ variant: "default" })} type="submit" >ADD CV</Link>
        </DialogFooter>
         
        
      </DialogContent>
    </Dialog>
    
    )
  }

  // const template =useQuery({
  //   queryFn: async () => {
  //     const  data = (await axios.get('/api/newletter'))


  //     setData(data.data)
  //     return data
  //   },
  //   queryKey: ['newletter'],
  //   enabled:true
  // })




  



  useEffect(() => {
      const defaultCV = props.user.cvInfos.find((d: any) => d.id === props.user.default_cv_id);
      const defaultTemplate = props.templates.find((d: any) => d.id === props.user.default_model_id);

      form.reset({
        template: defaultTemplate ? defaultTemplate.name : '',
        cv: defaultCV ? defaultCV.name : '',
        content:'',
        extrainfo:'',
        name:''
      });

      if (defaultTemplate) {
        setDefTemplate(defaultTemplate.name);
      }
      if (defaultCV) {
        setDefCV(defaultCV.name);
      }
    
  }, [open,]);




    const form = useForm<z.infer<typeof newschemaLetter>>({
      resolver: zodResolver(newschemaLetter),
      defaultValues: {
        name: '',
        template: '',
        cv: '',
        content: '',
        companyinfo: '',
        extrainfo: '',
      },
        })


  
    
    
      async function  onSubmit(values: z.infer<typeof newschemaLetter>) {
        if(props.user.tokenBalance > 0){
          setIsLoading(true)

           
          try {
            
            const cv =  props.user.cvInfos.find((d:any)=>{
              return values.cv == d.name
      
          })
            const template =  props.templates.find((d:any)=>{
              return values.template == d.name
      
          })  

          const letterId = uuidv4();



          localStorage.setItem('newLetterData', JSON.stringify({
            id: letterId,
            template,
            cv,
            companyCulture: values.companyinfo,
            jobDescription: values.content,
            extraInfo: values.extrainfo,
            name: values.name,
          }));
    
          router.replace(`/chat/${letterId}`)

       

          setOpen(false)

  

          setEditMode(true);
          } catch (error) {
            
          }
  
  
          
  
           
     
            setIsLoading(false)
        }else{
          toast.error('Need token')
        }

            
    
      }


      
    
     


  return (
    <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger>{props.children}</DialogTrigger>
    <DialogContent className={`max-h-[90%]  max-w-[60%] ${isLoading ? 'h-[30%]' : 'h-full'} ${isLoading ? 'w-[30%]' : 'w-full'} p-4`}>
          <ScrollArea className="overflow-hidden">
      {!isLoading &&  <DialogHeader>
        <DialogTitle>Want to create a new letter?</DialogTitle>
       
      </DialogHeader>}

     
      {isLoading ? (
       <FancyLoader 
       message="Crafting your perfect letter. This may take a moment..." 
       size="large"
     />
      ) : <Form {...form} >
      <form  onSubmit={form.handleSubmit(onSubmit)} className="p-3 content-start items-start flex-col space-y-8">
      <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-col items-start content-start w-full">
                      <FormLabel className="text-start w-full">Letter Name</FormLabel>
                      <FormControl>
                        <Input placeholder="title quizz" {...field}      
                        onPaste={(e) => {
                          const pastedText = e.clipboardData.getData('text');
                          form.setValue('name', pastedText);
                        }}  
              
              />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                    <FormField
          control={form.control}
          name="template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent defaultValue={defaultTemplate}>
                  {props.templates.map((t:any,i:number)=>{
                    return (                        
                    <SelectItem key={i} value={t.name}>{t.name}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />   
        <FormField
          control={form.control}
          name="cv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CV</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue  placeholder="Select a CV" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent defaultValue={defaultCV} >
                {props.user.cvInfos.map((t:any,i: number)=>{
                    return (                        
                    <SelectItem  key={i} value={t.name}>{t.name}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-col items-start content-start w-full">
              <FormLabel className="text-start w-full" >Jobs information</FormLabel>
              <FormControl>
              <Textarea  id="content" placeholder="Enter the content of your letter..." className="min-h-[150px]" {...field}  
              onPaste={(e) => {
                const pastedText = e.clipboardData.getData('text');
                form.setValue('content', pastedText);
              }} 
              />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />  <FormField
          control={form.control}
          name="companyinfo"
          render={({ field }) => (
            <FormItem className="flex-col items-start content-start w-full">
              <FormLabel className="text-start w-full" >Company info </FormLabel>
              <FormControl>
              <Textarea id="content" placeholder="Enter the content of your letter..." className="min-h-[150px]" {...field} 
                  onPaste={(e) => {
                    const pastedText = e.clipboardData.getData('text');
                    form.setValue('companyinfo', pastedText);
                  }} 
              
              />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />  <FormField
          control={form.control}
          name="extrainfo"
          render={({ field }) => (
            <FormItem className="flex-col items-start content-start w-full">
              <FormLabel className="text-start w-full" >Extra info</FormLabel>
              <FormControl>
              <Textarea id="content" placeholder="Enter the content of your letter..." className="min-h-[150px]" {...field}     
              onPaste={(e) => {
                const pastedText = e.clipboardData.getData('text');
                form.setValue('extrainfo', pastedText);
              }}  />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        /> 
    

<DialogFooter>
        {/* <AlertDialogCancel className="bg-red-300">Cancel</AlertDialogCancel> */}
     <Button  type="submit" className="w-full">{isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}CREATE LETTER</Button>
      </DialogFooter>
        
      </form>
    </Form>}
    </ScrollArea>
        </DialogContent>
  </Dialog>
  
  )
}

export default CreateResume
