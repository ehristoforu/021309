"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft, Calendar, User, Tag, ExternalLink, Play, FileText, MessageSquare } from "lucide-react"

import materialsConfig from "../../config/materials.json"

const materials = materialsConfig.materials

const getTypeIcon = (type: string) => {
  switch (type) {
    case "youtube":
      return <Play className="w-4 h-4" />
    case "vk":
    case "twitter":
      return <MessageSquare className="w-4 h-4" />
    case "external":
      return <ExternalLink className="w-4 h-4" />
    case "article":
    default:
      return <FileText className="w-4 h-4" />
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case "youtube":
      return "YouTube"
    case "vk":
      return "ВКонтакте"
    case "twitter":
      return "X (Twitter)"
    case "external":
      return "Внешний источник"
    case "article":
    default:
      return "Статья"
  }
}

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMaterial, setSelectedMaterial] = useState<(typeof materials)[0] | null>(null)
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

  const filteredMaterials = useMemo(() => {
    if (!searchQuery) return materials

    return materials.filter(
      (material) =>
        material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        material.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getTypeLabel(material.type).toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [searchQuery])

  const handleMaterialClick = (material: (typeof materials)[0]) => {
    if (material.type === "article") {
      setSelectedMaterial(material)
      // Scroll to top when opening article
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (material.url) {
      window.open(material.url, "_blank", "noopener,noreferrer")
    }
  }

  if (selectedMaterial && selectedMaterial.type === "article") {
    return (
      <div className="min-h-screen bg-black text-white">
        <div
          className={`max-w-3xl mx-auto px-4 py-12 transition-all duration-1000 opacity-100 translate-y-0 animate-fade-in-up`}
        >
          <Button
            onClick={() => {
              setSelectedMaterial(null)
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            variant="ghost"
            className="mb-8 text-gray-400 hover:text-white transform hover:scale-105 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к материалам
          </Button>

          <article className="animate-fade-in-up">
            <header className="mb-8 animate-fade-in-up delay-200">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">{selectedMaterial.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {selectedMaterial.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedMaterial.date).toLocaleDateString("ru-RU")}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedMaterial.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            <div className="prose prose-invert max-w-none animate-fade-in-up delay-400">
              <div
                className="text-gray-300 leading-relaxed text-base"
                dangerouslySetInnerHTML={{
                  __html:
                    selectedMaterial.content
                      ?.replace(/^# /gm, '<h1 class="text-2xl font-bold mt-6 mb-4 text-white">')
                      .replace(/^## /gm, '<h2 class="text-xl font-semibold mt-5 mb-3 text-white">')
                      .replace(/^### /gm, '<h3 class="text-lg font-medium mt-4 mb-2 text-white">')
                      .replace(/\n\n/g, '</p><p class="mb-4">')
                      .replace(/^(.+)$/gm, '<p class="mb-4">$1</p>')
                      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                      .replace(/\*(.+?)\*/g, "<em>$1</em>") || "",
                }}
              />
            </div>
          </article>
        </div>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/10 mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="text-2xl font-bold mb-2">eh</div>
                <p className="text-gray-400">Свобода в интернете возможна</p>
                <p className="text-sm text-gray-500 mt-2">© 2025 eh. Все права защищены.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/" className="text-gray-400 hover:text-white transition-colors transform hover:scale-105">
                  Главная
                </a>
                <a href="/vpn" className="text-gray-400 hover:text-white transition-colors transform hover:scale-105">
                  VPN
                </a>
                <a
                  href="/freedom-calculator"
                  className="text-gray-400 hover:text-white transition-colors transform hover:scale-105"
                >
                  Калькулятор свободы
                </a>
                <a
                  href="/internet-status"
                  className="text-gray-400 hover:text-white transition-colors transform hover:scale-105"
                >
                  Статус интернета
                </a>
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

  return (
    <div className="min-h-screen bg-black text-white relative z-10">
      {/* Abstract Background Shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-16 left-16 w-32 h-32 border border-white/10 rounded-full animate-float"></div>
        <div className="absolute top-1/4 right-24 w-24 h-24 border border-white/5 rotate-45 animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/4 w-40 h-40 border border-white/10 rounded-lg rotate-12 animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-white/5 rounded-full animate-float"></div>
        <div className="absolute bottom-24 right-16 w-28 h-28 border border-white/10 rotate-45 animate-float-delayed"></div>
      </div>
      {/* Hero Section */}
      <section
        id="hero"
        data-section
        className={`py-12 px-4 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Материалы</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in-up delay-200">
              Статьи, видео, посты и другие материалы о цифровых правах и свободах
            </p>
          </header>
        </div>
      </section>

      {/* Search Section */}
      <section
        id="search"
        data-section
        className={`py-6 px-4 transition-all duration-1000 ${
          visibleSections.has("search") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="relative max-w-md mx-auto mb-8 animate-fade-in-up delay-300">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Поиск по материалам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-white/20 transition-all duration-200"
            />
          </div>
        </div>
      </section>

      {/* Materials Grid Section */}
      <section
        id="materials"
        data-section
        className={`py-6 px-4 transition-all duration-1000 ${
          visibleSections.has("materials") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMaterials.map((material, index) => (
              <Card
                key={material.id}
                className={`bg-black/50 border-white/10 hover:bg-black/70 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-xl ${
                  visibleSections.has("materials") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => handleMaterialClick(material)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold flex-1 pr-2 hover:text-white transition-colors duration-200">
                      {material.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 flex-shrink-0 transform hover:scale-110 transition-transform duration-200">
                      {getTypeIcon(material.type)}
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4 line-clamp-3">{material.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{material.author}</span>
                    <span>{new Date(material.date).toLocaleDateString("ru-RU")}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline" className="text-xs hover:bg-white/10 transition-colors duration-200">
                      {getTypeLabel(material.type)}
                    </Badge>
                    {material.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="text-xs hover:bg-white/10 transition-colors duration-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {material.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs hover:bg-white/10 transition-colors duration-200">
                        +{material.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  {material.type === "youtube" && material.duration && (
                    <p className="text-xs text-gray-500">Длительность: {material.duration}</p>
                  )}

                  {(material.type === "vk" || material.type === "twitter") && material.platform && (
                    <p className="text-xs text-gray-500">Платформа: {material.platform}</p>
                  )}

                  {material.type === "external" && material.source && (
                    <p className="text-xs text-gray-500">Источник: {material.source}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMaterials.length === 0 && (
            <div
              className={`text-center py-12 transition-all duration-700 ${
                visibleSections.has("materials") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <p className="text-gray-400 text-lg">Материалы не найдены</p>
              <Button
                onClick={() => setSearchQuery("")}
                variant="outline"
                className="mt-4 transform hover:scale-105 transition-all duration-200"
              >
                Сбросить поиск
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold mb-2">eh</div>
              <p className="text-gray-400">Свобода в интернете возможна</p>
              <p className="text-sm text-gray-500 mt-2">© 2025 eh. Все права защищены.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/" className="text-gray-400 hover:text-white transition-colors transform hover:scale-105">
                Главная
              </a>
              <a href="/vpn" className="text-gray-400 hover:text-white transition-colors transform hover:scale-105">
                VPN
              </a>
              <a
                href="/freedom-calculator"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-105"
              >
                Калькулятор свободы
              </a>
              <a
                href="/internet-status"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-105"
              >
                Статус интернета
              </a>
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
