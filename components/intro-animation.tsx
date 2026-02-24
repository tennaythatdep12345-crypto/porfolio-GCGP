"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  shape: "circle" | "drop" | "hex"
}

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  wobble: number
}

interface IntroAnimationProps {
  onComplete: () => void
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"idle" | "bubbling" | "heating" | "boiling" | "exploding" | "revealing" | "fade">(
    "idle",
  )
  const [particles, setParticles] = useState<Particle[]>([])
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [liquidLevel, setLiquidLevel] = useState(68)
  const [glowIntensity, setGlowIntensity] = useState(0)
  const [shakeIntensity, setShakeIntensity] = useState(0)
  const animationRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null)

  const particleColors = [
    "#1E6F9F", // medical blue
    "#4E8D7C", // health green
    "#7DB9E8", // light blue
    "#6FBFA3", // light green
    "#E6EDF3", // soft white
  ]

  // Auto-start animation
  useEffect(() => {
    const startTimer = setTimeout(() => setPhase("bubbling"), 600)
    return () => clearTimeout(startTimer)
  }, [])

  useEffect(() => {
    if (phase !== "bubbling" && phase !== "heating" && phase !== "boiling") return

    const interval = setInterval(() => {
      setBubbles((prev) => {
        const newBubbles = [...prev]

        // More bubbles in later phases
        let bubblesPerTick = 1
        if (phase === "heating") bubblesPerTick = 2
        if (phase === "boiling") bubblesPerTick = 4

        const maxBubbles = phase === "boiling" ? 50 : phase === "heating" ? 35 : 20

        for (let i = 0; i < bubblesPerTick; i++) {
          if (newBubbles.length < maxBubbles) {
            // Bubbles spawn at bottom of liquid
            newBubbles.push({
              id: Date.now() + Math.random() * 1000 + i,
              x: 32 + Math.random() * 36, // within flask width
              y: 88 + Math.random() * 4,
              size: phase === "boiling" ? 3 + Math.random() * 8 : 2 + Math.random() * 5,
              speed: phase === "boiling" ? 1.5 + Math.random() * 2 : 0.6 + Math.random() * 1.2,
              opacity: 0.5 + Math.random() * 0.5,
              wobble: Math.random() * Math.PI * 2,
            })
          }
        }

        // Natural bubble physics
        return newBubbles
          .map((b) => ({
            ...b,
            y: b.y - b.speed,
            x: b.x + Math.sin(b.wobble + b.y * 0.15) * 0.4, // wobble side to side
            wobble: b.wobble + 0.1,
            opacity: b.opacity - 0.006,
            size: b.size * 0.997, // shrink slowly
          }))
          .filter((b) => b.y > liquidLevel - 5 && b.opacity > 0.1)
      })
    }, 50)

    return () => clearInterval(interval)
  }, [phase, liquidLevel])

  // Phase transitions
  useEffect(() => {
    if (phase === "bubbling") {
      const timer = setTimeout(() => setPhase("heating"), 2000)
      return () => clearTimeout(timer)
    }
    if (phase === "heating") {
      const glowInterval = setInterval(() => {
        setGlowIntensity((prev) => Math.min(prev + 0.04, 0.6))
        setLiquidLevel((prev) => Math.max(prev - 0.2, 60))
      }, 50)
      const timer = setTimeout(() => {
        clearInterval(glowInterval)
        setPhase("boiling")
      }, 2000)
      return () => {
        clearInterval(glowInterval)
        clearTimeout(timer)
      }
    }
    if (phase === "boiling") {
      const boilInterval = setInterval(() => {
        setGlowIntensity((prev) => Math.min(prev + 0.06, 1))
        setShakeIntensity((prev) => Math.min(prev + 0.1, 1))
        setLiquidLevel((prev) => Math.max(prev - 0.4, 52))
      }, 40)
      const timer = setTimeout(() => {
        clearInterval(boilInterval)
        setPhase("exploding")
        generateParticles()
      }, 1500)
      return () => {
        clearInterval(boilInterval)
        clearTimeout(timer)
      }
    }
    if (phase === "exploding") {
      const timer = setTimeout(() => setPhase("revealing"), 600)
      return () => clearTimeout(timer)
    }
    if (phase === "revealing") {
      const timer = setTimeout(() => setPhase("fade"), 2200)
      return () => clearTimeout(timer)
    }
    if (phase === "fade") {
      const timer = setTimeout(() => onComplete(), 900)
      return () => clearTimeout(timer)
    }
  }, [phase, onComplete])

  const generateParticles = useCallback(() => {
    const newParticles: Particle[] = []
    const shapes: ("circle" | "drop" | "hex")[] = ["circle", "drop", "hex"]

    // Main explosion - radial burst
    for (let i = 0; i < 100; i++) {
      const angle = (Math.PI * 2 * i) / 100 + (Math.random() - 0.5) * 0.3
      const speed = 6 + Math.random() * 14
      newParticles.push({
        id: i,
        x: 50,
        y: 42,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 5, // bias upward
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        size: 8 + Math.random() * 20,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      })
    }

    // Secondary spray - smaller, faster
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 10 + Math.random() * 18
      newParticles.push({
        id: 200 + i,
        x: 50,
        y: 42,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 8,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        size: 3 + Math.random() * 10,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 25,
        shape: "circle",
      })
    }

    // Droplet trail - falling after explosion
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: 300 + i,
        x: 40 + Math.random() * 20,
        y: 35 + Math.random() * 15,
        vx: (Math.random() - 0.5) * 4,
        vy: -2 + Math.random() * 2,
        color: i % 2 === 0 ? "#1E6F9F" : "#4E8D7C",
        size: 4 + Math.random() * 8,
        rotation: 0,
        rotationSpeed: 0,
        shape: "drop",
      })
    }

    setParticles(newParticles)
  }, [])

  // Particle physics animation
  useEffect(() => {
    if (phase !== "exploding" && phase !== "revealing" && phase !== "fade") return

    const animate = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * 0.32,
            y: p.y + p.vy * 0.32,
            vy: p.vy + 0.22, // gravity
            vx: p.vx * 0.98, // air resistance
            size: Math.max(0, p.size - 0.15),
            rotation: p.rotation + p.rotationSpeed,
          }))
          .filter((p) => p.size > 0 && p.y < 160 && p.x > -20 && p.x < 120),
      )
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [phase])

  const shakeTransform =
    phase === "boiling" || phase === "heating"
      ? `translate(${(Math.random() - 0.5) * shakeIntensity * 6}px, ${(Math.random() - 0.5) * shakeIntensity * 4}px) rotate(${(Math.random() - 0.5) * shakeIntensity * 2}deg)`
      : "none"

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-800 ${
        phase === "fade" ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#0A141C" }}
    >
      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 px-4 py-2 text-sm transition-all duration-300 rounded-lg hover:scale-105"
        style={{
          color: "#9CB4C5",
          border: "1px solid #234156",
          background: "rgba(19, 43, 58, 0.5)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#E6EDF3"
          e.currentTarget.style.borderColor = "#7DB9E8"
          e.currentTarget.style.background = "rgba(30, 111, 159, 0.2)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#9CB4C5"
          e.currentTarget.style.borderColor = "#234156"
          e.currentTarget.style.background = "rgba(19, 43, 58, 0.5)"
        }}
      >
        Passer →
      </button>

      <div className="relative w-[420px] h-[500px]">
        {/* Ambient glow behind flask */}
        <div
          className="absolute inset-0 rounded-full blur-[80px] transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at center, 
              rgba(30, 111, 159, ${glowIntensity * 0.6}) 0%, 
              rgba(78, 141, 124, ${glowIntensity * 0.4}) 40%, 
              rgba(14, 26, 36, 0) 70%)`,
            transform: "scale(1.8) translateY(-10%)",
          }}
        />

        {/* Flask SVG */}
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full relative z-10 transition-all duration-700 ${
            phase === "exploding" || phase === "revealing" || phase === "fade" ? "opacity-0 scale-[3]" : ""
          }`}
          style={{
            transform: phase === "exploding" ? "scale(3)" : shakeTransform,
            filter: phase === "boiling" ? `drop-shadow(0 0 ${20 * glowIntensity}px rgba(125, 185, 232, 0.5))` : "none",
          }}
        >
          <defs>
            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7DB9E8" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#1E6F9F" />
              <stop offset="80%" stopColor="#165A80" />
              <stop offset="100%" stopColor="#0D3D54" />
            </linearGradient>

            <linearGradient id="liquidSurface" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A8D5F2" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#7DB9E8" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="70%" stopColor="rgba(255,255,255,0.02)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.08)" />
            </linearGradient>

            <radialGradient id="heatGlow" cx="50%" cy="100%" r="60%">
              <stop offset="0%" stopColor={`rgba(111, 191, 163, ${glowIntensity})`} />
              <stop offset="50%" stopColor={`rgba(78, 141, 124, ${glowIntensity * 0.5})`} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Bubble shimmer effect */}
            <radialGradient id="bubbleShine" cx="30%" cy="30%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>

          {/* Heat glow at bottom */}
          {(phase === "heating" || phase === "boiling") && (
            <ellipse cx="50" cy="94" rx="30" ry="8" fill="url(#heatGlow)" className="blur-sm" />
          )}

          {/* Flask body - Erlenmeyer shape */}
          <path
            d="M38 22 L38 42 L22 78 Q18 88 28 92 L72 92 Q82 88 78 78 L62 42 L62 22"
            fill="url(#glassGradient)"
            stroke="#7DB9E8"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />

          {/* Flask neck */}
          <rect
            x="38"
            y="16"
            width="24"
            height="8"
            rx="1"
            fill="url(#glassGradient)"
            stroke="#7DB9E8"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />

          {/* Cork stopper with texture */}
          <rect x="39" y="11" width="22" height="6" rx="1.5" fill="#4E8D7C" />
          <rect x="39" y="13" width="22" height="1" fill="#3D7263" opacity="0.5" />

          {/* Liquid with animated surface */}
          <path
            d={`M26 80 Q22 88 30 90 L70 90 Q78 88 74 80 L62 ${liquidLevel} L38 ${liquidLevel} Z`}
            fill="url(#liquidGradient)"
          >
            <animate
              attributeName="d"
              values={`M26 80 Q22 88 30 90 L70 90 Q78 88 74 80 L62 ${liquidLevel} Q50 ${liquidLevel - 2} 38 ${liquidLevel} Z;
                      M26 79 Q22 88 30 90 L70 90 Q78 88 74 79 L64 ${liquidLevel - 1} Q50 ${liquidLevel + 1} 36 ${liquidLevel - 2} Z;
                      M26 81 Q22 88 30 90 L70 90 Q78 88 74 81 L60 ${liquidLevel + 1} Q50 ${liquidLevel - 1} 40 ${liquidLevel} Z;
                      M26 80 Q22 88 30 90 L70 90 Q78 88 74 80 L62 ${liquidLevel} Q50 ${liquidLevel - 2} 38 ${liquidLevel} Z`}
              dur={phase === "boiling" ? "0.4s" : "1.5s"}
              repeatCount="indefinite"
            />
          </path>

          {/* Liquid surface highlight */}
          <ellipse cx="50" cy={liquidLevel} rx="12" ry="2" fill="url(#liquidSurface)" />

          {/* Bubbles inside flask */}
          {bubbles.map((bubble) => (
            <g key={bubble.id}>
              <circle
                cx={bubble.x}
                cy={bubble.y}
                r={bubble.size / 2}
                fill="url(#bubbleShine)"
                opacity={bubble.opacity * 0.4}
              />
              <circle
                cx={bubble.x}
                cy={bubble.y}
                r={bubble.size / 2}
                fill="none"
                stroke="#E6EDF3"
                strokeWidth="0.5"
                opacity={bubble.opacity * 0.6}
              />
            </g>
          ))}

          {/* Glass highlight reflections */}
          <path
            d="M30 48 Q28 58 32 72"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M34 50 Q33 56 35 65"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Measurement lines on flask */}
          <line x1="68" y1="60" x2="72" y2="60" stroke="#7DB9E8" strokeWidth="0.5" opacity="0.4" />
          <line x1="66" y1="70" x2="72" y2="70" stroke="#7DB9E8" strokeWidth="0.5" opacity="0.4" />
          <line x1="64" y1="80" x2="72" y2="80" stroke="#7DB9E8" strokeWidth="0.5" opacity="0.4" />
        </svg>

        {/* Explosion particles */}
        {particles.map((particle) => {
          let borderRadius = "50%"
          let clipPath = "none"

          if (particle.shape === "drop") {
            clipPath = "ellipse(50% 70% at 50% 60%)"
          } else if (particle.shape === "hex") {
            clipPath = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
            borderRadius = "0"
          }

          return (
            <div
              key={particle.id}
              className="absolute pointer-events-none"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
                borderRadius,
                clipPath,
                boxShadow: `0 0 ${particle.size * 0.8}px ${particle.color}60`,
              }}
            />
          )
        })}

        {/* Text reveal */}
        {(phase === "revealing" || phase === "fade") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="overflow-hidden">
              <h1
                className="font-serif text-7xl font-bold"
                style={{
                  color: "#E6EDF3",
                  textShadow: "0 0 80px rgba(30, 111, 159, 0.7), 0 4px 20px rgba(0,0,0,0.3)",
                  animation: "slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                }}
              >
                Portfolio
              </h1>
            </div>
            <div className="overflow-hidden mt-5">
              <p
                className="font-mono text-sm tracking-[0.4em] uppercase"
                style={{
                  color: "#6FBFA3",
                  animation: "slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards",
                  opacity: 0,
                }}
              >
                Chimie • France
              </p>
            </div>
            {/* Decorative line */}
            <div
              className="mt-8 h-[2px] rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, #6FBFA3, transparent)",
                animation: "expandWidth 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards",
                width: 0,
              }}
            />
            {/* Subtitle */}
            <div className="overflow-hidden mt-4">
              <p
                className="text-sm"
                style={{
                  color: "#9CB4C5",
                  animation: "slideUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards",
                  opacity: 0,
                }}
              >
                Étudiant en Génie Chimie et Génie Procédes
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 180px;
          }
        }
      `}</style>
    </div>
  )
}
