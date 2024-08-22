import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import axios from "axios"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export default function DeleteLetter(props: {
  children: React.ReactNode,
  LetterId: string,
  name: string
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient()

  const deleteLetter = useMutation({
    mutationFn: () => axios.delete(`/api/history?historyId=${props.LetterId}`),
    onSuccess: () => {
      toast.success('Letter deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['letters'] })
      setOpen(false)
    },
    onError: (error) => {
      toast.error('Error deleting the letter');
      console.error("Failed at deleting the letter", error);
    }
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {props.children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Letter</DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete your Letter? {props.name} This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button onClick={() => setOpen(false)} variant="outline">Cancel</Button>
          <Button 
            onClick={() => deleteLetter.mutate()} 
            className="bg-red-500 hover:bg-red-600 text-white"
            disabled={deleteLetter.isPending}
          >
            {deleteLetter.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}