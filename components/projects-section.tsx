"use client"

import { useEffect, useRef, useState } from "react"
import { X, Calendar, Tag } from "lucide-react"
type Projet = {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  image: string;
  lien?: string;
  description?: string;
  tags: string[];
  date: string;
  fullDescription: string;
  size?: string;
};

const projetsAcademiques = [
  {
    id: 1,
    title: "Cas d'études : Prise en main d’un banc d’essais",
    category: "Recherche",
    image: "/banc-essai.png",
    description:
      "Prise en main de bancs d’essais en GC-GP (fluides, pompes, échangeurs) avec mise en place de protocoles et analyse des résultats.",
    tags: ["Procédés", "Instrumentation", "Rapport", "Mécanique des fluides", "Thermodynamique"],
    date: "2025-2026",
    fullDescription:
      "Projet académique du BUT GC-GP visant à schématiser et décrire des bancs d’essais, réaliser des protocoles expérimentaux, collecter des données, analyser les résultats et communiquer en équipe.",
    size: "large",
  },
  {
    id: 2,
    title: "Cas d'études:  Étude d'équipements d'un réseau de transport de fluides",
    subtitle : "Adsorption — alimentation des colonnes en parallèle",
    category: "Recherche",
    image: "/Travail.png",
    description: "Étude d'un réseau de transport de fluides appliqué à un procédé d'adsorption avec alimentation de colonnes en parallèle.",
    tags: ["Adsorption", "Procédés", "Mécanique des fluides", "Transferts de matière", "Dimensionnement"],
    date: "2025-2026",
    fullDescription:
      "Projet académique portant sur l'étude d'équipements de transport de fluides dans le cadre d'un procédé d'adsorption. Travail réalisé sur la sélection d'appareillages, la schématisation et l'analyse des conditions opératoires pour l'alimentation de colonnes en parallèle.",
    size: "medium",
  },
  {
    id: 3,
    title: "Cas d'études: Choix et mise en œuvre d'analyses physico-chimiques simples afin de caractériser un produit",
    category: "Recherche&Laboratoire",
    image: "/Génie Chimie.png",
    description: "Analyse physico-chimique visant à déterminer la teneur en NaHCO₃ dans un produit d’hygiène bucco-dentaire par dosage.",
    tags: ["Dosage", "Analyse physico-chimique", "Rédaction","Hygiène bucco-dentaire","Préparation de solutions"],
    date: "2025-2026",
    fullDescription:
      "Projet analytique réalisé dans le cadre de la SAÉ 1.3 afin de déterminer la teneur en hydrogénocarbonate de sodium dans un produit d’hygiène bucco-dentaire. Le travail a consisté en l’élaboration d’un protocole de dosage, la mise en œuvre des méthodes physico-chimiques, l’exploitation des résultats et la communication des conclusions.",
    size: "small",
  },

]

const projetsPersonel = [
  {
    id: 1,
    title: "Analyse cosmétique assistée par IA",
    subtitle: "Identification, formulation et sécurité dermatologique",
    category: "Projet personnel",
    image: "/laboratory-research-microscope-antibiotics.jpg",
    lien : "cosmetic-analyzer.vercel.app/",
    description:
      "Développement d'un système IA permettant l'identification de produits cosmétiques, l'analyse formulationnelle et l'évaluation de la sécurité dermatologique.",
    tags: ["Cosmétique", "Formulation", "Stabilité", "Toxicologie", "IA","Vision Artificielle"],
    date: "2026",
    fullDescription:
      "Projet personnel liant génie chimique industriel et cosmétique. Développement d'un modèle de vision artificielle afin d'identifier des produits cosmétiques, d'extraire leur composition INCI, de classifier les ingrédients selon leur fonction formulationnelle (tensioactifs, solvants, polymères, conservateurs...) et d'évaluer la stabilité physico-chimique potentielle ainsi que la sécurité dermatologique (allergènes, toxicité, conformité réglementaire). Le projet combine IA (CNN + OCR), chimie des formulations, toxicologie cutanée et réglementation européenne.",
    size: "large",
  },
  {
    id: 2,
    title: "L'intelligence artificielle dans la gestion des risques chimiques",
    category: "Projet personnel",
    image: "/Génie Chimie.png",
    lien: "l-ia-dans-la-gestion-des-risques-ch.vercel.app",
    description: "Analyse de la gestion des risques chimiques à l'aide de l'intelligence artificielle dans les environnements industriels et de laboratoire.",
    tags: ["La bibliographique", "Analyse physico-chimique","Prévention des risques","IA appliquée", "Sécurité au travail"],
    date: "2025-2026",
    fullDescription:
      "La gestion des risques chimiques constitue un enjeu majeur dans les secteurs industriel et scientifique. L'intelligence artificielle offre aujourd'hui de nouvelles solutions pour analyser les données, anticiper les risques et améliorer les dispositifs de sécurité en laboratoire et en industrie.",
    size: "small",
  },
]

