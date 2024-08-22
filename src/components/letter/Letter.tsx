/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, useState } from "react"
import { PlusIcon } from "@radix-ui/react-icons"
import DialogCV from "../cv/addCV"
import { formatDate } from "@/lib/utils"
import DialogJson from "../cv/editCV"
import DeleteCV from "../cv/deleteCV"
import SetDefault from "../cv/setCVDefault"
import SeeLetter from "./seeLetter"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"
import CreateLetter from "./CreateLetter"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DeleteLetter from "./DeleteLetter"
import MotivationLettersSkeleton from "../skeletons/LetterSkeleton"
import { JSDOM } from 'jsdom';



export default function Letter(props:{letters:any}) {

 



    function stripHtml(html: string) {
      return html.replace(/<[^>]*>/g, '');
    }


  return (
    <>
   
     <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Motivation Letters</h1>
     
            <CreateLetter cvInfo={props.letters.user.cvInfos} user={props.letters.user} templates={props.letters.templates} >
                <Button>+ NEW Letter</Button>
              </CreateLetter>
            
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {props.letters && props.letters.message.map((history: { id: string; letter: string; name: string , description:string; updatedAt: string | Date }, index: Key | null | undefined) => (

         

            <Card className="">
              <CardHeader>
                <div className="flex w-full justify-between">
                <SeeLetter id={history.id}  letter={history.letter} name={history.name} >

                  <CardTitle className="cursor-pointer">{history.name}</CardTitle>
                  </SeeLetter>
                  <DeleteLetter LetterId={history.id} name={history.name}>
                    <Button variant="secondary" size="sm">
                      <TrashIcon className="w-5 h-5 mr-2" />
                      Delete
                    </Button>
                  </DeleteLetter>
                  
                    


                </div>

                <CardDescription>{history.updatedAt && formatDate(history.updatedAt)}</CardDescription>
              </CardHeader>
              <CardContent>
              <p className="line-clamp-2">
              {stripHtml(history.description)}
              </p>
              </CardContent>

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
