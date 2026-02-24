"use client"

import { useEffect, useRef, useState } from "react"
import { Building2, Calendar, MapPin, Briefcase } from "lucide-react"

const experiences = [
  {
    title: "Production :",
    company: "Laboratoire Universitaire",
    location: "IUT Bordeaux - Périgueux",
    period: "2025-2026",
    description: [
      "• Conduite d’équipements (démarrage/arrêt)",
      "• Suivi de paramètres physico-chimiques",
      "• Détection d’écarts et anomalies simples",
      "• Renseignement de documents et rapports simples",
      "• Application des consignes de sécurité et qualité",
    ],
    type: "Chimie",
    side: "left",
  },
  {
    title: "Dimensionner :",
    company: "Laboratoire Universitaire",
    location: "IUT Bordeaux - Périgueux",
    period: "2025-2026",
    description: [
      "• Choix d’appareils et d’instrumentation",
      "• Dimensionnement simple de réseaux d’utilités",
      "• Identification des besoins en utilités",
      "• Lecture de schémas techniques et cahiers des charges simplifiés",
    ],
    type: "Chimie",
    side: "right",
  },
  {
    title: "Contrôler :",
    company: "Laboratoire Universitaire",
    location: "IUT Bordeaux - Périgueux",
    period: "2025-2026",
    description: [
      "• Préparation d’échantillons et solutions",
      "• Analyses physico-chimiques simples (dosages volumétriques…)",
      "• Interprétation des résultats simples",
      "• Traçabilité et rédaction de comptes rendus",
    ],
    type: "lab",
    side: "left",
  },
  {
    title: "Communiquer & Organiser :",
    company: "Laboratoire Universitaire",
    location: "IUT Bordeaux - Périgueux",
    period: "2025-2026",
    description: [
      "• Travail en équipe au laboratoire",
      "• Présentation de résultats scientifiques",
      "• Communication écrite (rapports, comptes rendus)",
      "• Gestion du temps et organisation de travaux pratiques",
      "• Utilisation d’outils numériques (Excel, Word, Teams…)",
    ],
    type: "transversal",
    side: "right",
  },
]

export default function ExperienceSection() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)

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
      { threshold: 0.3 },
    )

    const items = sectionRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className="py-20 sm:py-28 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">Compétences professionnelles</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div ref={sectionRef} className="relative">
          {/* Center line - desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          {/* Mobile line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => {
              const isVisible = visibleItems.has(index)
              const isLeft = exp.side === "left"

              return (
                <div
                  key={index}
                  data-index={index}
                  className={`relative flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute md:left-1/2 left-6 w-4 h-4 rounded-full border-2 transition-all duration-300 -translate-x-1/2 z-10 ${
                      isVisible
                        ? "bg-primary border-primary shadow-lg shadow-primary/30"
                        : "bg-background border-border"
                    }`}
                  />

                  {/* Card */}
                  <div className={`w-full md:w-[calc(50%-2rem)] ml-12 md:ml-0 ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                    <div
                      className={`glass rounded-2xl p-6 transition-all duration-500 hover:shadow-lg ${
                        isVisible
                          ? "opacity-100 translate-x-0"
                          : `opacity-0 ${isLeft ? "-translate-x-8" : "translate-x-8"}`
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      {/* Type badge */}
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                          exp.type === "hospital"
                            ? "bg-red-500/10 text-red-600 dark:text-red-400"
                            : exp.type === "lab"
                              ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                              : "bg-primary/10 text-primary"
                        }`}
                      >
                        {exp.type === "hospital" ? <Building2 size={12} /> : <Briefcase size={12} />}
                        {exp.type === "hospital" ? "Hôpital" : exp.type === "lab" ? "Laboratoire" : "Officine"}
                      </div>

                      <h3 className="font-serif text-xl font-semibold text-foreground mb-1">{exp.title}</h3>
                      <p className="text-primary font-medium mb-3">{exp.company}</p>

                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                      </div>

                      <div className="text-muted-foreground text-sm leading-relaxed">
                        {Array.isArray(exp.description) ? (
                          <ul className="space-y-1">
                            {exp.description.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{exp.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
