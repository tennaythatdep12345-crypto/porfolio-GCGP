"use client"

import { useEffect, useRef, useState } from "react"
import { Stethoscope, Pill, FlaskConical, Languages } from "lucide-react"

const skillCategories = [
  {
    title: "Compétences Scientifiques",
    icon: Stethoscope,
    color: "primary",
    skills: [
      { name: "Chimie générale", level: 80 },
      { name: "Mathématiques appliquées", level: 90 },
      { name: "Thermodynamique", level: 90 },
      { name: "Mécanique des fluides", level: 85 },
    ],
  },
  {
    title: "Compétences Techniques",
    icon: Pill,
    color: "accent",
    skills: [
      { name: "Bilans matière et énergie", level: 88 },
      { name: "Conception de procédés", level: 82 },
      { name: "Caractérisation des fluides", level: 90 },
      { name: "Électricité et Travail Pratique", level: 80 },
    ],
  },
  {
    title: "Laboratoire",
    icon: FlaskConical,
    color: "primary",
    skills: [
      { name: "Techniques de dosage (titrages acide-base)", level: 85 },
      { name: "Préparation de solutions (pesées, dilutions)", level: 80 },
      { name: "Manipulation du matériel de chimie (verrerie, agitation, chauffage)", level: 78 },
      { name: "Mesures physico-chimiques simples (pH, conductivité)", level: 82 },
    ],
  },
  {
    title: "Langues",
    icon: Languages,
    color: "accent",
    skills: [
      { name: "Français (B2)", level: 80 },
      { name: "Anglais (B2)", level: 85 },
      { name: "Vietnamien (natif)", level: 100 },
    ],
  },
]

function ProgressBar({ level, isVisible, delay }: { level: number; isVisible: boolean; delay: number }) {
  return (
    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
      <div
        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
        style={{
          width: isVisible ? `${level}%` : "0%",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  )
}

export default function SkillsSection() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2 },
    )

    const cards = sectionRef.current?.querySelectorAll("[data-index]")
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">Compétences</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>

        <div ref={sectionRef} className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon
            const isVisible = visibleCards.has(categoryIndex)

            return (
              <div
                key={categoryIndex}
                data-index={categoryIndex}
                className={`group glass rounded-2xl p-6 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${categoryIndex * 100}ms` }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-3 rounded-xl ${
                      category.color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground">{category.title}</h3>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm text-muted-foreground font-mono">{skill.level}%</span>
                      </div>
                      <ProgressBar
                        level={skill.level}
                        isVisible={isVisible}
                        delay={categoryIndex * 100 + skillIndex * 100}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional skills as pills */}
        <div className="mt-12 text-center">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Autres compétences
          </h4>
          <div className="flex flex-wrap justify-center gap-2">
            {["Microsoft Office", "Python", "SPSS", "Rédaction scientifique", "Gestion de projet", "Communication", "Code Vibing"].map(
              (skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
                >
                  {skill}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
