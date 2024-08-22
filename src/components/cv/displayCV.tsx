/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, useEffect, useState } from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import DialogCV from "./addCV"
import { formatDate } from "@/lib/utils"
import DialogJson from "./editCV"
import DeleteCV from "./deleteCV"
import SetDefault from "./setCVDefault"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { FilePenIcon } from "lucide-react"
import CVDisplaySkeleton from "../skeletons/CVSkeleton"




export default function DisplayCV() {
const [defaultid ,setDefault]=useState('')
    const cvs =useQuery({
        queryFn: async () => {
          const  data = (await axios.get('/api/cv'))
          return data.data
        },
        queryKey: ['cvs'],
        refetchOnWindowFocus:true
            })

            useEffect(()=>{
              if(cvs.data){
              setDefault(cvs.data.user.default_cv_id)
      
      }
            },[cvs.isFetched])
            

      if(cvs.isLoading){
        return <CVDisplaySkeleton />
      }


     

  return (

    <>

<div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">CVs</h2>
        <DialogCV>
        <Button>Add CV</Button>

        </DialogCV>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cvs.data && cvs.data.all.map((cv: { id: string; content: string; name: string ;description:string; lastUpdated: string | Date }, index: Key | null | undefined) => (

              <Card className="bg-background rounded-lg shadow p-4">

          <div className="flex items-center justify-between mb-2">
          <DialogJson id={cv.id}  cv={cv.content} name={cv.name} >

            <div>
              <h3 className="text-lg font-semibold">{cv.name}</h3>
              <p className="text-muted-foreground">{cv.description}</p>
            </div>
            </DialogJson>

            <div className="flex items-center gap-4">
            <DeleteCV cvId={cv.id} name={cv.name}>

              <Button variant="ghost" size="sm">
                <TrashIcon className="w-4 h-4" />
              </Button>
              </DeleteCV>
              {defaultid == cv.id ? <span>Default</span> : <SetDefault setDefault={()=>{setDefault(cv.id)}} id={cv.id} >

<Button variant="outline" size="sm">
  <CheckIcon className="w-4 h-4" />
</Button>
</SetDefault>}
              

            </div>
          </div>
          </Card>
              


   

))}
    

        </div>
    </div>
      
   
    </>
  )
}

function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function FileIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}