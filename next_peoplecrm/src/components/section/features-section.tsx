import { Users, Shield, Zap, Heart } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Container } from "@/components/ui/container"
import { FeatureCard } from "@/components/ui/feature-card"

const features = [
  {
    icon: Users,
    title: "People-First",
    description: "Designed around relationships, not just data points. Keep track of what matters most.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Enterprise-grade security with Clerk authentication and Supabase infrastructure.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with modern technologies for speed and reliability you can count on.",
  },
  {
    icon: Heart,
    title: "Made with Care",
    description: "Every detail crafted with attention to user experience and beautiful design.",
  },
]

interface FeaturesSectionProps {
  title?: string
  subtitle?: string
}

export function FeaturesSection({
  title = "Why Choose Kokoro?",
  subtitle = "Built for people who value relationships and want to manage their people with care and precision.",
}: FeaturesSectionProps) {
  return (
    <Section>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Why Choose <span className="text-orange-500">Kokoro</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}
