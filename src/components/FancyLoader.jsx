import React from 'react';
import { Loader2 } from 'lucide-react';

const FancyLoader = ({ 
  message = "Generating your letter. Please be patient...",
  size = "default"
}) => {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-6 w-6",
    large: "h-8 w-8"
  };

  return (
    <div className=" bg-background/80 backdrop-blur-sm flex items-center justify-center ">
      <div className="bg-card p-6 rounded-lg shadow-lg text-center max-w-sm w-full mx-4 space-y-4">
        <Loader2 className={`${sizeClasses[size]} animate-spin mx-auto text-primary`} />
        <p className="text-foreground font-medium">{message}</p>
      </div>
    </div>
  );
};

export default FancyLoader;