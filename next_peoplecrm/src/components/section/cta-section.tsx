import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"

interface CtaSectionProps {
  title?: string
  subtitle?: string
  primaryCta?: string
  secondaryCta?: string
}

export function CtaSection({
  title = "Ready to get started?",
  subtitle = "Join thousands of teams already using Kokoro to build better relationships.",
  primaryCta = "Start Free Trial",
  secondaryCta = "Sign In",
}: CtaSectionProps) {
  return (
    <Section>
      <Container size="md">
        <div className="text-center space-y-8">
          <h2 className="text-4xl sm:text-5xl font-bold">{title}</h2>
          <p className="text-xl text-gray-400">{subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
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
        </div>
      </Container>
    </Section>
  )
}
