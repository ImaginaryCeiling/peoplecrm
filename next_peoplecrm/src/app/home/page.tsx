"use client"

import Header from "@/components/header";
import Dashboard from "@/components/dashboard/Dashboard";
import { useUser } from "@clerk/nextjs";
import SignedOutPage from "@/components/signedoutpage";

export default function Home() {
    const { isSignedIn, user } = useUser();

    return (
        <main>
            <Header />
            {isSignedIn && user ? (
                <Dashboard user={user} />
            ):(
                <SignedOutPage />
            )}
        </main>
    )
}

