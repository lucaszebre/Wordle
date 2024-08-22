'use client'

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

/* eslint-disable react/jsx-no-undef */

import { Button } from "@/components/ui/button"

import React, {  useCallback, useEffect, useState } from "react"

import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { ScrollArea } from "../ui/scroll-area"
import 'tldraw/tldraw.css'
import _jsonSnapshot from '../snapshot.json'

// There's a guide at the bottom of this file!
import EditModel from "./EditModel"
import ViewTemplate from "./viewTemplate"




export default function SeeTemplate(props:{children:React.ReactNode,sections:any,name:string,id:string,description:string}) {
    const [isLoading,setIsLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [views, setViews] = useState(true);
    const [data,setData] = useState(props.sections)
  const queryClient = useQueryClient()

 
  
  




  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer" asChild>
        {props.children}
      </DialogTrigger>

      <DialogContent className="max-h-[90%] w-full max-w-[60%] h-full p-4 ">

      <ScrollArea className="h-full w-full space-y-4 overflow-hidden">

       
        <DialogHeader className="flex justify-between p-4 w-full flex-row">
          <div className="flex flex-col gap-2">
          <DialogTitle className="font-bold text-4xl">{!views ? 'Edit Your Model':props.name}</DialogTitle>
          <DialogDescription>{!views && 'A Model represent the struture of your future letter , check if all the information are valid'}</DialogDescription>
          </div>
          {views ? <Button onClick={()=>{setViews(false)}}>Edit</Button>:<Button onClick={()=>{setViews(true)}}>see View</Button>}
        </DialogHeader>
        <div className="w-full h-full">
          
      {views ?  <ViewTemplate model={{name:props.name,id:props.id,sections:props.sections,description:props.description}} /> :     <EditModel model={{name:props.name,id:props.id,sections:props.sections,description:props.description}} />}

		    </div>
       
       {/* <DialogFooter>
          <Button type="reset" onClick={()=>{setOpen(false)}}>Cancel</Button>
          <Button type="submit" >{isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}Update</Button>
        </DialogFooter> */}
     
    </ScrollArea>

      </DialogContent>

        
    </Dialog>
  )
}