"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const [activeButton, setActiveButton] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleButtonClick = (path: string) => {
    setActiveButton(path)
    setIsMobileMenuOpen(false)
    setTimeout(() => setActiveButton(null), 200)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/materials", label: "Материалы" },
    { href: "/vpn", label: "VPN" },
    { href: "/freedom-calculator", label: "Калькулятор свободы" },
    { href: "/internet-status", label: "Статус интернета" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            eh
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => handleButtonClick(link.href)}
                className={`text-sm font-medium transition-all duration-200 hover:text-white transform ${
                  pathname === link.href ? "text-white" : "text-gray-400"
                } ${activeButton === link.href ? "scale-95" : "scale-100"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMobileMenu} className="text-white hover:bg-white/10">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 animate-fade-in-up">
            <div className="flex flex-col space-y-4 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleButtonClick(link.href)}
                  className={`text-sm font-medium transition-all duration-200 hover:text-white transform hover:translate-x-2 ${
                    pathname === link.href ? "text-white" : "text-gray-400"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
