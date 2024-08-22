import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function getFirstLetters(firstName:string, lastName:string) {
  return [firstName.charAt(0), lastName.charAt(0)];
}

export function checkFileType(file: File) {
  if (file?.name) {
      const fileType = file.name.split(".").pop();
      if (fileType === "docx" || fileType === "pdf") return true;
  }
  return false;
}


export function formatDate(input: Date | string): string {
  // Ensure input is a Date object
  const date = new Date(input);
  if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
  }

  return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });
}



