"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Navigation() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 p-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          People<span className="text-orange-500">CRM</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Sign in
          </Button>

          <Button className="bg-white text-black hover:bg-gray-100">Get Started</Button>
        </div>
      </div>
    </nav>
  )
}
