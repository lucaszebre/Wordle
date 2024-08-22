"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { Icons } from "../Icons";

export default function SetCVDefault(props:{id:string,children:React.ReactNode,setDefault:()=>void}) {
    const [isLoading,setIsLoading] = useState(false)

    const [open, setOpen] = useState(false);
    const putDefault = useMutation({
        mutationFn: async () => {
            setIsLoading(true)

        
            const { data,  } = await axios.put('/api/default',{default_cv_id:props.id})
            setIsLoading(false)

            props.setDefault()

            setOpen(false)

        },
        onError: () => {
            setIsLoading(false)

        toast.error('Error to set as default')
        },
        onSuccess:()=>{
            toast.success('Sucessfully set as default the cv')
        }
      }) 
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set CV as Default</DialogTitle>
          <DialogDescription>
          This will set the selected CV as your default for future applications.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button onClick={()=>setOpen(false)} variant="outline">Cancel</Button>
          <Button onClick={()=>putDefault.mutate()} className="bg-red-500 hover:bg-red-600 text-white">{isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}Set as Default</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}