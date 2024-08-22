"use client";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { FC, ReactNode, useState } from "react";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Copy, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from "next/link";

interface LetterDialogProps {
  name: string;
  letter: string;
  id: string;
  children: ReactNode;
}

const SeeLetter: FC<LetterDialogProps> = ({ name, letter, id, children }) => {
  const router = useRouter();

  const editor = useEditor({
    extensions: [StarterKit],
    content: letter,
    editable: false,
  });

  const copyToClipboard = () => {
    if (editor) {
      navigator.clipboard.writeText(editor.getText()).then(() => {
        toast.success("Letter content copied to clipboard!");
      }, (err) => {
        console.error('Could not copy text: ', err);
        toast.error("Failed to copy letter content.");
      });
    }
  };

  const goToChat = () => {
    router.replace(`/chat/${id}`); // Adjust this route as needed
  };

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="w-full h-full max-h-[90vh] max-w-[80vw] flex flex-col">
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 overflow-auto">
            <div className="p-4 bg-white text-black">
              <EditorContent editor={editor} />
            </div>
          </ScrollArea>
        </div>
        <DialogFooter className="flex justify-between items-center">
          <div>
            <Button variant="outline" onClick={copyToClipboard} className="mr-2">
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button asChild variant="outline" onClick={goToChat}>
              <Link href={`/chat/${id}
`}>                   <MessageSquare className="mr-2 h-4 w-4" />
              Chat
              </Link>
          
            </Button>
          </div>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SeeLetter;