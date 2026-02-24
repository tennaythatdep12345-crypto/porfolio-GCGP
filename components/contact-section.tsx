"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Send, Linkedin, Github, Twitter, CheckCircle } from "lucide-react"

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
]

const contactInfo = [
  { icon: Mail, text: "hoangle120105@gmail.com", href: "mailto:jean.dupont@universite-paris.fr" },
  { icon: Phone, text: "+33 6 12 14 18 81", href: "tel:+33612141881" },
  { icon: MapPin, text: "Périgueux, France", href: "#" },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="py-20 sm:py-28 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">Contact</h2>
          <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-4" />
          <p className="text-muted-foreground max-w-xl mx-auto">
            N'hésitez pas à me contacter pour toute opportunité de stage, collaboration ou question.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-6">Informations de contact</h3>

              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-background/50 transition-colors group"
                    >
                      <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon size={20} />
                      </div>
                      <span className="text-foreground">{item.text}</span>
                    </a>
                  )
                })}
              </div>

              {/* Social links */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Retrouvez-moi sur</p>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="p-3 rounded-xl bg-background text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 hover:-translate-y-1"
                      >
                        <Icon size={20} />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-6 sm:p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                    <CheckCircle className="text-green-500" size={32} />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Message envoyé !</h3>
                  <p className="text-muted-foreground">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name field */}
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="peer w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-transparent"
                        placeholder="Nom"
                      />
                      <label
                        htmlFor="name"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          formData.name || focusedField === "name"
                            ? "-top-2.5 text-xs bg-card px-2 text-primary"
                            : "top-3 text-muted-foreground"
                        }`}
                      >
                        Nom complet
                      </label>
                    </div>

                    {/* Email field */}
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="peer w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-transparent"
                        placeholder="Email"
                      />
                      <label
                        htmlFor="email"
                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                          formData.email || focusedField === "email"
                            ? "-top-2.5 text-xs bg-card px-2 text-primary"
                            : "top-3 text-muted-foreground"
                        }`}
                      >
                        Email
                      </label>
                    </div>
                  </div>

                  {/* Subject field */}
                  <div className="relative">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="peer w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-transparent"
                      placeholder="Sujet"
                    />
                    <label
                      htmlFor="subject"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        formData.subject || focusedField === "subject"
                          ? "-top-2.5 text-xs bg-card px-2 text-primary"
                          : "top-3 text-muted-foreground"
                      }`}
                    >
                      Sujet
                    </label>
                  </div>

                  {/* Message field */}
                  <div className="relative">
                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="peer w-full px-4 py-3 bg-background border border-border rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder-transparent resize-none"
                      placeholder="Message"
                    />
                    <label
                      htmlFor="message"
                      className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                        formData.message || focusedField === "message"
                          ? "-top-2.5 text-xs bg-card px-2 text-primary"
                          : "top-3 text-muted-foreground"
                      }`}
                    >
                      Votre message
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-medium rounded-xl hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                  >
                    <Send size={18} />
                    Envoyer le message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
