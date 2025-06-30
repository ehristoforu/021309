"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Copy, Download, Key, Wifi, Server, Shield, Zap, Globe, ExternalLink } from "lucide-react"
import { toast } from "@/hooks/use-toast"

import serversConfig from "../../config/servers.json"

const servers = serversConfig.servers

export default function VPNPage() {
  const [selectedServer, setSelectedServer] = useState<{ country: string; key: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingDots, setLoadingDots] = useState(".")
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

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "✓ Ключ скопирован",
        description: "Ключ сервера успешно скопирован в буфер обмена",
        duration: 3000,
      })
    } catch (err) {
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand("copy")
        toast({
          title: "✓ Ключ скопирован",
          description: "Ключ сервера успешно скопирован в буфер обмена",
          duration: 3000,
        })
      } catch (fallbackErr) {
        toast({
          title: "✗ Ошибка копирования",
          description: "Не удалось скопировать ключ. Попробуйте выделить и скопировать вручную.",
          variant: "destructive",
          duration: 5000,
        })
      }
      document.body.removeChild(textArea)
    }
  }

  const handleServerClick = (server: { country: string; key: string }) => {
    setSelectedServer(server)
    setIsLoading(true)
    setLoadingDots(".")

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section
        id="hero"
        data-section
        className={`py-12 px-4 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">VPN Сервис</h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Безопасный и анонимный доступ к интернету без ограничений
          </p>
        </div>
      </section>

      {/* Servers Section */}
      <section
        id="servers"
        data-section
        className={`py-8 px-4 transition-all duration-1000 ${
          visibleSections.has("servers") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Серверы</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servers.map((server, index) => (
              <Card
                key={index}
                className={`bg-black/50 border-white/10 hover:bg-black/70 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-xl ${
                  visibleSections.has("servers") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => handleServerClick(server)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium hover:text-white transition-colors duration-200">
                      {server.country}
                    </span>
                    <Button
                      size="sm"
                      className="bg-white text-black hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
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
        data-section
        className={`py-12 px-4 bg-white/5 transition-all duration-1000 ${
          visibleSections.has("instructions") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Инструкция</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Download className="w-8 h-8" />,
                title: "1. Скачать клиент",
                description: "Outline VPN Client или аналогичное приложение",
                link: "https://getoutline.org/get-started/#step-3",
                linkText: "Outline VPN",
              },
              {
                icon: <Key className="w-8 h-8" />,
                title: "2. Ввести ключ",
                description: "Скопируйте ключ сервера и вставьте в приложение",
              },
              {
                icon: <Wifi className="w-8 h-8" />,
                title: "3. Подключиться",
                description: "Нажмите кнопку подключения в приложении",
              },
              {
                icon: <Server className="w-8 h-8" />,
                title: "При ошибке",
                description: "Попробуйте другой сервер из списка",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  visibleSections.has("instructions") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-white/20 rounded-lg transform hover:scale-110 transition-all duration-300 hover:border-white/40">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400 mb-4">{item.description}</p>
                {item.link && (
                  <div className="space-y-2">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-white hover:text-gray-300 text-sm underline transform hover:scale-105 transition-all duration-200"
                    >
                      {item.linkText}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section
        id="advantages"
        data-section
        className={`py-12 px-4 transition-all duration-1000 ${
          visibleSections.has("advantages") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Преимущества</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Высокая скорость",
                description: "Быстрое соединение без задержек",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Shadowsocks",
                description: "Современный протокол обхода блокировок",
              },
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Глобальная сеть",
                description: "Серверы по всему миру",
              },
              {
                icon: <Server className="w-8 h-8" />,
                title: "Надежность",
                description: "Стабильная работа 24/7",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  visibleSections.has("advantages") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-white/20 rounded-lg transform hover:scale-110 transition-all duration-300 hover:border-white/40">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
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
              <a
                href="/materials"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-105"
              >
                Материалы
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

      {/* Server Key Dialog */}
      <Dialog
        open={!!selectedServer}
        onOpenChange={() => {
          setSelectedServer(null)
          setIsLoading(false)
        }}
      >
        <DialogContent className="bg-black border-white/20 text-white max-w-md mx-4 animate-fade-in-up">
          <DialogHeader>
            <DialogTitle className="text-center">
              {isLoading ? "Подключение к серверу" : `Ключ сервера: ${selectedServer?.country}`}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 border border-white/20 rounded-lg flex items-center justify-center">
                  <Server className="w-8 h-8 animate-pulse" />
                </div>
                <p className="text-gray-400">Получение ключа{loadingDots}</p>
              </div>
            ) : (
              <>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 animate-fade-in-up delay-200">
                  <code className="text-sm text-gray-300 break-all block">{selectedServer?.key}</code>
                </div>

                <Button
                  onClick={() => selectedServer && copyToClipboard(selectedServer.key)}
                  className="w-full bg-white text-black hover:bg-gray-200 transform hover:scale-105 transition-all duration-200 animate-fade-in-up delay-300"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Скопировать ключ
                </Button>

                <p className="text-xs text-gray-400 text-center animate-fade-in-up delay-400">
                  Скопируйте ключ и вставьте его в ваш VPN клиент
                </p>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
