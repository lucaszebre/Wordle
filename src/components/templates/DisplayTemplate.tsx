/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
"use client"
import { Key, useCallback, useEffect, useState } from 'react'
import { TLEditorSnapshot, TLStoreSnapshot, Tldraw, getSnapshot, loadSnapshot, useEditor } from 'tldraw'
import 'tldraw/tldraw.css'
import _jsonSnapshot from '../snapshot.json'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ScrollArea } from '../ui/scroll-area'
import { CheckIcon, FileIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { Button } from '../ui/button'
import SeeTemplate from './SeeTemplate'
import DeleteTheTemplate from './deleteTemplate'
import CreateTemplate from './createTemplate'

import { Card } from '../ui/card'
import SetTemplateDefault from './setTemplateDefault'
import TemplatePageSkeleton from '../skeletons/TemplateSkeleton'

export default function DisplayTemplate() {
  const [defaultid,setDefault] = useState("")
    
    const templates =useQuery({
        queryFn: async () => {
          const  data = (await axios.get('/api/template'))

          
          return data.data
        },
        queryKey: ['templates'],
            })


            useEffect(()=>{
              if(templates.data){
                              setDefault(templates.data.user.default_model_id)

              }
            },[templates.isFetched])


      if(templates.isLoading){
        return <TemplatePageSkeleton/>
      }

   
      

	return ( 
    <>
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Templates</h1>
        <CreateTemplate >

        <Button>
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Template
        </Button>
        </CreateTemplate >

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {templates.data && templates.data.allLetter.map((model: { id: string;description:string; sections: JSON; name: string },index: Key | null | undefined) => (

        <Card className="bg-background rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
        <SeeTemplate id={model.id}  sections={model.sections} name={model.name}  description={model.description} >
        <h2 className="text-xl cursor-pointer font-bold mb-2 line-clamp-1">{model.name}</h2>
        </SeeTemplate>

        <p className="text-muted-foreground mb-4 cursor-pointer line-clamp-2">{model.description}</p>
      

        <div className="flex items-center justify-between">
        <DeleteTheTemplate  name={model.name} templateId={model.id}>

        <Button variant="secondary" size="sm">
        <TrashIcon className="w-5 h-5 mr-2" />
        Delete
        </Button>
        </DeleteTheTemplate>
        {
         defaultid ==model.id ? <span>Default</span> : <SetTemplateDefault setDefault={()=>{setDefault(model.id)}} id={model.id} >

          <Button variant="outline" size="sm">
          <CheckIcon className="w-5 h-5 mr-2" />
          Set as Default
          </Button>
          </SetTemplateDefault>
        }
                

        </div>
        </div>
        </Card>









))}
        
        </div>
      </div>
  

    
       
        
  </>

        
        
		
	)
}
