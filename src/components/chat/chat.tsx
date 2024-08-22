/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
"use client"

import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Icons } from '@/components/Icons';
import toast from 'react-hot-toast';
import { saveLetter } from '@/actions/saveletter';
import CharacterCount from '@tiptap/extension-character-count'
import { Copy, Redo, RotateCw, Save, SquareX, Trash2, Undo, UndoDot } from 'lucide-react';
import { editTextIA } from '@/actions/editTextIA';
import { Hearts, MagnifyingGlass } from 'react-loader-spinner'
import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { Decoration, DecorationSet } from 'prosemirror-view';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-2 mb-4">
   
      <Button 
        variant="outline"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={editor.isActive('undo') ? 'bg-secondary' : ''}

        >
           <Undo strokeWidth={3} />
           </Button>
          <Button 
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={editor.isActive('redo') ? 'bg-secondary' : ''}
          >
            <Redo strokeWidth={3} />
          </Button>
    </div>
  );
};

const Highlight = Extension.create({
  name: 'highlight',

  addAttributes() {
    return {
      class: 'highlight',
    }
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('highlight'),
        props: {
          decorations: state => {
            const { doc, selection } = state;
            if (selection.empty) return DecorationSet.empty;
            
            return DecorationSet.create(doc, [
              Decoration.inline(selection.from, selection.to, {
                class: 'highlight',
              }),
            ]);
          },
        },
      }),
    ];
  },
});


