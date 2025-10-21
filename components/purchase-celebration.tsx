"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Star } from "lucide-react"
import confetti from "canvas-confetti"

interface PurchaseCelebrationProps {
  isOpen: boolean
  onClose: () => void
  avatar: {
    id: number
    name: string
    iconUrl: string
    rarity: "common" | "rare" | "epic" | "legendary"
  } | null
}

const rarityConfig = {
  common: {
    gradient: "from-gray-400 to-gray-600",
    glow: "shadow-gray-500/50",
    particles: "from-gray-400/20 to-gray-600/20",
  },
  rare: {
    gradient: "from-blue-400 to-blue-600",
    glow: "shadow-blue-500/50",
    particles: "from-blue-400/20 to-blue-600/20",
  },
  epic: {
    gradient: "from-purple-400 to-purple-600",
    glow: "shadow-purple-500/50",
    particles: "from-purple-400/20 to-purple-600/20",
  },
  legendary: {
    gradient: "from-amber-400 via-orange-500 to-amber-600",
    glow: "shadow-amber-500/50",
    particles: "from-amber-400/20 to-orange-500/20",
  },
}

export function PurchaseCelebration({ isOpen, onClose, avatar }: PurchaseCelebrationProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen && avatar) {
      setIsAnimating(true)
      
      // Trigger confetti
      const duration = 3000
      const end = Date.now() + duration

      const colors = {
        common: ["#9ca3af", "#6b7280"],
        rare: ["#60a5fa", "#3b82f6"],
        epic: ["#a78bfa", "#8b5cf6"],
        legendary: ["#fbbf24", "#f59e0b", "#fb923c"],
      }

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors[avatar.rarity],
          gravity: 0.8,
          scalar: 1.2,
        })

        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors[avatar.rarity],
          gravity: 0.8,
          scalar: 1.2,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()

      // Stars burst effect
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 160,
          origin: { x: 0.5, y: 0.5 },
          colors: colors[avatar.rarity],
          shapes: ["star"],
          scalar: 1.5,
        })
      }, 500)
    }
  }, [isOpen, avatar])

  if (!isOpen || !avatar) return null

  const rarity = rarityConfig[avatar.rarity]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Celebration Card */}
      <div className="relative z-10 w-full max-w-lg mx-4 animate-in zoom-in-95 duration-500">
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-gradient-to-br ${rarity.particles} rounded-full animate-float`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Main card */}
        <div className="relative bg-gradient-to-br from-white via-white to-gray-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-slate-700/50">
          {/* Header */}
          <div className="text-center mb-6 animate-in slide-in-from-top duration-700">
            <div className="inline-flex items-center gap-2 mb-3">
              <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
              <h2 className="text-3xl font-black bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 bg-clip-text text-transparent">
                Congratulations!
              </h2>
              <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
              You've unlocked a new avatar!
            </p>
          </div>

          {/* Avatar Display */}
          <div className="relative mb-8 animate-in zoom-in duration-1000 delay-300">
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${rarity.gradient} rounded-3xl blur-3xl opacity-40 ${rarity.glow} animate-pulse`} />
            
            {/* Avatar container */}
            <div className="relative">
              {/* Rotating ring */}
              <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${rarity.gradient} opacity-20 animate-spin-slow`} 
                   style={{ animationDuration: "8s" }} />
              
              {/* Avatar image */}
              <div className={`relative aspect-square max-w-[280px] mx-auto bg-gradient-to-br ${rarity.gradient} rounded-3xl p-1 shadow-2xl ${rarity.glow}`}>
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-3xl p-6 flex items-center justify-center overflow-hidden">
                  {avatar.iconUrl ? (
                    <img
                      src={avatar.iconUrl}
                      alt={avatar.name}
                      className="w-full h-full object-cover rounded-2xl animate-in zoom-in duration-1000"
                    />
                  ) : (
                    <span className="text-9xl animate-bounce">✨</span>
                  )}
                </div>
              </div>

              {/* Floating stars */}
              {[...Array(8)].map((_, i) => (
                <Star
                  key={i}
                  className={`absolute w-6 h-6 text-amber-400 animate-ping`}
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: "2s",
                  }}
                  fill="currentColor"
                />
              ))}
            </div>
          </div>

          {/* Avatar info */}
          <div className="text-center mb-8 animate-in slide-in-from-bottom duration-700 delay-500">
            <div className="inline-block mb-3">
              <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider bg-gradient-to-r ${rarity.gradient} text-white shadow-lg`}>
                {avatar.rarity}
              </span>
            </div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
              {avatar.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This avatar has been added to your collection!
            </p>
          </div>

          {/* Continue button */}
          <Button
            onClick={onClose}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:via-orange-600 hover:to-pink-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom duration-700 delay-700"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Continue
            <Sparkles className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float linear infinite;
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
      `}</style>
    </div>
  )
}