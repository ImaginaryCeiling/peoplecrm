import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface CtaSectionProps {
  title?: string
  subtitle?: string
  primaryCta?: string
  secondaryCta?: string
}

export function CtaSection({
  title = "Ready to get started?",
  subtitle = "Join the waitlist to be the first person using Kokoro to build better relationships.",
  primaryCta = "Join Waitlist",
  secondaryCta = "Sign In",
}: CtaSectionProps) {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to add email to waitlist")
      }

      setMessage(data.message)
      setEmail('')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to add email to waitlist")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Section className="relative overflow-hidden bg-black">
      {/* Radial Gradient Background */}
      <div 
        className="absolute inset-0"
      />

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern"></div>

      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-glow-gradient"></div>

      <Container size="md" className="relative z-10">
        <div className="text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">{title}</h2>
          <p className="text-xl text-gray-400">{subtitle}</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              required
              className="flex-1 min-w-[280px] px-6 py-6 text-lg rounded-full bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-white/50"
            />
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg rounded-full min-w-[160px] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? 'Joining...' : primaryCta}
            </Button>
          </form>

          {message && (
            <p className={`text-md ${message.includes('error') ? 'text-red-400' : 'text-green-400'}`}>
              {message}
            </p>
          )}
        </div>
      </Container>
    </Section>
  )
}
