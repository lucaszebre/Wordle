
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { LogIn, LogOut } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { SignOut } from './auth/Button'

const Toggle = (props:{email?:string}) => {


  return (
    <>
      {
        props.email? 
            <SignOut  />
    
          
                    : 
                    <Button asChild variant="outline" size="sm" className="ml-2">
                        <Link href={'/auth'}>
                            <LogIn className="h-4 w-4 mr-2" />
                            Login
                        </Link>
                    </Button>
                }
    </>
  )
}

export default Toggle
