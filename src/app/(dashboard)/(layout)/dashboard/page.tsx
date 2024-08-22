"use client"

import { useQuery } from "@tanstack/react-query"
import Letter from "@/components/letter/Letter"
import { getLetters } from "@/actions/getLetters"
import Loading from "./loading"

export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['letters'],
    queryFn: async ()=>{
      const data = await getLetters();

      return data
    }
  })

  if (isLoading) return <Loading/>
  if (error) return <div>Une erreur est survenue : {error.message}</div>

  return (
    <>
      <Letter letters={data} />
    </>
  )
}
