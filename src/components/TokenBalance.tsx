"use client"

import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"
import { getUser } from "@/actions/getUser"
import { Skeleton } from "@/components/ui/skeleton"
import axios from "axios"

export function TokenBalance() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn:async ()=>{
        const data = (await axios.get('/api/user')).data
        return data
    } ,
    retry: false,
  })

  if (isLoading) {
    return (
      <div className="flex flex-row gap-2 items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-8" />
      </div>
    )
  }


  if (error || !data.user) {
    return (
      <div className="text-red-500">
        Error loading token balance
      </div>
    )
  }


  return (
    <div className="flex flex-row gap-2 items-center">
      {data.user.tokenBalance} tokens
      <Button asChild>
        <Link href="/pay">
          <Plus className="h-4 w-4 mr-2" />
          Add Tokens
        </Link>
      </Button>
    </div>
  )
}