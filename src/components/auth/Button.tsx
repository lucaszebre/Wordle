import { ChromeIcon, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers";
import { revalidatePath } from 'next/cache'

const cookie =cookies()

const supabase = createClient(cookie);



export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form action={async () => {
      "use server"
      await supabase.auth.signOut()
      revalidatePath('/')

    }}
  >
    <Button  variant="outline" size="sm" className="ml-2">
        <LogOut className="h-4 w-4 mr-2" />
        Logout
    </Button> 
  </form>
  )
}