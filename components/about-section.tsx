"use client"

import { useEffect, useRef, useState } from "react"
import { GraduationCap, Calendar, MapPin } from "lucide-react"

const stats = [
  { value: 3, label: "Années d'études", suffix: "" },
  { value: 3, label: "Stages cliniques", suffix: "" },
  { value: 12, label: "Projets de recherche", suffix: "" },
] 

const timeline = [
  { year: "2020-2023", title: "Baccalauréat Géneral", location: "Lycée spécialisé Le Quy Don, VietNam", type: "education" },
  { year: "2023-2024", title: "Insa Lyon", location: "Insa Lyon, VIlleurbanne", type: "education" },
  { year: "2024-2025", title: "Université de Catholic", location: "Lyon, Villeurbanne", type: "education" },
  { year: "2025-2026", title: "Prèmière année Génie Chimie", location: "IUT de Bordeaux, site de Périgueux", type: "education" },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    let current = 0
    const increment = value / 30
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 50)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div ref={ref} className="text-4xl sm:text-5xl font-bold text-primary font-serif">
      {count}
      {suffix}
    </div>
  )
}

export default function AboutSection() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3, rootMargin: "-50px" },
    )

    const items = timelineRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 sm:py-28 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">À propos de moi</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column - About text & stats */}
          <div>
            {/* Glass card */}
            <div className="glass rounded-2xl p-6 sm:p-8 mb-8">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Passionné par l'ingénierie appliquée aux technologies pharmaceutiques et cosmétiques, je poursuis actuellement
                des études en génie chimie et génie des procédés à l"IUT de Bordeaux. Mon objectif est de contribuer au développment 
                industriel de formes pharmaceutiques et cosmétiques innovantes, en intégrant les enjeux de formulation, de procédés de 
                fabrication et de contrôle de qualité 
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Je m'intéresse particulièrement à la{" "}
                <span className="text-primary font-medium">formulation pharmaceutique et cosmétique</span>, à la{" "}
                <span className="text-primary font-medium">modélisation des procédés</span>, et aux innovations dans le
                domaine de la santé,stratégies d’optimisation et de contrôle qualité dans l’industrie. Mon parcours académique m'a permis de développer des compétences solides en
                analyse, en communication scientifique et en travail d'équipe.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="glass rounded-xl p-4 text-center">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Timeline */}
          <div ref={timelineRef} className="relative">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-8 flex items-center gap-2">
              <GraduationCap className="text-primary" size={24} />
              Parcours académique
            </h3>

            {/* Timeline line */}
            <div className="absolute left-4 top-16 bottom-4 w-0.5 bg-border" />

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  data-index={index}
                  className={`relative pl-12 transition-all duration-500 ${
                    visibleItems.has(index) ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-2.5 top-1 w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                      visibleItems.has(index) ? "bg-primary border-primary" : "bg-background border-border"
                    }`}
                  />

                  <div className="glass rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 text-sm text-accent font-mono mb-1">
                      <Calendar size={14} />
                      {item.year}
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin size={14} />
                      {item.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
