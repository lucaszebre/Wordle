import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import axios from "axios"
import toast from "react-hot-toast"
import { QueryClient, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export default function DeleteTheTemplate(props:{
    children:React.ReactNode,templateId:string,name:string
}) {
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient()

    function DeleteTemplate(){
        try {
            axios.delete(`/api/template?templateId=${props.templateId}`)

            toast.success('Template delete sucessfully');
            queryClient.invalidateQueries({ queryKey: ['templates'] })
            queryClient.refetchQueries({ queryKey: ['templates'] })
            setOpen(false)
        } catch (error) {
            toast.error('Error do delete the cv');
            console.error("Failed at deleting the cv", error);

        }
    }
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Template</DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete your Template? {props.name} This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button onClick={()=>{
            setOpen(false)
          }} variant="outline">Cancel</Button>
          <Button onClick={DeleteTemplate} className="bg-red-500 hover:bg-red-600 text-white">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}