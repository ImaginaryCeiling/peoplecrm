import { Button } from "@/components/ui/button"
import { BackgroundEffects } from "@/components/ui/background-effects"
import { ScrollIndicator } from "@/components/ui/scroll-indicator"
import { Container } from "@/components/ui/container"

interface HeroSectionProps {
  title?: string
  subtitle?: string
  primaryCta?: string
  secondaryCta?: string
  showScrollIndicator?: boolean
}

export function HeroSection({
  title = "Welcome to Kokoro",
  subtitle = "A modern, secure, and elegant way to manage your people. Powered by Supabase and Clerk.",
  primaryCta = "Get Started Free",
  secondaryCta = "Watch Demo",
  showScrollIndicator = true,
}: HeroSectionProps) {
  const titleParts = title.split(" ")
  const lastWord = titleParts.pop()
  const firstPart = titleParts.join(" ")

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <BackgroundEffects />

      <Container size="xl" className="px-6 relative z-10">
        <div className="text-center space-y-8">
          {/* Main headline */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              {firstPart}{" "}
              <span
                className="block sm:inline"
                style={{
                  background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {lastWord}
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg rounded-full min-w-[160px] font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {primaryCta}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-6 text-lg rounded-full min-w-[160px] font-semibold bg-transparent backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
            >
              {secondaryCta}
            </Button>
          </div>

          {/* Scroll indicator */}
          {showScrollIndicator && <ScrollIndicator />}
        </div>
      </Container>
    </section>
  )
}
