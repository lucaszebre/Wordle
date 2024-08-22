/* eslint-disable react/jsx-key */
// components/Section.tsx
import { sectionTemplate } from '@/types';
import React from 'react';

interface Props {
  section: any;
}

const SectionComponent: React.FC<Props> = ({ section }) => {
    // Determine background and text color based on the type
    const backgroundColor = section.type === "introduction" ? 'bg-green-500' :
                            section.type === "body" ? 'bg-yellow-500' :
                            section.type === "conclusion" ? 'bg-red-500' :
                            'bg-blue-500';
  
                            const guidelines = section.guidelines.split(",");
    return (
      <div className={`p-4 my-4 border-4 border-dotted ${backgroundColor}`}>
        <h2 className="font-extrabold text-xl  text-white ">{section.type.toUpperCase()} : </h2>
        {guidelines.map((g:string)=>{
            return (
                <p className="mt-2 text-white text-lg p-2">- {`${g}`}</p>

            )
        })}
        <div className='flex flex-row justify-end w-full'>
            <p className="text-sm text-white font-extrabold">Number of lines: {section.min_line} - {section.max_line}</p>
        </div>
        
      </div>
    );
  };
  
  export default SectionComponent;
