"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Minus, RotateCw, Users, Wifi, AlertTriangle, Globe, BarChart3 } from "lucide-react"

import regionalData from "../config/regional-data.json"

interface RegionalComparisonProps {
  userScore: number
  userLevel: string
}

export function RegionalComparison({ userScore, userLevel }: RegionalComparisonProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  const regions = regionalData.regions
  const globalAverage = regionalData.globalAverage
  const trends = regionalData.trends

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "declining":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      case "mixed":
        return <RotateCw className="w-4 h-4 text-yellow-400" />
      default:
        return <Minus className="w-4 h-4 text-gray-400" />
    }
  }

  const getScoreDifference = (regionScore: number) => {
    const diff = userScore - regionScore
    if (diff > 0) return `+${diff}`
    return diff.toString()
  }

  const getComparisonText = (regionScore: number) => {
    const diff = userScore - regionScore
    if (diff > 10) return "значительно выше"
    if (diff > 0) return "выше"
    if (diff > -10) return "примерно равен"
    return "ниже"
  }

  const selectedRegionData = selectedRegion ? regions.find((r) => r.id === selectedRegion) : null

  return (
    <div className="space-y-8">
      {/* Global Comparison */}
      <Card className="bg-black/50 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Globe className="w-6 h-6" />
            Сравнение с мировыми показателями
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{userScore}</div>
              <div className="text-sm text-gray-400">Ваш результат</div>
              <Badge className="mt-2">{userLevel}</Badge>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2 text-yellow-400">{globalAverage}</div>
              <div className="text-sm text-gray-400">Мировой средний</div>
              <div className="text-sm mt-2">Ваш результат {getComparisonText(globalAverage)} среднего</div>
            </div>
            <div className="text-center">
              <div
                className={`text-3xl font-bold mb-2 ${userScore > globalAverage ? "text-green-400" : "text-red-400"}`}
              >
                {getScoreDifference(globalAverage)}
              </div>
              <div className="text-sm text-gray-400">Разница</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Grid */}
      <Card className="bg-black/50 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6" />
            Сравнение по регионам
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {regions.map((region, index) => (
              <Card
                key={region.id}
                className={`bg-black/30 border-white/10 hover:bg-black/50 transition-all duration-300 cursor-pointer transform hover:scale-105 animate-fade-in-up ${
                  selectedRegion === region.id ? "ring-2 ring-white/30" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{region.flag}</span>
                    {getTrendIcon(region.trend)}
                  </div>

                  <h3 className="font-semibold mb-2 text-sm">{region.name}</h3>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">{region.averageScore}</span>
                      <Badge className={`${region.color} text-white text-xs`} variant="secondary">
                        {region.level}
                      </Badge>
                    </div>

                    <Progress value={(region.averageScore / 100) * 100} className="h-2" />

                    <div className="text-xs text-gray-400">
                      {getComparisonText(region.averageScore)} среднего по региону
                    </div>

                    <div
                      className={`text-xs font-medium ${
                        userScore > region.averageScore ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {getScoreDifference(region.averageScore)} баллов
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Regional View */}
      {selectedRegionData && (
        <Card className="bg-black/50 border-white/10 animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <span className="text-2xl">{selectedRegionData.flag}</span>
              Детальное сравнение: {selectedRegionData.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <Users className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <div className="text-lg font-semibold">{selectedRegionData.population}</div>
                <div className="text-sm text-gray-400">Население</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <Wifi className="w-6 h-6 mx-auto mb-2 text-green-400" />
                <div className="text-lg font-semibold">{selectedRegionData.internetPenetration}</div>
                <div className="text-sm text-gray-400">Проникновение интернета</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                {getTrendIcon(selectedRegionData.trend)}
                <div className="text-lg font-semibold mt-2">
                  {trends[selectedRegionData.trend as keyof typeof trends]}
                </div>
                <div className="text-sm text-gray-400">Тренд</div>
              </div>
            </div>

            {/* Description */}
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-gray-300 leading-relaxed">{selectedRegionData.description}</p>
            </div>

            {/* Main Issues */}
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                Основные проблемы
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedRegionData.mainIssues.map((issue, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded text-sm">
                    <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                    {issue}
                  </div>
                ))}
              </div>
            </div>

            {/* Category Comparison */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Сравнение по категориям</h4>
              <div className="space-y-3">
                {Object.entries(selectedRegionData.categoryScores).map(([category, score]) => {
                  const categoryNames: Record<string, string> = {
                    blocked_sites: "Блокировки сайтов",
                    vpn_usage: "Использование VPN",
                    social_censorship: "Цензура в соцсетях",
                    government_surveillance: "Гос. наблюдение",
                    free_expression: "Свобода выражения",
                    independent_media: "Независимые СМИ",
                  }

                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{categoryNames[category]}</span>
                        <span>{score}/20</span>
                      </div>
                      <Progress value={(score / 20) * 100} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </div>

            <Button
              onClick={() => setSelectedRegion(null)}
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10"
            >
              Закрыть детали
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-black/50 border-white/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Globe className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-2">Интерпретация результатов</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Сравнение с другими регионами помогает понять контекст вашей ситуации. Помните, что даже в странах с
                высокими показателями могут существовать локальные проблемы, а в регионах с низкими баллами есть люди,
                успешно обходящие ограничения.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