const categoryColors: Record<string, string> = {
  Recherche: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Cas clinique": "bg-green-500/10 text-green-600 dark:text-green-400",
  Mémoire: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Projet: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<(typeof projetsAcademiques)[0] | null>(null)
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute("data-id"))
            setVisibleProjects((prev) => new Set([...prev, id]))
          }
        })
      },
      { threshold: 0.2 },
    )

    const items = sectionRef.current?.querySelectorAll("[data-id]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null)
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <section id="projects" className="py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">Projets & Recherche</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
        </div>

        {/* Projets Académiques Section */}
        <div className="mb-16">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-8">Projets Académiques</h3>
          <div ref={sectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projetsAcademiques.map((project, index) => {
              const isVisible = visibleProjects.has(project.id)

              return (
              <div
                key={project.id}
                data-id={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                  project.size === "large"
                    ? "sm:col-span-2 sm:row-span-2"
                    : project.size === "medium"
                      ? "sm:col-span-2 lg:col-span-1"
                      : ""
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div
                  className={`relative overflow-hidden ${project.size === "large" ? "h-48 sm:h-64" : "h-40 sm:h-48"}`}
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />

                  {/* Category badge */}
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[project.category]}`}
                  >
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
            })}
            </div>
          </div>

        {/* Projets Personnels Section */}
        {projetsPersonel.length > 0 && (
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-8">Projets Personnels</h3>

            {/* Guide d'utilisation */}
            <div className="mb-8 overflow-x-auto">
              <table className="w-full border-collapse border border-border rounded-lg">
                <thead>
                  <tr className="bg-secondary">
                    <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Caractéristiques</th>
                    <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-secondary/50 transition-colors">
                    <td className="border border-border px-4 py-2 font-medium text-foreground">Reconnaissance de produits</td>
                    <td className="border border-border px-4 py-2 text-muted-foreground">Téléchargez ou prenez une photo d'un produit cosmétique pour que l'IA le reconnaisse</td>
                  </tr>
                  <tr className="hover:bg-secondary/50 transition-colors">
                    <td className="border border-border px-4 py-2 font-medium text-foreground">Analyse INCI</td>
                    <td className="border border-border px-4 py-2 text-muted-foreground">Extraire et classifier les ingrédients actifs (tensioactifs, solvants, polymères...)</td>
                  </tr>
                  <tr className="hover:bg-secondary/50 transition-colors">
                    <td className="border border-border px-4 py-2 font-medium text-foreground">Évaluation de la sécurité</td>
                    <td className="border border-border px-4 py-2 text-muted-foreground">Vérifier les allergènes, la toxicité et la conformité réglementaire de l'UE</td>
                  </tr>
                  <tr className="hover:bg-secondary/50 transition-colors">
                    <td className="border border-border px-4 py-2 font-medium text-foreground">Stabilité physico-chimique</td>
                    <td className="border border-border px-4 py-2 text-muted-foreground">Évaluer la stabilité potentielle du produit en fonction de sa composition</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note sur les langues */}
            <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-sm text-foreground">
                <span className="font-semibold">ℹ️ Note:</span> Ce site Web est disponible en <span className="font-medium">3 langues</span> : 
                <span className="font-medium text-green-600 dark:text-green-500"> Français</span>, 
                <span className="font-medium text-green-600 dark:text-green-500"> Anglais</span> et 
                <span className="font-medium text-green-600 dark:text-green-500"> Vietnamien</span>. 
                Vous pouvez changer la langue en cliquant sur le sélecteur situé en haut à droite de l'écran.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {projetsPersonel.map((project, index) => {
                const isVisible = visibleProjects.has(project.id)

                return (
                  <div
                    key={project.id}
                    data-id={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${
                      project.size === "large"
                        ? "sm:col-span-2 sm:row-span-2"
                        : project.size === "medium"
                          ? "sm:col-span-2 lg:col-span-1"
                          : ""
                    } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Image */}
                    <div
                      className={`relative overflow-hidden ${project.size === "large" ? "h-48 sm:h-64" : "h-40 sm:h-48"}`}
                    >
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-300" />

                      {/* Category badge */}
                      <div
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[project.category]}`}
                      >
                        {project.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5">
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Link */}
                      {project.lien && (
                        <a href={`https://${project.lien}`} target="_blank" rel="noopener noreferrer" className="inline-block text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 font-medium text-sm transition-colors">
                          Voici le lien → {project.lien}
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-2xl shadow-2xl animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* Image */}
              <div className="relative h-56 sm:h-72">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 -mt-16 relative">
                <div
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[selectedProject.category]}`}
                >
                  {selectedProject.category}
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  {selectedProject.title}
                </h3>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {selectedProject.date}
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">{selectedProject.fullDescription}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm"
                    >
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
