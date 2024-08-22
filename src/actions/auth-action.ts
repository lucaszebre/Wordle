// File: src/actions/auth-actions.ts
"use server"

import { signIn, signOut } from "@/auth"

export async function serverSignIn(provider: string) {
  await signIn(provider)
}

export async function serverSignOut() {
  await signOut()
}