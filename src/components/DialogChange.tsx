'use client'



import React, {  useState } from "react"
import {  Dialog, DialogPanel } from '@headlessui/react'
import ChangeUserName from "./ChangeUserName"
import { Button } from "./ui/button"

export default function DialogChangeUsername(props:{children:React.ReactNode,user:any}) {
    let [isOpen, setIsOpen] = useState(false)

    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setIsOpen(false)
    } 
  return (
<>
<Button
asChild
        variant={'ghost'}
        onClick={open}
        className=" bg-none "
    >
        {props.children}
    </Button>
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-hidden">
            <div className="flex min-h-full items-center backdrop-blur-sm justify-center p-4">
                <DialogPanel
                transition
                className="w-full max-w-fit rounded-xl  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                >
                    <ChangeUserName user={props.user} />
                </DialogPanel>
            </div>
        </div>
    </Dialog>
</>

  )
}