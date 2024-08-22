import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CreateTemplate from '../templates/createTemplate';
import { PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';

const TemplateCardSkeleton: React.FC = () => (
  <Card className="bg-gray-800">
    <CardHeader>
      <Skeleton className="h-6 w-3/4 bg-gray-700" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full bg-gray-700 mb-2" />
      <Skeleton className="h-4 w-2/3 bg-gray-700" />
    </CardContent>
    <CardFooter className="flex justify-between">
      <Skeleton className="h-8 w-20 bg-gray-700" />
      <Skeleton className="h-8 w-28 bg-gray-700" />
    </CardFooter>
  </Card>
);

const TemplatePageSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Templates</h1>
        <CreateTemplate >

        <Button>
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Template
        </Button>
        </CreateTemplate >

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(5)].map((_, index) => (
          <TemplateCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default TemplatePageSkeleton;