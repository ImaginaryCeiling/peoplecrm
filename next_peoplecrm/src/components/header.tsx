import Link from 'next/link'
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"

export default function Header() {
    const { isSignedIn } = useUser()

    return (
        <div className="flex justify-between items-center p-4 text-2xl font-bold">
            <Link href="/">PeopleCRM</Link>
            <div className="flex gap-2">
                {isSignedIn ? (
                    <SignOutButton>
                        <Button variant="ghost">Sign out</Button>
                    </SignOutButton>
                ) : (
                    <SignInButton>
                        <Button variant="ghost">Sign in</Button>
                    </SignInButton>
                )}
            </div>
        </div>
    )
}