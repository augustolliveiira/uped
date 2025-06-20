"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  Video,
  Brain,
  Zap,
  Lock,
  Loader2,
  Shield,
  Award,
  Target,
} from "lucide-react"

export default function UpsellPage() {
  const [timeLeft, setTimeLeft] = useState(15 * 60) // 15 minutes in seconds
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Simulate loading
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(loadingInterval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(loadingInterval)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isLoading])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <Loader2 className="h-16 w-16 animate-spin mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold mb-2 text-slate-800">Carregando Protocolo Médico</h2>
            <p className="text-slate-600">Preparando sua consulta especializada...</p>
          </div>
          <div className="w-80 bg-slate-200 rounded-full h-3 mx-auto">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            />
          </div>
          <p className="text-sm text-slate-500 mt-2">{Math.round(loadingProgress)}%</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-12">
        {/* Medical Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-blue-600" />
            <Badge className="text-sm font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200">
              PROTOCOLO MÉDICO CERTIFICADO
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-slate-800">DOMÍNIO ABSOLUTO™️</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Protocolo Científico para Otimização da Performance Masculina
          </p>
        </div>

        {/* Timer - Medical Style */}
        <Card className="bg-white border-2 border-blue-200 mb-12 shadow-lg max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-slate-700">Consulta Disponível Por:</span>
            </div>
            <div className="text-3xl font-bold text-blue-600 bg-blue-50 py-2 px-4 rounded-lg">
              {formatTime(timeLeft)}
            </div>
            <p className="text-sm text-slate-500 mt-2">Vagas limitadas para hoje</p>
          </CardContent>
        </Card>

        {/* Main Content - Clinical Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Award className="h-8 w-8 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                FASE AVANÇADA
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
              Você tratou o problema. Agora é hora de ultrapassar o limite.
            </h2>
            <p className="text-xl text-slate-600">Porque ser "funcional" é apenas o primeiro passo.</p>
            <p className="text-2xl font-semibold text-slate-800">
              O verdadeiro homem domina. Ele surpreende. Ele IMPACTA.
            </p>
          </div>

          <Card className="bg-white border border-slate-200 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center gap-2 mb-6">
                <Target className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-slate-800">Avaliação Clínica</h3>
              </div>
              <div className="space-y-4 text-slate-700">
                <p className="text-lg font-medium text-slate-800">
                  Parabéns. Você não é mais o paciente que apresenta disfunções.
                </p>
                <p className="text-base">Mas deixa eu te perguntar: você é o homem que ela lembra no meio do dia?</p>
                <p className="text-base">O que desperta desejo genuíno com apenas um olhar?</p>
                <p className="text-base">O que entra no ambiente e impõe presença natural e magnética?</p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-6">
                  <p className="text-lg font-semibold text-blue-800">
                    Se a resposta é não, seu tratamento ainda não está completo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Description - Medical */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white mb-16 shadow-xl">
          <CardContent className="p-12 text-center">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">Domínio Absoluto™️</h3>
              <p className="text-xl mb-4 opacity-90">
                É um protocolo psicológico, comportamental e fisiológico cientificamente desenvolvido
              </p>
              <p className="text-lg mb-6 opacity-90">
                que transforma o homem comum em um ativo de alto valor sexual e emocional.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <p className="text-2xl font-bold">
                  Enquanto a maioria apenas tenta não falhar… você vai começar a dominar.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What You Get - Medical Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">📋 PROTOCOLO COMPLETO INCLUI:</h3>
            <p className="text-lg text-slate-600">Metodologia científica para resultados mensuráveis</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-10 w-10" />,
                title: "Protocolo Secreto de Domínio Psicossexual",
                description: "Metodologia científica completa com base em neurociência",
                badge: "EXCLUSIVO",
              },
              {
                icon: <Video className="h-10 w-10" />,
                title: "Sessões Práticas Guiadas",
                description: "Técnicas de postura, comunicação e presença magnética",
                badge: "PRÁTICO",
              },
              {
                icon: <Brain className="h-10 w-10" />,
                title: "Reprogramação Mental",
                description: "Eliminação definitiva de inseguranças e bloqueios limitantes",
                badge: "CIENTÍFICO",
              },
              {
                icon: <CheckCircle className="h-10 w-10" />,
                title: "Otimização Hormonal",
                description: "Biohacks para testosterona, foco e energia vital",
                badge: "MÉDICO",
              },
              {
                icon: <Users className="h-10 w-10" />,
                title: "Comunidade Elite",
                description: "Acesso ao grupo exclusivo de homens de alto valor",
                badge: "VIP",
              },
              {
                icon: <BookOpen className="h-10 w-10" />,
                title: "Manual Científico",
                description: "Guia completo: Comportamento dos Homens Irresistíveis",
                badge: "BONUS",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white border border-slate-200 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <CardContent className="p-8 text-center relative">
                  <Badge className="absolute top-4 right-4 text-xs bg-blue-100 text-blue-700">{item.badge}</Badge>
                  <div className="text-blue-600 mb-6 flex justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-slate-800 mb-3 text-lg">{item.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pricing - Medical Professional */}
        <Card className="bg-white border-2 border-green-200 mb-12 shadow-xl max-w-2xl mx-auto">
          <CardContent className="p-10 text-center">
            <div className="mb-8">
              <Badge className="bg-green-100 text-green-800 text-sm font-semibold mb-4">
                INVESTIMENTO EM SUA SAÚDE
              </Badge>
              <h3 className="text-3xl font-bold text-slate-800 mb-6">Consulta Especializada</h3>
            </div>

            <div className="mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-xl text-slate-500">Valor de Consultório:</span>
                <span className="text-2xl line-through text-slate-400">R$ 297,00</span>
              </div>
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <p className="text-lg text-green-700 mb-2">Investimento Hoje:</p>
                <p className="text-5xl font-bold text-green-600 mb-2">R$ 59,90</p>
                <p className="text-sm text-green-600">Acesso vitalício ao protocolo</p>
              </div>
              <p className="text-sm text-slate-500 mt-4">*Oferta válida apenas para esta sessão. Não será repetida.</p>
            </div>

            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 text-xl rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 w-full"
            >
              <Lock className="mr-3 h-6 w-6" />
              INICIAR PROTOCOLO AGORA
            </Button>
            <p className="text-sm text-slate-500 mt-4">Pagamento seguro • Acesso imediato</p>
          </CardContent>
        </Card>

        {/* Final Push - Medical */}
        <Card className="bg-slate-800 text-white shadow-2xl">
          <CardContent className="p-12 text-center">
            <h3 className="text-3xl font-bold mb-8 text-blue-300">🏥 AVALIAÇÃO FINAL DO ESPECIALISTA</h3>
            <div className="max-w-3xl mx-auto space-y-6 text-lg">
              <p className="text-slate-300">
                Como profissional, posso afirmar: ela pode aceitar suas limitações atuais.
              </p>
              <p className="text-slate-300">Ela pode até demonstrar compreensão com sua situação.</p>
              <div className="bg-blue-900/50 p-6 rounded-xl border border-blue-700">
                <p className="font-bold text-blue-200 text-xl">
                  Mas toda mulher, inconscientemente, deseja o homem que transborda presença natural.
                </p>
              </div>
              <p className="text-slate-300">
                Se você permanecer apenas no nível básico, continuará sendo substituível.
              </p>
              <p className="text-2xl font-bold text-white leading-relaxed">
                Você já resolveu o problema inicial. Agora torne-se o homem que ela respeita, admira e deseja —
                simultaneamente.
              </p>
            </div>

            <Button
              size="lg"
              className="mt-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-5 px-12 text-xl rounded-xl shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              CONFIRMAR MINHA TRANSFORMAÇÃO
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
