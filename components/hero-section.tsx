"use client"

import { useEffect, useState, useRef } from "react"
import { ChevronDown, FileText, Mail } from "lucide-react"
import FloatingParticles from "./floating-particles"

const subtitles = ["Futur formulateur en pharmacie passionné", "Étudiant à IUT de Bordeaux", "Futur ingénieur en formulation pharmaceutique"]

export default function HeroSection() {
  const [currentSubtitle, setCurrentSubtitle] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const targetText = subtitles[currentSubtitle]

    const type = () => {
      if (!isDeleting) {
        if (displayText.length < targetText.length) {
          setDisplayText(targetText.slice(0, displayText.length + 1))
          typingRef.current = setTimeout(type, 80)
        } else {
          typingRef.current = setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
          typingRef.current = setTimeout(type, 40)
        } else {
          setIsDeleting(false)
          setCurrentSubtitle((prev) => (prev + 1) % subtitles.length)
        }
      }
    }

    typingRef.current = setTimeout(type, 100)
    return () => clearTimeout(typingRef.current?? 0);
  }, [displayText, isDeleting, currentSubtitle])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Chemical background pattern */}
      <div className="absolute inset-0 opacity-8">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cstyle%3E.benzene%7Bstroke:%230084d4;stroke-width:1;fill:none%7D.atom%7Bfill:%230084d4;font-size:8px;font-family:Arial%7D%3C/style%3E%3C/defs%3E%3C!-- Benzene ring with atoms --%3E%3Cpolygon points='60,15 85,28 85,55 60,68 35,55 35,28' class='benzene'/%3E%3Cline x1='60' y1='15' x2='60' y2='28' class='benzene'/%3E%3Cline x1='78' y1='32' x2='88' y2='42' class='benzene'/%3E%3Cline x1='60' y1='68' x2='60' y2='82' class='benzene'/%3E%3C!-- Carbon atoms --%3E%3Ccircle cx='60' cy='15' r='2' class='atom'/%3E%3Ccircle cx='85' cy='28' r='2' class='atom'/%3E%3Ccircle cx='85' cy='55' r='2' class='atom'/%3E%3Ccircle cx='60' cy='68' r='2' class='atom'/%3E%3Ccircle cx='35' cy='55' r='2' class='atom'/%3E%3Ccircle cx='35' cy='28' r='2' class='atom'/%3E%3C!-- H labels --%3E%3Ctext x='57' y='8' class='atom'%3EH%3C/text%3E%3Ctext x='90' y='25' class='atom'%3EH%3C/text%3E%3Ctext x='90' y='60' class='atom'%3EH%3C/text%3E%3Ctext x='57' y='78' class='atom'%3EH%3C/text%3E%3Ctext x='30' y='60' class='atom'%3EH%3C/text%3E%3Ctext x='30' y='25' class='atom'%3EH%3C/text%3E%3C!-- Water molecule H2O --%3E%3Ccircle cx='20' cy='100' r='6' stroke='%230084d4' stroke-width='1.5' fill='none'/%3E%3Cline x1='26' y1='100' x2='35' y2='95' stroke='%230084d4' stroke-width='1'/%3E%3Cline x1='26' y1='100' x2='35' y2='105' stroke='%230084d4' stroke-width='1'/%3E%3Ccircle cx='35' cy='95' r='2' fill='%230084d4'/%3E%3Ccircle cx='35' cy='105' r='2' fill='%230084d4'/%3E%3Ctext x='18' y='108' class='atom'%3EO%3C/text%3E%3C/svg%3E")`,
            backgroundSize: "120px 120px",
          }}
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Avatar with rotating border */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div
            className="absolute inset-0 rounded-full p-1"
            style={{
              background: "conic-gradient(from var(--angle, 0deg), #2C5F7C, #D4AF37, #3A7A9E, #2C5F7C)",
              animation: "border-rotate 8s linear infinite",
            }}
          >
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              <img src="/professional-portrait-pharmacy-student-young-perso.jpg" alt="Photo de profil" className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Subtle glow */}
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl -z-10" />
        </div>

        {/* Name */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in-up">
          LE Ba Khanh Hoang
        </h1>

        {/* Title */}
        <p
          className="text-xl sm:text-2xl text-primary font-medium mb-4 animate-fade-in-up delay-100"
          style={{ animationFillMode: "forwards", opacity: 0 }}
        >
          Étudiant en Génie Chimie et Génie des Procédés
        </p>

        {/* Typing subtitle */}
        <div className="h-8 mb-8">
          <p className="text-lg text-muted-foreground font-mono">
            {displayText}
            <span className="inline-block w-0.5 h-5 bg-accent ml-1 animate-blink" />
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up delay-300"
          style={{ animationFillMode: "forwards", opacity: 0 }}
        >
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25"
          >
            <FileText size={18} />
            Voir mon CV
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-accent text-accent font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:-translate-y-0.5"
          >
            <Mail size={18} />
            Me contacter
          </a>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToAbout}
          className="animate-bounce text-muted-foreground hover:text-primary transition-colors"
          aria-label="Défiler vers le bas"
        >
          <ChevronDown size={32} />
        </button>
      </div>

      {/* CSS for conic gradient animation */}
      <style jsx>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>
    </section>
  )
}
