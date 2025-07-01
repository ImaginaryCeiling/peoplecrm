interface BackgroundEffectsProps {
    showGlow?: boolean
    showDots?: boolean
  }
  
  export function BackgroundEffects({ showGlow = true, showDots = true }: BackgroundEffectsProps) {
    return (
      <>
        {/* Subtle glow effect */}
        {showGlow && (
          <div className="absolute inset-0 opacity-30 bg-glow-effect" />
        )}
  
        {/* Subtle dot pattern */}
        {showDots && (
          <div className="absolute inset-0 opacity-20 bg-dot-pattern-inline" />
        )}
      </>
    )
  }
  