export default function TextEditor(props:{id:string,letter?:string,new:boolean,user:any}) {

  const [letter, setLetter] = useState(props.letter);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEditor, setIsLoadingEditor] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const queryClient = useQueryClient();
  const router = useRouter()
  const editor = useEditor({
    extensions: [StarterKit, CharacterCount, Highlight],
    content: letter,
    autofocus:false,
    onUpdate: ({ editor }) => {
      const selection = editor.state.selection;
      editor.commands.setTextSelection(selection);
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      const text = editor.state.doc.textBetween(from, to, ' ');
      setSelectedText(text);
    },
    editorProps: {
      attributes: {
        class: 'p-10 prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    }
  });




  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const newLetterData = localStorage.getItem('newLetterData');
      if (newLetterData) {
        const parsedData = JSON.parse(newLetterData);
        if (parsedData.id === props.id) {
          try {
            NewLetter(parsedData);
          } catch (error) {
            console.error('Error generating letter:', error);
            throw error;
          }
        }
      }
      effectRan.current = true;
    }
  }, [props.id]);

 
 useEffect(()=>{
  if(letter){
    editor?.commands.setContent(letter);

  }
 },[letter])

  const handleGenerateNewLetter = async (body: JSON) => {
    setIsLoadingEditor(true);
    setLetter('')
    const it = streamingNewFetch('/api/history', body);
    let content=""
    for await (let value of it) {
      try {
        content += value;

        console.log(value)
        editor?.commands.setContent(content);
        setLetter(content)

      } catch (e: any) {
        console.error(e.message);
      }
    }

    console.log(content)
    // setLetter(content)
    queryClient.invalidateQueries({ queryKey: ['user'] });

    setIsLoadingEditor(false);
    localStorage.removeItem('newLetterData');
  };

  const handleGenerateLetter = async () => {
    setIsLoadingEditor(true);
    setLetter('')
    const it = streamingFetch('/api/regenerate');
    let content=""
    for await (let value of it) {
      try {
        content += value;
        editor?.commands.setContent(content);
        setLetter(content)
        // setStreamedContent(accumulatedContent);
      } catch (e: any) {
        console.error(e.message);
      }
    }
    setLetter(content)
    queryClient.invalidateQueries({ queryKey: ['user'] });
    queryClient.refetchQueries({ queryKey: ['user'] });

    setIsLoadingEditor(false);
    if (content) {
      saveLetter(props.id as string, content);

    }

  };


  console.log(props.id)

  const saveMutation = useMutation({
    mutationFn: async () => {
      await axios.put(`/api/history/${props.id}`, { letter });
    },
    onSuccess: () => {
      toast.success("Saved successfully");
      queryClient.refetchQueries({ queryKey: ['letters'] })
      router.refresh()

    },
    onError: (error) => {
      queryClient.refetchQueries({ queryKey: ['letters'] })

      console.error('Save error:', error);
      toast.error("Failed to save");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/history/${props.id}`);
    },
    onSuccess: () => {
      toast.success("Deleted successfully");
      setLetter('');
      editor?.commands.setContent('');
      queryClient.invalidateQueries({ queryKey: ['letters'] })
      router.replace('/dashboard')

    },
    onError: (error) => {
      console.error('Delete error:', error);
      toast.error("Failed to delete");
      queryClient.invalidateQueries({ queryKey: ['letters'] })

    },
  });



  const handleRegenerate = () => {
    console.log(props.user.tokenBalance    )
  
    if(parseInt(props.user.tokenBalance)>0  && props.user.tokenBalance){
      handleGenerateLetter()

    }else{
      toast.error('Need token')
    }
  }; 
  
  const NewLetter = (body:JSON) => {
    console.log("encore")
    handleGenerateNewLetter(body)
  };


   async function* streamingFetch( input: RequestInfo | URL, init?: RequestInit  ) {
    

    const response = await fetch( input, {method:'post',body: JSON.stringify({id:props.id})})  

    if(!response.body){
      console.error('need the reader')
      return
    }
    const reader  = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    for( ;; ) {
        const { done, value } = await reader.read()
        if( done ) break;

        try {
            yield decoder.decode(value)
        }
        catch( e:any ) {
            console.warn( e.message )
        }

    }
}

async function* streamingNewFetch( input: RequestInfo | URL,body:JSON, init?: RequestInit  ) {
    

    const response = await fetch( input, {method:'post',body: JSON.stringify({body})})  

    if(!response.body){
      console.error('need the reader')
      return
    }
    const reader  = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let letter = ""
    for( ;; ) {
        const { done, value } = await reader.read()
        if( done ) break;

        try {
            yield decoder.decode(value,{stream:true})
            // letter += decoder.decode(value)
        }
        catch( e:any ) {
            console.warn( e.message )
        }finally{
          console.log("letter in newfetch",letter)
        }

    }
}

  const handleCopy = useCallback(() => {
    const content = editor?.getText() || '';
    navigator.clipboard.writeText(content).then(
      () => toast.success("Copied to clipboard"),
      (err) => {
        console.error('Copy error:', err);
        toast.error("Failed to copy");
      }
    );
  }, [editor]);

  const handleAIAssist = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const textToProcess = selectedText || editor?.getHTML() || '';
      console.log('Text to process:', textToProcess);  // Debug log
      console.log('Input:', input);  // Debug log
      const result  = await editTextIA(input, textToProcess);
      if(result){
      
      if (selectedText && editor) {
        editor.chain().focus().deleteSelection().insertContent(result).run();
      } else if (editor) {
        editor.commands.setContent(result);
      }
      
      setInput('');
      setSelectedText('');
      toast.success("AI assistance applied successfully");
      }else{
        toast.error("AI assistance Error");

      }
      
    } catch (error) {
      console.error('AI assist error:', error);
      toast.error("Failed to process AI request");
    } finally {
      setIsLoading(false);
    }
  };


  if(!editor){
    return null
  }
    return (
        <>
        {letter &&  <div className="flex flex-row-reverse mt-10 justify-between items-center">
          
          <div className='flex gap-2'>
              <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRegenerate}
              disabled={isLoadingEditor}
              >
              {isLoadingEditor ? <><Icons.spinner className="h-4 w-4 animate-spin" /> <p>Regenerating...</p></> : <RotateCw />}
              </Button>
          <Button 
              variant="outline" 
              size="sm" 
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
              >
              {deleteMutation.isPending ? <Icons.spinner className="h-4 w-4 animate-spin" /> :<Trash2 />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopy}><Copy /></Button>
              <Button 
              variant="outline" 
              size="sm" 
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
              >
              {saveMutation.isPending ? <Icons.spinner className="h-4 w-4 animate-spin" /> :<Save />}
              </Button>
          
          </div>
          <MenuBar editor={editor} />
          <div className='flex justify-end gap-3'>
          <span>
               {editor.storage.characterCount.characters()} characters
          </span> 
          <span>
               {editor.storage.characterCount.words()} words
          </span>
      </div>
      </div>  }
        
        {!letter  ?  <div className='flex items-center h-full min-h-screen w-full justify-center'>
          <MagnifyingGlass
  visible={true}
  height="80"
  width="80"
  ariaLabel="magnifying-glass-loading"
  wrapperStyle={{}}
  wrapperClass="magnifying-glass-wrapper"
  glassColor="#c0efff"
  color="#e15b64"
  />
  <span>We are crafting your letter...</span>
        </div> 
          
          :   <>  <style jsx global>{`
            .ProseMirror ::selection {
              background-color: #FFFF00; /* Yellow background */
              color: #000000; /* Black text */
            } 
              
          
           .highlight {
  background-color: #FFFF00;
  color: #000000 !important; /* Force black text color */
}
            .ProseMirror p.is-editor-empty:first-child::before {
              content: attr(data-placeholder);
              float: left;
              color: #adb5bd;
              pointer-events: none;
              height: 0;
            }
          `}</style> <EditorContent 
          editor={editor} 
        
          className="border  min-h-full  w-full h-full  prose prose-sm max-w-none" 
        /></>
         }
       
        
  
  
          {/* <Textarea
            className="prose border w-full h-full p-4 rounded-md"
            value={letter}
          /> */}
        {
          letter && !props.new &&

          <CardFooter>
            <form onSubmit={handleAIAssist} className="flex w-full items-center space-x-2">
                <Input
                className="flex-grow"
                value={input}
                placeholder={selectedText ? "Modify selected text..." : "Ask AI to assist with editing..."}
                onChange={e =>{
                    e.preventDefault()    
                    setInput(e.target.value)
                } }
                />
                <Button type="submit" disabled={isLoading}>
                {isLoading ? <Icons.spinner className="h-4 w-4 animate-spin" /> : "Send"}
                </Button>
            </form>
            </CardFooter>
        }    
    
        </>
        
    );
  }
  