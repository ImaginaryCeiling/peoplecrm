import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center space-y-4 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
        <Icon className="w-8 h-8 text-orange-500" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}
