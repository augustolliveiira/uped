"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, CheckCircle2, Stethoscope, ArrowRight, AlertTriangle, Crown, Clock, Zap, Target } from "lucide-react"

interface Message {
  id: number
  type: "doctor" | "user" | "system"
  content: string
  timestamp: Date
  options?: string[]
  isTyping?: boolean
}

export default function ConsultationChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showUpsell, setShowUpsell] = useState(false)
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const consultationFlow = [
    {
      type: "system",
      content: "🎉 PARABÉNS! COMPRA CONFIRMADA",
    },
    {
      type: "doctor",
      content:
        "Olá! Sou Dr. Marcus. PARABÉNS pela sua compra! Você acabou de dar o primeiro passo para sua transformação. Mas preciso te alertar sobre algo CRUCIAL...",
    },
    {
      type: "doctor",
      content:
        "O que você comprou é EXCELENTE para resolver o problema básico. Mas me responda: Você quer apenas 'não falhar' ou quer que ela IMPLORE por mais?",
      options: ["Quero que ela implore por mais", "Quero ser irresistível", "Quero dominar completamente"],
    },
    {
      type: "doctor",
      content:
        "PERFEITO! Então você entende que existe uma DIFERENÇA BRUTAL entre o homem que 'funciona' e o homem que ela NUNCA consegue esquecer.",
    },
    {
      type: "doctor",
      content:
        "Vou ser BRUTALMENTE honesto: 90% dos homens param no básico e ficam na mediocridade sexual para sempre. Você quer ser um deles?",
      options: ["NÃO! Quero ser extraordinário", "Quero ser o melhor que ela já teve", "Me conte como ser diferente"],
    },
    {
      type: "doctor",
      content:
        "EXATO! E é por isso que estou aqui. Tenho APENAS 3 MINUTOS para te oferecer o protocolo que separa os LENDÁRIOS dos esquecíveis.",
    },
    {
      type: "doctor",
      content:
        "Escuta: Enquanto outros homens vão usar o básico e serem 'ok'... você pode ter o DOMÍNIO ABSOLUTO e ser INESQUECÍVEL. Qual você escolhe?",
      options: ["Escolho ser INESQUECÍVEL", "Quero o DOMÍNIO ABSOLUTO", "Não quero ser apenas 'ok'"],
    },
    {
      type: "doctor",
      content:
        "PERFEITO! Normalmente eu cobraria R$ 1.997 por este protocolo avançado. Mas você acabou de comprar comigo, então vou fazer algo INSANO...",
    },
    {
      type: "doctor",
      content:
        "Por apenas R$ 59,90 você leva o protocolo COMPLETO que transforma homens comuns em DEUSES na cama. Mas só tenho 2 MINUTOS para você decidir!",
      options: ["SIM! EU QUERO AGORA!", "Não posso perder isso!", "ACEITO ESSA OFERTA!"],
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (currentStep < consultationFlow.length) {
      const timer = setTimeout(() => {
        setIsTyping(true)

        setTimeout(() => {
          const newMessage: Message = {
            id: Date.now(),
            type: consultationFlow[currentStep].type as "doctor" | "user" | "system",
            content: consultationFlow[currentStep].content,
            timestamp: new Date(),
            options: consultationFlow[currentStep].options,
          }

          setMessages((prev) => [...prev, newMessage])
          setIsTyping(false)

          if (!consultationFlow[currentStep].options) {
            setCurrentStep((prev) => prev + 1)
          }
        }, 1000)
      }, 600)

      return () => clearTimeout(timer)
    } else if (currentStep >= consultationFlow.length) {
      setTimeout(() => setShowUpsell(true), 1000)
    }
  }, [currentStep])

  const handleOptionSelect = (messageId: number, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [messageId]: option }))

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: option,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentStep((prev) => prev + 1)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (showUpsell) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white p-4">
        <div className="max-w-md mx-auto">
          {/* Urgency Timer */}
          <Card className="bg-blue-600 text-white shadow-xl mb-4 border-2 border-blue-500">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-5 w-5 animate-pulse" />
                <span className="font-bold text-sm">OFERTA EXPIRA EM:</span>
              </div>
              <div className="text-3xl font-bold bg-white/20 py-2 px-4 rounded-lg">{formatTime(timeLeft)}</div>
              <p className="text-xs text-blue-100 mt-1">Depois disso, nunca mais!</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-2xl border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="h-10 w-10 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-2">DOMÍNIO ABSOLUTO™</h2>
                <p className="text-blue-600 font-semibold">O protocolo que cria LENDAS na cama</p>
              </div>

              {/* Comparison */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-100 p-4 rounded-lg">
                  <h4 className="font-bold text-slate-600 mb-2">❌ SEM O PROTOCOLO:</h4>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Apenas "funcional"</li>
                    <li>• Ela fica "satisfeita"</li>
                    <li>• Você é "ok"</li>
                    <li>• Facilmente substituível</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-2">✅ COM O PROTOCOLO:</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• DOMINANTE total</li>
                    <li>• Ela IMPLORA por mais</li>
                    <li>• Você é INESQUECÍVEL</li>
                    <li>• IMPOSSÍVEL de substituir</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                <h3 className="font-bold text-lg mb-3 text-slate-800">🔥 VOCÊ RECEBE AGORA:</h3>
                <div className="space-y-3 text-sm text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-slate-700">
                      <strong>Protocolo Psicológico de Dominância Sexual</strong> - Como ela nunca mais vai esquecer de
                      você
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-slate-700">
                      <strong>Técnicas de Presença Magnética</strong> - Ela vai implorar só com seu olhar
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-slate-700">
                      <strong>Reprogramação Mental Completa</strong> - Confiança de DEUS na cama
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Crown className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-slate-700">
                      <strong>Grupo VIP dos Homens Lendários</strong> - Acesso exclusivo vitalício
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4 rounded-xl mb-6">
                <p className="text-sm mb-1">VALOR REAL DO PROTOCOLO:</p>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-lg line-through opacity-75">R$ 1.997</span>
                  <span className="text-4xl font-bold">R$ 59,90</span>
                </div>
                <p className="text-xs text-green-100">⚡ DESCONTO DE 97% • APENAS HOJE</p>
              </div>

              <div className="space-y-3">
              <Button
  onClick={() => {
    window.location.href = "https://pay.kirvano.com/426adb11-0c37-4844-8437-f7bc6d37d789"
  }}
  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg rounded-xl shadow-xl transform hover:scale-105 transition-all"
>
  <Crown className="mr-2 h-6 w-6" />
  SIM! QUERO SER UMA LENDA AGORA
</Button>


                <p className="text-xs text-slate-500">
                  ✅ Acesso IMEDIATO • 🔒 Pagamento 100% Seguro • 💎 Garantia Total
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 text-white mt-4 shadow-xl">
            <CardContent className="p-4 text-center">
              <h4 className="font-bold text-blue-400 mb-2">⚠️ ÚLTIMA CHANCE:</h4>
              <p className="text-sm text-slate-300">
                Se você sair desta página, vai ficar para sempre na mediocridade sexual. Enquanto outros homens vão ser
                LENDAS, você vai continuar sendo apenas "ok".
              </p>
              <p className="text-sm text-blue-300 font-bold mt-2">A escolha é sua: LENDA ou esquecível?</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg p-4 sticky top-0 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold">Dr. Marcus - Especialista</h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                <span className="text-xs text-blue-100">Consultoria Exclusiva</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Badge className="bg-red-500 text-white text-xs animate-pulse">URGENTE</Badge>
            <div className="text-xs mt-1 font-bold">{formatTime(timeLeft)}</div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="max-w-md mx-auto p-4 pb-20">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              {message.type === "system" && (
                <div className="text-center">
                  <Badge className="bg-green-100 text-green-800 text-sm px-4 py-2 animate-bounce">
                    {message.content}
                  </Badge>
                </div>
              )}

              {message.type === "doctor" && (
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-blue-600 text-white text-sm font-bold">Dr</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Card className="bg-white shadow-lg border-l-4 border-blue-500">
                      <CardContent className="p-4">
                        <p className="text-sm text-slate-800 leading-relaxed font-medium">{message.content}</p>
                      </CardContent>
                    </Card>

                    {message.options && !selectedAnswers[message.id] && (
                      <div className="mt-3 space-y-2">
                        {message.options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="w-full text-left justify-start text-sm h-auto py-3 px-4 border-2 border-blue-300 hover:bg-blue-600 hover:text-white font-semibold transition-all transform hover:scale-105"
                            onClick={() => handleOptionSelect(message.id, option)}
                          >
                            <ArrowRight className="mr-2 h-4 w-4" />
                            {option}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {message.type === "user" && (
                <div className="flex gap-3 justify-end">
                  <div className="flex-1 max-w-xs">
                    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
                      <CardContent className="p-3">
                        <p className="text-sm font-medium">{message.content}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-green-600 text-white text-sm">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarFallback className="bg-blue-600 text-white text-sm font-bold">Dr</AvatarFallback>
              </Avatar>
              <Card className="bg-white shadow-lg border-l-4 border-blue-500">
                <CardContent className="p-4">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Bottom Status */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3">
        <div className="max-w-md mx-auto flex items-center justify-center gap-2">
          <AlertTriangle className="h-4 w-4 animate-pulse" />
          <span className="text-xs font-bold">OFERTA ÚNICA • EXPIRA EM {formatTime(timeLeft)}</span>
        </div>
      </div>
    </div>
  )
}
