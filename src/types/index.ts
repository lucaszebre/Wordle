import { checkFileType } from '@/lib/utils';
import z from 'zod';





export interface FormDataRegister {
  email: string;
  password: string;
  username: string;
}





export const SchemaLogin = z.object({
  email: z.string().min(1,{ message: 'need a username' }),
  password: z.string().min(1, { message: 'at least 1 characters long' })
  ,
});

export interface FormDataRegister {
  email: string;
  password: string;
  username: string;
}



export const schemaProfile = z.object({
  firstname: z.string().min(1, { message: 'cant be empty' }),
  lastname: z.string().min(1, { message: 'cant be empty' }),
  email: z.string().email({ message: 'Invalid email format' }),
  });
  
  export const SchemaUserName = z.object({
  username: z.string().min(1, { message: 'cant be empty' }),
  });


export const SchemaRegister = z.object({
email: z.string().email().min(1,{ message: 'need a email' }),
username: z.string().min(1,{ message: 'need a first name' }),
password: z.string().min(1, { message: 'at least 1 characters long' })
,
});