import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const LetterCardSkeleton: React.FC = () => (
  <Card>
    <CardHeader>
      <div className="flex w-full justify-between items-center">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-8 w-20" />
      </div>
      <Skeleton className="h-4 w-1/2 mt-2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5" />
    </CardContent>
  </Card>
);

const MotivationLettersSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-9 w-48" />
        <Button disabled>
          <Skeleton className="h-4 w-24" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <LetterCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default MotivationLettersSkeleton;