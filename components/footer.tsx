import { Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="font-serif text-lg font-bold text-foreground">
            <span className="text-primary">P</span>portfolio
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {currentYear} LE Ba Khanh Hoang. Fait avec
            <Heart size={14} className="text-red-500 fill-red-500" />
            en France
          </p>

          {/* Quick links */}
          <div className="flex gap-4 text-sm">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              À propos
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
