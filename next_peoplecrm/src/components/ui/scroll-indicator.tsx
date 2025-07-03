import { ArrowDown } from "lucide-react"

export function ScrollIndicator() {
  return (
    <div className="pt-16 flex flex-col items-center space-y-2 animate-bounce">
      <div className="w-6 h-10 border border-white/20 rounded-full flex justify-center relative">
        <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-pulse"></div>
      </div>
      <ArrowDown className="w-4 h-4 text-white/30" />
    </div>
  )
}
