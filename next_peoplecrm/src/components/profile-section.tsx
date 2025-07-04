"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@clerk/nextjs"

export function ProfileSection() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return null; // Show nothing if not loaded or signed out
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.imageUrl || "/placeholder.svg"} alt="Profile" />
            <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">Welcome {user?.firstName || "User"}!</h3>
            <p className="text-muted-foreground">{user?.emailAddresses?.[0]?.emailAddress || "No email"}</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">User ID:</span>
            <p className="text-muted-foreground">{user?.id || "N/A"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
