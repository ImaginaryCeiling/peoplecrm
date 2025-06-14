interface BackgroundEffectsProps {
    showGlow?: boolean
    showDots?: boolean
  }
  
  export function BackgroundEffects({ showGlow = true, showDots = true }: BackgroundEffectsProps) {
    return (
      <>
        {/* Subtle glow effect */}
        {showGlow && (
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(
                ellipse 800px 600px at 50% 120%,
                rgba(245, 158, 11, 0.15) 0%,
                rgba(249, 115, 22, 0.08) 25%,
                rgba(154, 52, 18, 0.03) 50%,
                transparent 80%
              )`,
            }}
          />
        )}
  
        {/* Subtle dot pattern */}
        {showDots && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
        )}
      </>
    )
  }
  