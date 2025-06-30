"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedCounter } from "@/components/animated-counter"
import {
  Scale,
  Shield,
  Globe,
  FileText,
  ExternalLink,
  Gavel,
  Newspaper,
  Building,
  Wifi,
  Calculator,
  Activity,
  BookOpen,
  Lock,
} from "lucide-react"

import blockedResourcesConfig from "../config/blocked-resources.json"
import legalArticlesConfig from "../config/legal-articles.json"
import counterConfig from "../config/counter.json"

const blockedResources = blockedResourcesConfig.blockedResources
const legalArticles = legalArticlesConfig.legalArticles
const blockedCount = counterConfig.blockedResourcesCount

export default function HomePage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" },
    )

    const sections = document.querySelectorAll("[data-section]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Hero Background Icons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Statue of Liberty Icons */}
        <div className="absolute top-20 left-16 w-12 h-12 opacity-20 hero-icon animate-hero-float interactive-shape">
          <Scale className="w-full h-full text-white" />
        </div>
        <div className="absolute top-1/3 right-20 w-16 h-16 opacity-15 hero-icon animate-hero-pulse delay-300 interactive-shape">
          <Scale className="w-full h-full text-white" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 w-10 h-10 opacity-25 hero-icon animate-hero-float delay-500 interactive-shape">
          <Scale className="w-full h-full text-white" />
        </div>

        {/* WiFi Icons */}
        <div className="absolute top-1/4 left-1/3 w-14 h-14 opacity-20 hero-icon animate-hero-pulse interactive-shape">
          <Wifi className="w-full h-full text-white" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 opacity-15 hero-icon animate-hero-float delay-700 interactive-shape">
          <Wifi className="w-full h-full text-white" />
        </div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 opacity-30 hero-icon animate-hero-pulse delay-200 interactive-shape">
          <Wifi className="w-full h-full text-white" />
        </div>

        {/* Globe Icons */}
        <div className="absolute bottom-20 left-20 w-10 h-10 opacity-20 hero-icon animate-hero-float delay-400 interactive-shape">
          <Globe className="w-full h-full text-white" />
        </div>
        <div className="absolute top-1/2 left-10 w-12 h-12 opacity-15 hero-icon animate-hero-pulse delay-600 interactive-shape">
          <Globe className="w-full h-full text-white" />
        </div>

        {/* Enhanced abstract shapes */}
        <div className="absolute top-32 right-32 w-6 h-6 border border-white/10 rounded-full abstract-shape animate-hero-float opacity-30 interactive-shape"></div>
        <div className="absolute bottom-32 left-32 w-4 h-4 border border-white/10 rotate-45 abstract-shape animate-hero-pulse opacity-20 interactive-shape"></div>
        <div className="absolute top-2/3 right-16 w-8 h-8 border border-white/10 rounded-lg rotate-12 abstract-shape animate-hero-float opacity-25 interactive-shape"></div>
        <div className="absolute top-1/5 left-2/3 w-12 h-12 border border-white/10 rounded-full abstract-shape animate-hero-pulse opacity-20 interactive-shape"></div>
        <div className="absolute bottom-1/5 right-2/3 w-6 h-6 border border-white/10 rotate-45 abstract-shape animate-hero-float opacity-30 interactive-shape"></div>
      </div>

      {/* Hero Section */}
      <section
        className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up">
            Свобода в интернете
            <br />
            <span className="text-gray-300">возможна!</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-300">
            Мультисервис интернет активизма для защиты цифровых прав и свобод
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center animate-fade-in-up delay-500 mb-8">
            <Link href="/materials">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-6 py-4 text-base enhanced-button transform hover:scale-105 transition-all duration-200 bg-transparent w-full"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Материалы
              </Button>
            </Link>
            <Link href="/vpn">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200 px-6 py-4 text-base enhanced-button transform hover:scale-105 transition-all duration-200 w-full"
              >
                <Lock className="w-4 h-4 mr-2" />
                VPN
              </Button>
            </Link>
            <Link href="/freedom-calculator">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-6 py-4 text-base enhanced-button transform hover:scale-105 transition-all duration-200 bg-transparent w-full"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Калькулятор
              </Button>
            </Link>
            <Link href="/internet-status">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-6 py-4 text-base enhanced-button transform hover:scale-105 transition-all duration-200 bg-transparent w-full"
              >
                <Activity className="w-4 h-4 mr-2" />
                Статус
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        data-section
        className={`py-20 px-4 border-t border-white/10 transition-all duration-1000 relative z-10 ${
          visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 animate-fade-in-up">О нас</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Scale className="w-12 h-12 text-white" />,
                title: "Правовая защита",
                description:
                  "Защищаем цифровые права граждан на основе международного права и конституционных гарантий",
              },
              {
                icon: <Shield className="w-12 h-12 text-white" />,
                title: "Технологическая свобода",
                description: "Предоставляем инструменты для обхода цензуры и защиты приватности в интернете",
              },
              {
                icon: <Globe className="w-12 h-12 text-white" />,
                title: "Глобальная миссия",
                description: "Работаем над созданием свободного и открытого интернета для всех людей планеты",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  visibleSections.has("about") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section
        id="goals"
        data-section
        className={`py-20 px-4 bg-white/5 backdrop-blur-sm relative z-10 transition-all duration-1000 ${
          visibleSections.has("goals") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Цели</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Gavel className="w-8 h-8 mb-4" />,
                title: "Борьба с незаконной цензурой РКН",
                description:
                  "Боремся с незаконной цензурной политикой Роскомнадзора и цензурой путинского режима. Защищаем право граждан на свободный доступ к информации.",
              },
              {
                icon: <Newspaper className="w-8 h-8 mb-4" />,
                title: "Защита независимых СМИ",
                description:
                  "Выступаем против закрытия независимых СМИ и интернет-ресурсов. Поддерживаем журналистов и медиа, которые освещают правду.",
              },
              {
                icon: <Building className="w-8 h-8 mb-4" />,
                title: "Свободный рынок интернет-ресурсов",
                description:
                  "Выступаем за свободный рынок интернет-ресурсов без государственного вмешательства. Поддерживаем конкуренцию и инновации в цифровой сфере.",
              },
              {
                icon: <Globe className="w-8 h-8 mb-4" />,
                title: "Международное сотрудничество",
                description:
                  "Сотрудничаем с международными организациями по защите прав человека и цифровых свобод в борьбе с авторитаризмом.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className={`bg-black/50 border-white/10 hover:bg-black/70 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm ${
                  visibleSections.has("goals") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8">
                  {item.icon}
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blocked Resources Section */}
      <section
        id="blocked"
        data-section
        className={`py-20 px-4 transition-all duration-1000 relative z-10 ${
          visibleSections.has("blocked") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Counter Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="text-6xl md:text-8xl font-bold text-white">
                <AnimatedCounter end={blockedCount} duration={2500} showApprox={true} />
              </div>
            </div>
            <p className="text-xl text-gray-400 mb-4">заблокированных ресурсов</p>
            <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Заблокированные ресурсы</h2>
          <p className="text-gray-400 text-center mb-12 text-lg max-w-3xl mx-auto">
            Мы осуждаем незаконную блокировку интернет-ресурсов и предоставляем инструменты для восстановления доступа
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
            {blockedResources.map((resource, index) => (
              <Card
                key={index}
                className={`bg-black/30 border-white/10 hover:bg-black/50 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm ${
                  visibleSections.has("blocked") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{resource.icon}</div>
                  <h3 className="text-white font-medium mb-2 text-sm">{resource.name}</h3>
                  <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                    {resource.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className={`text-center transition-all duration-700 ${
              visibleSections.has("blocked") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 max-w-2xl mx-auto backdrop-blur-sm">
              <p className="text-white font-medium text-lg">
                С нашими инструментами все эти ресурсы доступны без ограничений
              </p>
              <Link href="/vpn" className="inline-block mt-4">
                <Button className="bg-white text-black hover:bg-gray-200 enhanced-button transform hover:scale-105 transition-all duration-200">
                  <Lock className="w-4 h-4 mr-2" />
                  Получить доступ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Section */}
      <section
        id="legal"
        data-section
        className={`py-20 px-4 bg-white/5 backdrop-blur-sm relative z-10 transition-all duration-1000 ${
          visibleSections.has("legal") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">Правовая основа</h2>
          <p className="text-gray-400 text-center mb-12 text-lg max-w-3xl mx-auto">
            Наша деятельность основана на международном праве и конституционных гарантиях
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {legalArticles.map((article, index) => (
              <Card
                key={index}
                className={`bg-black/50 border-white/10 hover:bg-black/70 transition-all duration-500 transform hover:scale-105 backdrop-blur-sm ${
                  visibleSections.has("legal") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <FileText className="w-6 h-6 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{article.title}</h3>
                      <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
                        {article.article}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-4">{article.text}</p>
                  <p className="text-sm text-gray-500">{article.source}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div
            className={`text-center mt-12 transition-all duration-700 ${
              visibleSections.has("legal") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="bg-black/50 border border-white/10 rounded-lg p-6 max-w-4xl mx-auto backdrop-blur-sm">
              <div className="flex items-center justify-center mb-4">
                <Scale className="w-8 h-8 mr-3" />
                <FileText className="w-8 h-8" />
              </div>
              <p className="text-white font-medium text-lg">
                Право на свободу информации, слова и доступа к интернету защищено международными конвенциями и
                конституциями большинства стран мира
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold mb-2">eh</div>
              <p className="text-gray-400">Свобода в интернете возможна</p>
              <p className="text-sm text-gray-500 mt-2">© 2025 eh. Все права защищены.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/materials"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-105"
              >
                Материалы
              </Link>
              <Link href="/vpn" className="text-gray-400 hover:text-white transition-colors transform hover:scale-105">
                VPN
              </Link>
              <Link
                href="/freedom-calculator"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-105"
              >
                Калькулятор свободы
              </Link>
              <Link
                href="/internet-status"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-105"
              >
                Статус интернета
              </Link>
              <a
                href="https://t.me/ehristoforu_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 transform hover:scale-105"
              >
                Telegram <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}