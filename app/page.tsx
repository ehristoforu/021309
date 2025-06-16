"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Copy, Zap, Shield, Server, Trash2, Github, Send, Download, Key, Wifi, Scale, FileText } from "lucide-react"
import { toast } from "@/hooks/use-toast"

import serversConfig from "../config/servers.json"
import blockedResourcesConfig from "../config/blocked-resources.json"
import legalDocumentsConfig from "../config/legal-documents.json"

// Конфигурация серверов
const servers = serversConfig.servers

// Конфигурация заблокированных ресурсов
const blockedResources = blockedResourcesConfig.blockedResources

// Правовые документы
const legalDocuments = legalDocumentsConfig.legalDocuments

export default function BaikalVPN() {
  const [selectedServer, setSelectedServer] = useState<{ country: string; key: string } | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(false)
  const [loadingDots, setLoadingDots] = useState(".")

  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
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

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingDots((prev) => {
          if (prev === "...") return "."
          if (prev === ".") return ".."
          return "..."
        })
      }, 500)
    }
    return () => clearInterval(interval)
  }, [isLoading])

  const scrollToStations = () => {
    const element = document.getElementById("stations")
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "✅ Ключ скопирован!",
        description: "Ключ сервера успешно скопирован в буфер обмена",
        duration: 3000,
      })
    } catch (err) {
      // Fallback для старых браузеров
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand("copy")
        toast({
          title: "✅ Ключ скопирован!",
          description: "Ключ сервера успешно скопирован в буфер обмена",
          duration: 3000,
        })
      } catch (fallbackErr) {
        toast({
          title: "❌ Ошибка копирования",
          description: "Не удалось скопировать ключ. Попробуйте выделить и скопировать вручную.",
          variant: "destructive",
          duration: 5000,
        })
      }
      document.body.removeChild(textArea)
    }
  }

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionsRef.current[id] = el
  }

  const handleServerClick = (server: { country: string; key: string }) => {
    setSelectedServer(server)
    setIsLoading(true)
    setLoadingDots(".")

    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900">
      {/* Fixed Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-blue-900/95 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden backdrop-blur-sm hover:scale-110 hover:bg-white/20 transition-all duration-500 ease-out cursor-pointer group">
                <img
                  src="/images/logo.png"
                  alt="Baikal VPN Logo"
                  className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              </div>
              <span className="text-white font-bold text-lg">Baikal VPN</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 md:w-64 h-32 md:h-64 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 md:w-96 h-48 md:h-96 bg-cyan-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 md:w-80 h-40 md:h-80 bg-blue-300 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="text-center z-10">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4 md:mb-6 animate-fade-in">
            Baikal VPN
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            Скройся в глубинах Байкала — защити свою свободу
          </p>

          <Button
            onClick={scrollToStations}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 animate-bounce"
          >
            🌊 Погрузиться
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stations Section */}
      <section
        id="stations"
        ref={setSectionRef("stations")}
        className={`py-12 md:py-20 px-4 transition-all duration-1000 ${
          visibleSections.has("stations") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4">🚉 Станции</h2>
          <p className="text-blue-100 text-center mb-8 md:mb-12 text-base md:text-lg px-4">
            Выберите сервер для подключения
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {servers.map((server, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-white font-semibold text-base md:text-lg text-center sm:text-left">
                      {server.country}
                    </span>
                    <Button
                      onClick={() => handleServerClick(server)}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 w-full sm:w-auto"
                      size="sm"
                    >
                      Подключиться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions Section */}
      <section
        id="instructions"
        ref={setSectionRef("instructions")}
        className={`py-12 md:py-20 px-4 bg-black/20 transition-all duration-1000 delay-200 ${
          visibleSections.has("instructions") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 md:mb-16">
            📱 Инструкция
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">1. Скачать клиент</h3>
              <p className="text-blue-100 text-sm md:text-base mb-4">Outline VPN Client или Potatso VPN Client</p>
              <div className="space-y-2">
                <a
                  href="https://getoutline.org/get-started/#step-3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-cyan-300 hover:text-cyan-200 text-sm underline"
                >
                  Outline VPN
                </a>
                <a
                  href="https://www.potatso.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-cyan-300 hover:text-cyan-200 text-sm underline"
                >
                  Potatso VPN
                </a>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">2. Ввести ключ</h3>
              <p className="text-blue-100 text-sm md:text-base">
                Скопируйте ключ из раздела "Станции" и вставьте в приложение
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">3. Подключиться</h3>
              <p className="text-blue-100 text-sm md:text-base">
                Нажмите кнопку подключения и пользуйтесь свободным интернетом
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Если ошибка</h3>
              <p className="text-blue-100 text-sm md:text-base">Попробуйте другой ключ из списка серверов</p>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section
        id="advantages"
        ref={setSectionRef("advantages")}
        className={`py-12 md:py-20 px-4 transition-all duration-1000 delay-300 ${
          visibleSections.has("advantages") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 md:mb-16">
            ⚡ Преимущества
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Быстрота</h3>
              <p className="text-blue-100 text-sm md:text-base">Высокая скорость соединения без задержек</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Shadowsocks</h3>
              <p className="text-blue-100 text-sm md:text-base">Современный протокол обхода блокировок</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Децентрализация</h3>
              <p className="text-blue-100 text-sm md:text-base">Распределённые сервера по всему миру</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">Очистка кэша</h3>
              <p className="text-blue-100 text-sm md:text-base">Постоянная очистка кэша с серверов</p>
            </div>
          </div>
        </div>
      </section>

      {/* Blocked Resources Section */}
      <section
        id="blocked"
        ref={setSectionRef("blocked")}
        className={`py-12 md:py-20 px-4 bg-black/20 transition-all duration-1000 delay-400 ${
          visibleSections.has("blocked") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4">😔 Сочувствуем</h2>
          <p className="text-blue-100 text-center mb-8 md:mb-12 text-base md:text-lg px-4">
            Мы осуждаем незаконную блокировку всех ресурсов и даём гарантии доступа к ним бесплатно навсегда
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
            {blockedResources.map((resource, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <CardContent className="p-3 md:p-4 text-center">
                  <div className="text-2xl md:text-3xl mb-2">{resource.icon}</div>
                  <h3 className="text-white font-semibold mb-2 text-sm md:text-base">{resource.name}</h3>
                  <Badge className={`${resource.color} text-white animate-pulse text-xs`}>{resource.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-lg p-4 md:p-6 border border-green-500/30">
              <p className="text-green-100 text-base md:text-lg font-semibold">
                🛡️ С Baikal VPN все эти ресурсы доступны без ограничений!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Section */}
      <section
        id="legal"
        ref={setSectionRef("legal")}
        className={`py-12 md:py-20 px-4 transition-all duration-1000 delay-500 ${
          visibleSections.has("legal") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4">⚖️ Правовая основа</h2>
          <p className="text-blue-100 text-center mb-8 md:mb-12 text-base md:text-lg px-4">
            Использование VPN и свободных технологий защищено международным правом
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {legalDocuments.map((doc, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <CardContent className="p-4 md:p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl md:text-5xl mb-2">{doc.icon}</div>
                    <h3 className="text-white font-bold text-base md:text-lg mb-1">{doc.title}</h3>
                    <Badge className="bg-blue-500/20 text-blue-100 border-blue-500/30">{doc.article}</Badge>
                  </div>
                  <p className="text-blue-100 text-sm md:text-base leading-relaxed">{doc.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-lg p-4 md:p-6 border border-blue-500/30">
              <div className="flex items-center justify-center mb-3">
                <Scale className="w-6 h-6 text-blue-300 mr-2" />
                <FileText className="w-6 h-6 text-blue-300" />
              </div>
              <p className="text-blue-100 text-base md:text-lg font-semibold">
                Право на свободу информации, слова, мнения, контента и технологий защищено международными конвенциями и
                конституциями большинства стран мира
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 bg-black/30 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-white font-semibold">Разработчик: ehristoforu</p>
              <p className="text-blue-100 text-sm">© 2025 Baikal VPN. Все права защищены.</p>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://t.me/ehristoforu_ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
              >
                <Send className="w-5 h-5" />
                <span>Telegram</span>
              </a>
              <a
                href="https://github.com/ehristoforu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Server Key Dialog */}
      <Dialog
        open={!!selectedServer}
        onOpenChange={() => {
          setSelectedServer(null)
          setIsLoading(false)
        }}
      >
        <DialogContent className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-500/30 text-white max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-center">
              {isLoading ? "Подключение к серверу" : `Ключ сервера: ${selectedServer?.country}`}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8">
                {/* Анимация воды */}
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 bg-gradient-to-t from-blue-400 to-cyan-300 rounded-full animate-bounce delay-100"></div>
                  <div className="absolute inset-4 bg-gradient-to-t from-blue-300 to-cyan-200 rounded-full animate-pulse delay-200"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                    🌊
                  </div>
                </div>
                <p className="text-blue-100 text-lg">Ищем ключ в глубинах Байкала{loadingDots}</p>
              </div>
            ) : (
              <>
                <div className="bg-black/30 p-3 md:p-4 rounded-lg border border-blue-500/30">
                  <code className="text-xs md:text-sm text-blue-100 break-all block">{selectedServer?.key}</code>
                </div>

                <Button
                  onClick={() => selectedServer && copyToClipboard(selectedServer.key)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Скопировать ключ
                </Button>

                <p className="text-xs md:text-sm text-blue-100 text-center">
                  Скопируйте ключ и вставьте его в ваш Shadowsocks клиент
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
