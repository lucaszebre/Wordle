import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "./profile-form"
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function SettingsProfilePage() {

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}
