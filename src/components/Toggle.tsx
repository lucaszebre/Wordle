"use client"
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { BarChart2, LogIn, LogOut, Settings } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import DialogAuth from './auth/DialogAuth'
import DialogChangeUsername from './DialogChange'
import { ThemeToggle } from './theme-toggle'
import DialogStat from './DialogStat'

const ToggleSignin = (props:{user?:any}) => {
    const supabase = createClient()
    const logout = useMutation({
        mutationFn: async () => {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
        },
      });
    const router = useRouter()

    const HandleLogout = ()=>{
        logout.mutate()
        router.refresh()
    }
  return (
    <>
    <div className="flex  w-[20%] items-center justify-between">
             
              
                {
        props.user? 
        <DialogStat >
                <BarChart2 className="h-6 w-6" />
        </DialogStat>
          
          
        : 
        <DialogAuth>
                <BarChart2 className="h-6 w-6" />
        </DialogAuth>
        
    }           {
        props.user? 

        <DialogChangeUsername  user={props.user}>
                <Settings className="h-6 w-6" />
    </DialogChangeUsername>
         
          
        : 
        <DialogAuth>
                    <Settings className="h-6 w-6" />
        </DialogAuth>
        


    }      

<ThemeToggle />

    
         {
        props.user? 
        <Button onClick={HandleLogout} variant="outline" size="sm" className="ml-2">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
        </Button>     
          
        : 
        <DialogAuth>
                <LogIn className="h-4 w-4 mr-2" />
                Login
        </DialogAuth>
        
    }

            </div>

    </>
  )
}

export default ToggleSignin
