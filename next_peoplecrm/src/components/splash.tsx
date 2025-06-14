"use client"

import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton } from "@clerk/nextjs"
import Link from "next/link"
import { ArrowDown } from "lucide-react"


interface SplashProps {
  title?: string
  subtitle?: string
  primaryCta?: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  showScrollIndicator?: boolean
}

export default function Splash({
  title = "Welcome to PeopleCRM",
  subtitle = "A modern, secure, and elegant way to manage your people. Powered by Supabase and Clerk.",
  primaryCta = { text: "Get Started", href: "/home" },
  secondaryCta = { text: "Learn More", href: "https://arnavchauhan.com/blog/peoplecrm" },
  showScrollIndicator = true,
}: SplashProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Auth Navigation */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <SignInButton>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Sign in
          </Button>
        </SignInButton>
        <Link href="/" className="text-white text-xl font-bold">
          PeopleCRM
        </Link>

        <SignUpButton>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Sign up
          </Button>
        </SignUpButton>
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern"></div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-glow-gradient"></div>

      <div className="text-center space-y-8 max-w-4xl mx-auto relative z-10">
        {/* Main Headline */}
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-tight">
            {title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-brand-gradient block sm:inline">{title.split(" ").slice(-1)[0]}</span>
          </h1>
        </div>

        {/* Subheading */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            {subtitle}
          </p>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="animate-scale-in pt-8" style={{ animationDelay: "0.4s" }}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            
              <Button
                asChild
                size="lg"
                className="btn-brand px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full min-w-[140px]"
              >
                <Link href={primaryCta.href}>{primaryCta.text}</Link>
              </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="btn-brand-outline px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full min-w-[140px] text-black"
            >
              <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        {showScrollIndicator && (
          <div className="pt-16 animate-bounce" style={{ animationDelay: "0.8s" }}>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center relative">
                <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-pulse"></div>
              </div>
              <ArrowDown className="w-4 h-4 text-white/30" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
