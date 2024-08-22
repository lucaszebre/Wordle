/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import toast, { Toaster } from "react-hot-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { profileFormSchema } from "@/types"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { prisma } from "@/config/db"
import { useEffect, useState } from "react"
import axios from "axios"
import { Icons } from "@/components/Icons"
import pdfToText from "react-pdftotext"
import { Skeleton } from "@/components/ui/skeleton"





type ProfileFormValues = z.infer<typeof profileFormSchema>



export function ProfileForm() {
  const [data,setData] = useState<any>()
  const [isLoading,setIsLoading] = useState(false)
  const [file,setFile] = useState<File>()

  const currentUser =useQuery({
    queryFn: async () => {
      const  data = (await axios.get('/api/user'))
      setData(data.data.response)
      return data
    },
    queryKey: ['user'],
    enabled:true
  })


  

  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    
  })

  useEffect(() => {
    if (data) {
      form.reset({
        firstName: data?.firstName ? data.firstName : "",
        lastName: data?.lastName ? data.lastName : "",
        email: data.mail ? data.mail : "",
        dob: data.birthDate ? data.birthDate: undefined
        
      });
    }
  }, [ currentUser.isFetched,currentUser.isFetching]);
 

  async function onSubmit(values: ProfileFormValues) {
    setIsLoading(true)

   try {
    let path = ''

    if(file){


      const fileName = file.name.replace(/\.[^/.]+$/, "");

      console.log(fileName,"filename");

  //     const { data, error } = await supabase
  // .storage
  // .from('avatars')
  // .upload(`${fileName}.jpg`, file, {
  //   cacheControl: '3600',
  //   upsert: true
  // })


  // if(data?.path){
  //   path=  data.path}


    }
    
     const data = await axios.put('/api/user',{
      firstName:values.firstName,
      lastName:values.lastName,
      mail:values.email,
      birthDate:values.dob,
      profilePicture:'https://jltpalikdmdmcthdhswq.supabase.co/storage/v1/object/public/avatars/'+path
      
     })
   } catch (error) {
    toast.error('something went wrong')
   }


   toast.success('profile updated')

 
    setIsLoading(false)
  }

  if(currentUser.isLoading){
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    )
  }

  const onFileChange = (event:any) => {
    const file = event.target.files[0];
    setFile(file)
  };

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        /> 
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="cv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CV</FormLabel>
              <FormControl>
                <Input type="file" {...form.register("cv")} onChange={onFileChange} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" {...form.register("photo")} onChange={onFileChange} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit">{isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}Update profile</Button>
      </form>
    </Form>
  )
}
