import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { createClient } from './supabase/client';
import prisma from '@/config/db';
import { CreateUser } from '@/actions/createUser';

interface RegisterData {
  email: string;
  password: string;
  username: string;
}

interface RegisterResponse {
  id: number;
  email: string;
  username: string;
}

const register = async ({ email, password, username }: RegisterData): Promise<any> => {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Registration failed: No user data returned');
    }

   

    const user = await CreateUser(username,email)

    return user
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('already in use')) {
        toast.error('Email already in use');
      } else {
        toast.error('Registration failed: ' + error.message);
      }
    } else {
      toast.error('An unexpected error occurred');
    }
    console.error('Registration error:', error);
    throw error;
  }
};

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterData>({mutationFn:register});
};