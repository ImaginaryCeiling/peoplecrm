"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { SignInButton, SignUpButton } from "@clerk/nextjs"
import Link from "next/link"
import { ArrowDown } from "lucide-react"


interface LandingPageProps {
  title?: string
  subtitle?: string
  showScrollIndicator?: boolean
}



export default function LandingPage({
  title = "Welcome to Kokoro",
  subtitle = "A modern and elegant way to manage the people you care about.",
  showScrollIndicator = true,
}: LandingPageProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add email to waitlist');
      }

      setMessage(data.message);
      setEmail('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Failed to add email to waitlist');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 150%, #000 35%, #733000 45%, #000 55%)
        `
      }}>
      {/* Auth Navigation */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
        <Link href="/" className="text-white text-xl font-bold">
          Kokoro
        </Link>
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

        {/* Waitlist Signup Form */}
        <div className="animate-scale-in pt-8" style={{ animationDelay: "0.4s" }}>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="btn-brand px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full min-w-[140px] bg-white text-black disabled:opacity-50"
            >
              {isLoading ? 'Joining...' : 'Join Waitlist'}
            </Button>
          </form>
          {message && (
            <p className={`text-md mt-4 ${message.includes('error') ? 'text-red-400' : 'text-green-400'}`}>
              {message}
            </p>
          )}
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
