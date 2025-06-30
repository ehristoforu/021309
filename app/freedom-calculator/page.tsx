"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Calculator,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
  RotateCcw,
  TrendingUp,
  Globe,
  Lock,
} from "lucide-react"
import { RegionalComparison } from "@/components/regional-comparison"

import freedomConfig from "../../config/freedom-questions.json"

const questions = freedomConfig.questions
const levels = freedomConfig.levels

interface Answer {
  questionId: string
  value: number
  points: number
}

export default function FreedomCalculatorPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [showResults, setShowResults] = useState(false)
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

  const handleAnswer = (questionId: string, value: number, points: number) => {
    const newAnswers = [...answers.filter((a) => a.questionId !== questionId), { questionId, value, points }]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      setTimeout(() => {
        setShowResults(true)
      }, 300)
    }
  }

  const calculateScore = () => {
    return answers.reduce((total, answer) => total + answer.points, 0)
  }

  const getLevel = (score: number) => {
    return levels.find((level) => score >= level.min && score <= level.max) || levels[0]
  }

  const resetCalculator = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
  }

  const score = calculateScore()
  const level = getLevel(score)
  const progress = ((currentQuestion + 1) / questions.length) * 100

  if (showResults) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Results Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-white/20 rounded-full">
              <TrendingUp className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Ваш результат</h1>
            <p className="text-xl text-gray-400">Оценка уровня интернет-свободы</p>
          </div>

          {/* Score Display */}
          <Card className="bg-black/50 border-white/10 mb-8 animate-fade-in-up delay-200">
            <CardContent className="p-8 text-center">
              <div className="mb-6">
                <div className="text-6xl font-bold mb-2">{score}</div>
                <div className="text-gray-400">из 100 баллов</div>
              </div>

              <div className="mb-6">
                <Progress value={(score / 100) * 100} className="h-4 mb-4" />
                <Badge className={`${level.color} text-white text-lg px-4 py-2`}>{level.level} уровень</Badge>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">{level.description}</p>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="bg-black/50 border-white/10 mb-8 animate-fade-in-up delay-400">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-white" />
                Рекомендации для улучшения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {level.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Regional Comparison */}
          <div className="animate-fade-in-up delay-500">
            <RegionalComparison userScore={score} userLevel={level.level} />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-600">
            <Button
              onClick={resetCalculator}
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-200 bg-transparent"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Пройти заново
            </Button>
            <Button
              asChild
              className="bg-white text-black hover:bg-gray-200 transform hover:scale-105 transition-all duration-200"
            >
              <a href="/vpn">
                <Lock className="w-4 h-4 mr-2" />
                Получить VPN
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black transform hover:scale-105 transition-all duration-200 bg-transparent"
            >
              <a href="/materials">
                <Globe className="w-4 h-4 mr-2" />
                Изучить материалы
              </a>
            </Button>
          </div>
        </div>

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
                <a href="/vpn" className="text-gray-400 hover:text-white transition-colors transform hover:scale-105">
                  VPN
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
          <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-white/20 rounded-full animate-fade-in-up">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up delay-200">
            Калькулятор интернет-свободы
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-300">
            Оцените уровень вашей свободы в интернете и получите персональные рекомендации
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="mb-4 flex justify-between text-sm text-gray-400">
            <span>
              Вопрос {currentQuestion + 1} из {questions.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2 animate-fade-in-up" />
        </div>
      </section>

      {/* Question Section */}
      <section className="py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-black/50 border-white/10 animate-fade-in-up">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-8 text-center leading-relaxed">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswer(questions[currentQuestion].id, option.value, option.points)}
                    variant="outline"
                    className="w-full p-6 text-left justify-start border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-200 transform hover:scale-105 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="text-base">{option.text}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Info Section */}
      <section
        id="info"
        data-section
        className={`py-12 px-4 bg-white/5 transition-all duration-1000 ${
          visibleSections.has("info") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Что мы оцениваем</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <XCircle className="w-8 h-8 text-white" />,
                title: "Блокировки сайтов",
                description: "Количество заблокированных ресурсов и их влияние на ваш опыт",
              },
              {
                icon: <Shield className="w-8 h-8 text-white" />,
                title: "Использование VPN",
                description: "Необходимость использования VPN для доступа к контенту",
              },
              {
                icon: <AlertTriangle className="w-8 h-8 text-white" />,
                title: "Цензура контента",
                description: "Удаление постов и блокировка аккаунтов в социальных сетях",
              },
              {
                icon: <Globe className="w-8 h-8 text-white" />,
                title: "Свобода выражения",
                description: "Возможность свободно высказывать свое мнение онлайн",
              },
              {
                icon: <Lock className="w-8 h-8 text-white" />,
                title: "Приватность",
                description: "Уровень государственного наблюдения и контроля",
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-white" />,
                title: "Доступ к СМИ",
                description: "Возможность получать информацию из независимых источников",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-700 ${
                  visibleSections.has("info") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
              <a href="/vpn" className="text-gray-400 hover:text-white transition-colors transform hover:scale-105">
                VPN
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
