"use client"

import { useEffect, useState } from "react"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  delay: number
  duration: number
  type: "flask" | "capsule" | "molecule"
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 12 + Math.random() * 24,
        opacity: 0.08 + Math.random() * 0.15,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
        type: ["flask", "capsule", "molecule"][Math.floor(Math.random() * 3)] as "flask" | "capsule" | "molecule",
      })
    }
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-primary"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity,
            animation: `float-slow ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        >
          {particle.type === "flask" && (
            <svg
              width={particle.size}
              height={particle.size}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* Flask/Beaker shape */}
              <path d="M6 3h12v8c0 2-1 4-3 5v3h-6v-3c-2-1-3-3-3-5V3Z" />
              <line x1="8" y1="5" x2="16" y2="5" />
              <path d="M9 19h6" />
            </svg>
          )}
          {particle.type === "capsule" && (
            <svg
              width={particle.size}
              height={particle.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              opacity="0.6"
            >
              {/* Capsule/Pill shape */}
              <path d="M4 8c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4v8c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8Z" />
              <path d="M4 8c0-2.21 1.79-4 4-4h8c2.21 0 4 1.79 4 4v8c0 2.21-1.79 4-4 4H8c-2.21 0-4-1.79-4-4V8Z" fill="currentColor" opacity="0.4" />
            </svg>
          )}
          {particle.type === "molecule" && (
            <svg
              width={particle.size}
              height={particle.size}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* Molecule structure - 3 atoms connected */}
              <circle cx="12" cy="8" r="2" fill="currentColor" />
              <circle cx="6" cy="14" r="2" fill="currentColor" />
              <circle cx="18" cy="14" r="2" fill="currentColor" />
              <line x1="12" y1="10" x2="6" y2="12" strokeWidth="1.5" />
              <line x1="12" y1="10" x2="18" y2="12" strokeWidth="1.5" />
            </svg>
          )}
        </div>
      ))}
    </div>
  )
}
