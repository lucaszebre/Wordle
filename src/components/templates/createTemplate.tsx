"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
/* eslint-disable react/jsx-no-undef */

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { EditModeType, SchemaUploadCV, createtemplateschema, edittemplateschema, sectionTemplate, sectionType } from "@/types"
import { z } from "zod"
import { Icons } from "../Icons"
import { useRouter } from 'next/navigation'
import toast, { Toaster } from "react-hot-toast"
import Image from "next/image"
import axios from "axios"
import pdfToText from "react-pdftotext"
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { QueryClient } from "@tanstack/query-core"
import react, { useState } from "react"
import { Controller, useFieldArray, useForm} from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { ScrollArea } from "../ui/scroll-area"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const initialValues = {
    name: "Initial Model Name",
    description:"template for bussiness angels",
    sections: [
      {
        id: "section-1",
        type: "introduction",
        guidelines: "Initial guidelines",
        min_line: 1,
        max_line: 10
      },
      {
        id: "section-2",
        type: "body",
        guidelines: "Initial body guidelines",
        min_line: 2,
        max_line: 20
      }
    ]
  };

export default function DialogCV(props: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    const form = useForm<z.infer<typeof createtemplateschema>>({
    resolver: zodResolver(edittemplateschema),
    mode: 'onChange',
    defaultValues: initialValues
  });
    const { fields, append, remove, update } = useFieldArray({
      name: "sections",
      control: form.control,
    });


    const createModel = async (values: z.infer<typeof createtemplateschema>) => {
      console.log(values)
    const { data } = await axios.post(`/api/template`, values);
    return data;
  };
  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof createtemplateschema>) => {
      await createModel(values)

    
    },
    onError: (error:any) => {
      toast.error('Error to update the model: ' + error.message);

    console.log("errors")
    },
    onSuccess:()=>{
       // Handle successful mutation here
       toast.success('Update the Model');
       queryClient.invalidateQueries({ queryKey: ['templates'] });
    },
    onSettled: () => {
      // This runs after either onSuccess or onError
      setOpen(false)
      setIsLoading(false);
    }
  }) 

 
  
    const onSubmit = (values: z.infer<typeof createtemplateschema>) => {
      setIsLoading(true); // Set loading state before mutation starts
      mutation.mutate(values); // Trigger the mutation
    };
    const getCardBgClass = (type: string) => {
      switch (type) {
        case "introduction":
          return 'bg-green-500';
        case "body":
          return 'bg-yellow-500';
        case "conclusion":
          return 'bg-red-500';
          case "text":
          return 'bg-red-300';
        default:
          return 'bg-blue-500';
      }
    };
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {props.children}
        </DialogTrigger>
        <DialogContent className="max-h-[90%] w-full max-w-[60%] h-full p-4">
          <ScrollArea className="overflow-hidden">
            <DialogHeader className="p-4">
              <DialogTitle>Create your template</DialogTitle>
              <DialogDescription>Fill out the form below to create your personalized template</DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 content-start items-start flex-col space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-col items-start content-start w-full">
                      <FormLabel className="text-start w-full">Model Name</FormLabel>
                      <FormControl>
                        <Input placeholder="title quizz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex-col items-start content-start w-full">
                      <FormLabel className="text-start w-full">Model Description</FormLabel>
                      <FormControl>
                        <Input placeholder="The template for bussiness angels" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
  
                {fields.map((field, index) => (
                  <Card
                    className={`relative p-4 ${getCardBgClass(field.type)}`}
                    key={field.id}
                  >
                    <div className="flex justify-between w-full h-[40px] relative">
                      <p className="font-bold text-2xl text-white">{field.type}</p>
                      <svg onClick={() => remove(index)} className="absolute cursor-pointer top-0 right-0" width="30" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM4.50003 7C4.22389 7 4.00003 7.22386 4.00003 7.5C4.00003 7.77614 4.22389 8 4.50003 8H10.5C10.7762 8 11 7.77614 11 7.5C11 7.22386 10.7762 7 10.5 7H4.50003Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                    </div>
                    <Controller
                      control={form.control}
                      name={`sections.${index}.type`}
                      render={({ field: { onChange, value, ...field } }) => (
                        <FormItem>
                          <FormLabel>Type of Blocks</FormLabel>
                          <FormControl>
                            <Select onValueChange={(e) => {
                              onChange(e);
                              update(index, { ...fields[index], type: e });
                            }} value={value}>
                              <SelectTrigger className="w-full font-bold bg-white text-black ">
                                <SelectValue placeholder={"Select type"} />
                              </SelectTrigger>
                              <SelectContent className="bg-white font-bold text-black">
                                <SelectItem value={'introduction'}>Introduction</SelectItem>
                                <SelectItem value={'body'}>Body</SelectItem>
                                <SelectItem value={'conclusion'}>Conclusion</SelectItem>
                                <SelectItem value={'extra'}>Extra</SelectItem>
                                <SelectItem value={'text'}>Text</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {field.type === 'text' ? (
                      <FormField
                        control={form.control}
                        name={`sections.${index}.guidelines`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Text Content</FormLabel>
                            <FormControl>
                              <Textarea className="bg-white text-black font-bold" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <>
                        <FormField
                          control={form.control}
                          name={`sections.${index}.guidelines`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Guidelines</FormLabel>
                              <FormControl>
                                <Textarea className="bg-white text-black font-bold" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`sections.${index}.min_line`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimum Number of Lines</FormLabel>
                              <FormControl>
                                <Input type="number" className="bg-white text-black font-bold" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`sections.${index}.max_line`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Maximum Number of Lines</FormLabel>
                              <FormControl>
                                <Input type="number" className="bg-white text-black font-bold" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}
                  </Card>
                ))}
  
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-green-600 text-white"
                  onClick={() => append(sectionTemplate)}
                >
                  Add Section
                </Button>
  
                <div className="flex flex-row justify-between w-full gap-2">
                  <Button type="submit" className="w-full bg-red-300">
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save Model
                  </Button>
                </div>
              </form>
            </Form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }