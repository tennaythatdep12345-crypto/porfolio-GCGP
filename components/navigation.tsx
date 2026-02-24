"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Menu, X } from "lucide-react"

interface NavigationProps {
  isDark: boolean
  toggleTheme: () => void
}

const navItems = [
  { label: "Accueil", href: "#hero" },
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Expérience", href: "#experience" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
]

export default function Navigation({ isDark, toggleTheme }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Find active section
      const sections = navItems.map((item) => item.href.replace("#", ""))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick("#hero")
            }}
            className="font-serif text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            <span className="text-primary">P</span>ortfolio
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === item.href.replace("#", "")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeSection === item.href.replace("#", "")
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
