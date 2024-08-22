import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getFirstLetters } from "@/lib/utils"
import Link from "next/link"
import { redirect } from "next/navigation"
import { SignOut } from "./auth/Button"
import { getUser } from "@/actions/getUser"

export async function UserNav(props:{children:React.ReactNode}) {

 const user = await getUser()


	if (!user) {
	 	return redirect("/auth");
	 }


  return (
    <div className="flex flex-row gap-10">
      {props.children}
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.profilePicture ? user.profilePicture : "https://github.com/shadcn.png"} alt="@shadcn" />
            <AvatarFallback>{getFirstLetters(user?.firstName ? user.firstName : "dee",user?.lastName ? user.lastName : "de")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">
              {user?.mail}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href='/account'>
            <DropdownMenuItem  className="cursor-pointer">
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          
          <DropdownMenuItem className="cursor-pointer">
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
        // onClick={async ()=>{
        //   await signOut()
        //   redirect('/auth')
        // }}
        >
          {/* Log out */}
          <SignOut />
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
     
    </div>
    
  )
}

