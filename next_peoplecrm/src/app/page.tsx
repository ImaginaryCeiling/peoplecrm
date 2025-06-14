"use client"

import { useUser } from "@clerk/nextjs"
import Header from "@/components/header"
import Splash from "@/components/splash"
import Dashboard from "@/components/dashboard/Dashboard"

export default function Home() {

  return (
    <main>
        <Splash />
    </main>
  )
}