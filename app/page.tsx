"use client"

import { useState, useEffect } from "react"
import IntroAnimation from "@/components/intro-animation"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ExperienceSection from "@/components/experience-section"
import ProjectsSection from "@/components/projects-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Check if user has seen intro before
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro")
    if (hasSeenIntro) {
      setShowIntro(false)
    }

    // Check system preference for dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    } else {
      setIsDark(prefersDark)
    }
  }, [])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    localStorage.setItem("theme", isDark ? "dark" : "light")
  }, [isDark])

  const handleIntroComplete = () => {
    setShowIntro(false)
    sessionStorage.setItem("hasSeenIntro", "true")
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  if (showIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation isDark={isDark} toggleTheme={toggleTheme} />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
