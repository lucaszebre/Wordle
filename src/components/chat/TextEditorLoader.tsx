import React from 'react';
import { Skeleton } from "@/components/ui/skeleton"

export default function TextEditorSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex flex-row-reverse justify-between items-center">
        <div className='flex gap-2'>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-9 w-20" />
          ))}
        </div>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-9 w-9" />
          ))}
        </div>
        <div className='flex justify-end gap-3'>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      
      <Skeleton className="h-[60vh] w-full" />
      
      <div className="flex w-full items-center space-x-2">
        <Skeleton className="h-10 flex-grow" />
        <Skeleton className="h-10 w-16" />
      </div>
    </div>
  );
}