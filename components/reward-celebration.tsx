import { useEffect, useState } from "react"
import { Gift, Sparkles, Trophy, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RewardCelebrationProps {
  rewards: {
    xp: number
    coins: number
    gems: number
  }
  leveledUp?: boolean
  newLevel?: number
  onClose: () => void
}

export default function RewardCelebration({
  rewards,
  leveledUp,
  newLevel,
  onClose,
}: RewardCelebrationProps) {
  const [show, setShow] = useState(false)
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; delay: string }>>([])

  useEffect(() => {
    setShow(true)
    
    // Generate confetti particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 0.5}s`,
    }))
    setConfetti(particles)
  }, [])

  const handleClose = () => {
    setShow(false)
    setTimeout(onClose, 300)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Confetti */}
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="absolute top-0 animate-confetti"
          style={{
            left: particle.left,
            animationDelay: particle.delay,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: ["#fbbf24", "#f59e0b", "#ec4899", "#8b5cf6", "#3b82f6", "#10b981"][
                Math.floor(Math.random() * 6)
              ],
            }}
          />
        </div>
      ))}

      {/* Main Content */}
      <div
        className={`relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-3xl p-1 shadow-2xl transition-all duration-500 ${
          show ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 max-w-md w-full">
          {/* Trophy Icon with Animation */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-spin" />
              <Star className="absolute -bottom-2 -left-2 w-6 h-6 text-orange-500 animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-black text-center mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎉 Congratulations! 🎉
          </h2>
          <p className="text-center text-lg text-slate-600 dark:text-slate-400 mb-6">
            Mission completed successfully!
          </p>

          {/* Level Up Notice */}
          {leveledUp && newLevel && (
            <div className="mb-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border-2 border-purple-400 dark:border-purple-600">
              <div className="text-center">
                <div className="text-3xl mb-2">🎊</div>
                <div className="font-bold text-xl text-purple-600 dark:text-purple-400">
                  Level Up!
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  You reached Level {newLevel}
                </div>
              </div>
            </div>
          )}

          {/* Rewards */}
          <div className="space-y-3 mb-8">
            <div className="text-center text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4">
              Rewards Earned
            </div>

            {rewards.xp > 0 && (
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl border border-emerald-500/30 dark:border-emerald-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">Experience</span>
                </div>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  +{rewards.xp} XP
                </span>
              </div>
            )}

            {rewards.coins > 0 && (
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-xl border border-yellow-500/30 dark:border-yellow-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🪙</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">Coins</span>
                </div>
                <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  +{rewards.coins}
                </span>
              </div>
            )}

            {rewards.gems > 0 && (
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/30 dark:border-purple-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">💎</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">Gems</span>
                </div>
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  +{rewards.gems}
                </span>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleClose}
            className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Continue
          </Button>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear infinite;
        }
      `}</style>
    </div>
  )
}