"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  Search,
  Users,
  Building,
  ExternalLink,
  Signal,
  Activity,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Circle,
} from "lucide-react"

import russiaRegionsData from "../../config/russia-regions.json"

const regions = russiaRegionsData.regions
const statusLegend = russiaRegionsData.statusLegend

type SortField = "name" | "population" | "providers" | "status"
type SortDirection = "asc" | "desc"

export default function InternetStatusPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)
  const [sortField, setSortField] = useState<SortField>("population")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-5 h-5 text-white" />
      case "intermittent":
        return <Signal className="w-5 h-5 text-white" />
      case "unstable":
        return <AlertTriangle className="w-5 h-5 text-white" />
      case "poor":
        return <WifiOff className="w-5 h-5 text-white" />
      default:
        return <Wifi className="w-5 h-5 text-white" />
    }
  }

  const getStatusStats = () => {
    const stats = {
      good: regions.filter((r) => r.status === "good").length,
      intermittent: regions.filter((r) => r.status === "intermittent").length,
      unstable: regions.filter((r) => r.status === "unstable").length,
      poor: regions.filter((r) => r.status === "poor").length,
    }
    return stats
  }

  const stats = getStatusStats()

  const parsePopulation = (population: string): number => {
    const num = Number.parseFloat(population.replace(/[^\d.]/g, ""))
    return num * 1000000 // Convert to actual number for sorting
  }

  const parseProviders = (providers: string): number => {
    const match = providers.match(/(\d+)/)
    return match ? Number.parseInt(match[1]) : 0
  }

  const sortedAndFilteredRegions = useMemo(() => {
    const filtered = regions.filter((region) => region.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return filtered.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortField) {
        case "name":
          aValue = a.name
          bValue = b.name
          break
        case "population":
          aValue = parsePopulation(a.population)
          bValue = parsePopulation(b.population)
          break
        case "providers":
          aValue = parseProviders(a.providers)
          bValue = parseProviders(b.providers)
          break
        case "status":
          const statusOrder = { good: 4, unstable: 3, intermittent: 2, poor: 1 }
          aValue = statusOrder[a.status as keyof typeof statusOrder]
          bValue = statusOrder[b.status as keyof typeof statusOrder]
          break
        default:
          return 0
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [searchQuery, sortField, sortDirection])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4" />
    }
    return sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Hero Section */}
      <section
        id="hero"
        data-section
        className={`py-12 px-4 transition-all duration-1000 relative z-10 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-white/20 rounded-full animate-fade-in-up backdrop-blur-sm">
            <Activity className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up delay-200">
            Статус интернета в России
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-300">
            Таблица состояния интернет-соединения по регионам России
          </p>
        </div>
      </section>

      {/* Statistics Overview */}
      <section
        id="stats"
        data-section
        className={`py-8 px-4 transition-all duration-1000 relative z-10 ${
          visibleSections.has("stats") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold text-white">{stats.good}</div>
                <div className="text-sm text-gray-300">Стабильно</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold text-white">{stats.unstable}</div>
                <div className="text-sm text-gray-300">Нестабильно</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <Signal className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold text-white">{stats.intermittent}</div>
                <div className="text-sm text-gray-300">С перебоями</div>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/20 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4 text-center">
                <WifiOff className="w-8 h-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold text-white">{stats.poor}</div>
                <div className="text-sm text-gray-300">Критично</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legend */}
      <section
        id="legend"
        data-section
        className={`py-6 px-4 bg-white/5 backdrop-blur-sm relative z-10 transition-all duration-1000 ${
          visibleSections.has("legend") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Легенда статусов</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(statusLegend).map(([key, status]) => (
              <Card
                key={key}
                className="bg-black/50 border-white/10 backdrop-blur-sm hover:bg-black/70 transition-all duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    {key === "good" && <CheckCircle className="w-4 h-4 text-white" />}
                    {key === "unstable" && <AlertTriangle className="w-4 h-4 text-white" />}
                    {key === "intermittent" && <Signal className="w-4 h-4 text-white" />}
                    {key === "poor" && <WifiOff className="w-4 h-4 text-white" />}
                    <span className="font-medium text-sm">{status.label}</span>
                  </div>
                  <p className="text-xs text-gray-400">{status.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Controls */}
      <section className="py-6 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Поиск региона..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400 backdrop-blur-sm"
              />
            </div>
            <div className="text-sm text-gray-400">
              Показано: {sortedAndFilteredRegions.length} из {regions.length} регионов
            </div>
          </div>
        </div>
      </section>

      {/* Regions Table */}
      <section
        id="table"
        data-section
        className={`py-8 px-4 transition-all duration-1000 relative z-10 ${
          visibleSections.has("table") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <Card className="bg-black/50 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Activity className="w-6 h-6" />
                Регионы России
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("name")}
                          className="flex items-center gap-2 text-white hover:bg-white/10"
                        >
                          Субъект РФ
                          {getSortIcon("name")}
                        </Button>
                      </th>
                      <th className="text-left p-4">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("population")}
                          className="flex items-center gap-2 text-white hover:bg-white/10"
                        >
                          <Users className="w-4 h-4" />
                          Население
                          {getSortIcon("population")}
                        </Button>
                      </th>
                      <th className="text-left p-4">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("providers")}
                          className="flex items-center gap-2 text-white hover:bg-white/10"
                        >
                          <Building className="w-4 h-4" />
                          Провайдеры
                          {getSortIcon("providers")}
                        </Button>
                      </th>
                      <th className="text-left p-4">
                        <Button
                          variant="ghost"
                          onClick={() => handleSort("status")}
                          className="flex items-center gap-2 text-white hover:bg-white/10"
                        >
                          <Wifi className="w-4 h-4" />
                          Статус
                          {getSortIcon("status")}
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedAndFilteredRegions.map((region, index) => (
                      <tr
                        key={region.id}
                        className={`border-b border-white/5 hover:bg-white/5 transition-colors animate-fade-in-up ${
                          region.name.includes("оккупирована") ? "bg-white/10" : ""
                        }`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="p-4">
                          <div className="font-medium">{region.name}</div>
                        </td>
                        <td className="p-4 text-gray-300">{region.population}</td>
                        <td className="p-4 text-gray-300">{region.providers}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(region.status)}
                            <Badge className="text-xs bg-white/10 text-white border-white/20">
                              {statusLegend[region.status as keyof typeof statusLegend].label}
                            </Badge>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {sortedAndFilteredRegions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">Регионы не найдены</p>
                  <Button
                    onClick={() => setSearchQuery("")}
                    variant="outline"
                    className="mt-4 transform hover:scale-105 transition-all duration-200"
                  >
                    Сбросить поиск
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
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
              <a href="/" className="text-gray-400 hover:text-white transition-colors transform hover:scale-105">
                Главная
              </a>
              <a
                href="/materials"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-105"
              >
                Материалы
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