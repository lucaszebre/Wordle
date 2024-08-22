/* eslint-disable react/jsx-no-undef */
import Link from "next/link"
import React from "react"
import Image from "next/image"
import { SignIn } from "./auth/Button"

export default function Auth() {





  return (
    <div className="flex flex-col justify-center items-center gap-5 w-full h-full">
<div className="gap-5 flex flex-col">

<div className="flex flex-row content-center justify-center  w-full items-center">
        <Image src='/icon.png' width={100} height={100} alt="icon form" />


      </div>
      <div className="space-y-2 text-center">
        
        {/* <h1 className="text-3xl font-bold">SSO</h1> */}
      </div>
  

          <SignIn provider="linkedin" />
          <SignIn provider="google" />
          <SignIn provider="github" />
 
      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        By continuing, you agree to our{" "}
        <Link href="#" className="underline underline-offset-2" prefetch={false}>
          Terms of Service{" "}
        </Link>
        and {" "}
        <Link href="#" className="underline underline-offset-2" prefetch={false}>
          Privacy Policys.
        </Link>
        
      </p>
      </div> 

    </div>
  )
}

