import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import DialogCV from '../templates/createTemplate';

const CVCardSkeleton: React.FC = () => (
  <Card className="bg-background rounded-lg shadow p-4">
    <div className="flex items-center justify-between mb-2">
      <div>
        <Skeleton className="h-5 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  </Card>
);

const CVDisplaySkeleton: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 animate-pulse">
       <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">CVs</h2>
        <DialogCV>
        <Button>Add CV</Button>

        </DialogCV>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <CVCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default CVDisplaySkeleton;