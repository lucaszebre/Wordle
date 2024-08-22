"use client"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path;

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/dashboard') ? 'text-primary' : 'text-muted-foreground'}`}
      >
        Overview
      </Link>
      <Link
        href="/cv"
        className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/cv') ? 'text-primary' : 'text-muted-foreground'}`}
      >
        CV
      </Link>
      <Link
        href="/templates"
        className={`text-sm font-medium transition-colors hover:text-primary ${isActive('/templates') ? 'text-primary' : 'text-muted-foreground'}`}
      >
        Templates
      </Link> 
   
    </nav>
  )
}
