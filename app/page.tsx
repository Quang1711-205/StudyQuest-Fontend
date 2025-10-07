"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Sparkles, Trophy, Target, Zap, Users, BookOpen } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl mb-8 animate-float">
            <span className="text-3xl font-bold text-white">SQ</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-balance">
            Learn Languages
            <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Like a Game
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 text-pretty max-w-2xl mx-auto">
            Master new languages through engaging missions, earn rewards, compete with friends, and level up your skills
            in the most fun way possible.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Learning Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-xl bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-20">
            <FeatureCard
              icon={<Target className="w-8 h-8" />}
              title="Daily Missions"
              description="Complete fun challenges and earn rewards every day"
              color="from-primary to-blue-600"
            />
            <FeatureCard
              icon={<Trophy className="w-8 h-8" />}
              title="Compete & Win"
              description="Climb the leaderboard and show off your skills"
              color="from-accent to-orange-600"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Level Up Fast"
              description="Gain XP, unlock badges, and track your progress"
              color="from-secondary to-pink-600"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8" />}
              title="Structured Path"
              description="Follow a clear learning map from beginner to expert"
              color="from-purple-500 to-indigo-600"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Practice Zone"
              description="Master listening, speaking, reading, and writing"
              color="from-teal-500 to-cyan-600"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8" />}
              title="Shop & Customize"
              description="Unlock avatars, backgrounds, and power-ups"
              color="from-pink-500 to-rose-600"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/50 backdrop-blur-sm py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="10M+" label="Active Learners" />
            <StatCard number="50+" label="Languages" />
            <StatCard number="1000+" label="Lessons" />
            <StatCard number="4.9★" label="User Rating" />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-border">
      <div
        className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${color} text-white mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  )
}
