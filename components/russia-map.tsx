"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, AlertTriangle } from "lucide-react"

interface Region {
  id: string
  name: string
  status: string
  color: string
  description: string
  population: string
  providers: string[]
}

interface RussiaMapProps {
  regions: Region[]
  onRegionClick: (regionId: string) => void
  selectedRegion: string | null
}

export function RussiaMap({ regions, onRegionClick, selectedRegion }: RussiaMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  const getRegionData = (regionId: string) => {
    return regions.find((r) => r.id === regionId)
  }

  const getRegionColor = (regionId: string) => {
    const region = getRegionData(regionId)
    return region?.color || "#666"
  }

  const handleRegionClick = (regionId: string) => {
    onRegionClick(regionId)
  }

  const handleRegionHover = (regionId: string | null) => {
    setHoveredRegion(regionId)
  }

  const hoveredRegionData = hoveredRegion ? getRegionData(hoveredRegion) : null

  return (
    <div className="relative">
      {/* Tooltip */}
      {hoveredRegionData && (
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <Card className="bg-black/90 border-white/20 backdrop-blur-sm">
            <CardContent className="p-3">
              <h4 className="font-semibold text-sm mb-1">{hoveredRegionData.name}</h4>
              <Badge className="text-xs mb-2" style={{ backgroundColor: hoveredRegionData.color, color: "white" }}>
                {hoveredRegionData.description}
              </Badge>
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <Users className="w-3 h-3" />
                {hoveredRegionData.population}
              </div>
              {hoveredRegionData.status === "occupied" && (
                <div className="flex items-center gap-2 text-xs text-purple-300 mt-1">
                  <AlertTriangle className="w-3 h-3" />
                  Оккупированная территория
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* SVG Map */}
      <svg
        viewBox="0 0 1000 600"
        className="w-full h-auto bg-gray-900/20 rounded-lg border border-white/10"
        style={{ maxHeight: "70vh" }}
      >
        {/* Москва */}
        <circle
          cx="350"
          cy="280"
          r="10"
          fill={getRegionColor("moscow")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("moscow")}
          onMouseEnter={() => handleRegionHover("moscow")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Санкт-Петербург */}
        <circle
          cx="320"
          cy="220"
          r="8"
          fill={getRegionColor("spb")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("spb")}
          onMouseEnter={() => handleRegionHover("spb")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Московская область */}
        <path
          d="M330 270 L370 270 L370 290 L330 290 Z"
          fill={getRegionColor("moscow_region")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("moscow_region")}
          onMouseEnter={() => handleRegionHover("moscow_region")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Краснодарский край */}
        <path
          d="M320 380 L380 380 L380 400 L320 400 Z"
          fill={getRegionColor("krasnodar")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("krasnodar")}
          onMouseEnter={() => handleRegionHover("krasnodar")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Свердловская область */}
        <path
          d="M500 280 L540 280 L540 300 L500 300 Z"
          fill={getRegionColor("sverdlovsk")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("sverdlovsk")}
          onMouseEnter={() => handleRegionHover("sverdlovsk")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Ростовская область */}
        <path
          d="M340 350 L380 350 L380 370 L340 370 Z"
          fill={getRegionColor("rostov")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("rostov")}
          onMouseEnter={() => handleRegionHover("rostov")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Башкортостан */}
        <path
          d="M440 320 L480 320 L480 340 L440 340 Z"
          fill={getRegionColor("bashkortostan")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("bashkortostan")}
          onMouseEnter={() => handleRegionHover("bashkortostan")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Татарстан */}
        <path
          d="M420 300 L460 300 L460 320 L420 320 Z"
          fill={getRegionColor("tatarstan")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("tatarstan")}
          onMouseEnter={() => handleRegionHover("tatarstan")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Тюменская область */}
        <path
          d="M540 240 L600 240 L600 280 L540 280 Z"
          fill={getRegionColor("tyumen")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("tyumen")}
          onMouseEnter={() => handleRegionHover("tyumen")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Челябинская область */}
        <path
          d="M480 300 L520 300 L520 320 L480 320 Z"
          fill={getRegionColor("chelyabinsk")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("chelyabinsk")}
          onMouseEnter={() => handleRegionHover("chelyabinsk")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Крым (оккупированный) */}
        <path
          d="M320 420 L360 420 L360 440 L320 440 Z"
          fill={getRegionColor("crimea")}
          stroke="white"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-3 hover:brightness-110"
          onClick={() => handleRegionClick("crimea")}
          onMouseEnter={() => handleRegionHover("crimea")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* ДНР (оккупированная) */}
        <path
          d="M380 350 L420 350 L420 370 L380 370 Z"
          fill={getRegionColor("donetsk")}
          stroke="white"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-3 hover:brightness-110"
          onClick={() => handleRegionClick("donetsk")}
          onMouseEnter={() => handleRegionHover("donetsk")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* ЛНР (оккупированная) */}
        <path
          d="M420 350 L450 350 L450 370 L420 370 Z"
          fill={getRegionColor("luhansk")}
          stroke="white"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-3 hover:brightness-110"
          onClick={() => handleRegionClick("luhansk")}
          onMouseEnter={() => handleRegionHover("luhansk")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Остальные регионы */}
        {/* Ленинградская область */}
        <path
          d="M300 210 L340 210 L340 230 L300 230 Z"
          fill={getRegionColor("leningrad_region")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("leningrad_region")}
          onMouseEnter={() => handleRegionHover("leningrad_region")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Новосибирская область */}
        <path
          d="M600 300 L640 300 L640 320 L600 320 Z"
          fill={getRegionColor("novosibirsk")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("novosibirsk")}
          onMouseEnter={() => handleRegionHover("novosibirsk")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Красноярский край */}
        <path
          d="M640 260 L700 260 L700 300 L640 300 Z"
          fill={getRegionColor("krasnoyarsk")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("krasnoyarsk")}
          onMouseEnter={() => handleRegionHover("krasnoyarsk")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Кемеровская область */}
        <path
          d="M620 320 L660 320 L660 340 L620 340 Z"
          fill={getRegionColor("kemerovo")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("kemerovo")}
          onMouseEnter={() => handleRegionHover("kemerovo")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Дальневосточные регионы */}
        <path
          d="M900 320 L920 320 L920 380 L900 380 Z"
          fill={getRegionColor("sakhalin")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("sakhalin")}
          onMouseEnter={() => handleRegionHover("sakhalin")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        <path
          d="M920 280 L950 280 L950 320 L920 320 Z"
          fill={getRegionColor("kamchatka")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("kamchatka")}
          onMouseEnter={() => handleRegionHover("kamchatka")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        <path
          d="M740 200 L820 200 L820 280 L740 280 Z"
          fill={getRegionColor("yakutia")}
          stroke="white"
          strokeWidth="1"
          className="cursor-pointer transition-all duration-200 hover:stroke-width-2 hover:brightness-110"
          onClick={() => handleRegionClick("yakutia")}
          onMouseEnter={() => handleRegionHover("yakutia")}
          onMouseLeave={() => handleRegionHover(null)}
        />

        {/* Подписи крупных городов */}
        <text x="355" y="275" fill="white" fontSize="10" textAnchor="middle" className="pointer-events-none">
          Москва
        </text>
        <text x="325" y="215" fill="white" fontSize="8" textAnchor="middle" className="pointer-events-none">
          СПб
        </text>

        {/* Подписи оккупированных территорий */}
        <text x="340" y="435" fill="white" fontSize="8" textAnchor="middle" className="pointer-events-none">
          Крым
        </text>
        <text x="400" y="365" fill="white" fontSize="8" textAnchor="middle" className="pointer-events-none">
          ДНР
        </text>
        <text x="435" y="365" fill="white" fontSize="8" textAnchor="middle" className="pointer-events-none">
          ЛНР
        </text>
      </svg>

      {/* Map Controls */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Нажмите на регион для получения подробной информации • Наведите курсор для быстрого просмотра
        </p>
        <p className="text-xs text-purple-400 mt-1">Пунктирная граница обозначает оккупированные территории</p>
      </div>
    </div>
  )
}
