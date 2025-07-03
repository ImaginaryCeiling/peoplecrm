import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export function ProfileSection() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">Welcome Arnav!</h3>
            <p className="text-muted-foreground">arnav216@gmail.com</p>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">User ID:</span>
            <p className="text-muted-foreground">user_2xOXhkpMWMPkwqerrprcHhqck28</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
