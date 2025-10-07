"use client"

import { useAuth } from "@/lib/auth-context"
import { useNavigation } from "@/lib/navigation-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, Sparkles, Zap, ImageIcon, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Mock shop data
const shopItems = {
  avatars: [
    { id: 1, name: "Cool Cat", price: 100, currency: "coins", owned: false, rarity: "common" },
    { id: 2, name: "Space Explorer", price: 200, currency: "coins", owned: false, rarity: "rare" },
    { id: 3, name: "Dragon Master", price: 50, currency: "gems", owned: false, rarity: "epic" },
    { id: 4, name: "Ninja Warrior", price: 150, currency: "coins", owned: true, rarity: "common" },
    { id: 5, name: "Wizard", price: 80, currency: "gems", owned: false, rarity: "legendary" },
    { id: 6, name: "Robot", price: 250, currency: "coins", owned: false, rarity: "rare" },
  ],
  backgrounds: [
    { id: 7, name: "Sunset Beach", price: 150, currency: "coins", owned: false, rarity: "common" },
    { id: 8, name: "Mountain Peak", price: 200, currency: "coins", owned: false, rarity: "rare" },
    { id: 9, name: "Space Station", price: 40, currency: "gems", owned: false, rarity: "epic" },
    { id: 10, name: "Forest Path", price: 100, currency: "coins", owned: true, rarity: "common" },
    { id: 11, name: "City Lights", price: 60, currency: "gems", owned: false, rarity: "legendary" },
    { id: 12, name: "Ocean Depths", price: 180, currency: "coins", owned: false, rarity: "rare" },
  ],
  boosts: [
    { id: 13, name: "2x XP Boost (1h)", price: 50, currency: "coins", owned: false, rarity: "common" },
    { id: 14, name: "2x XP Boost (24h)", price: 20, currency: "gems", owned: false, rarity: "rare" },
    { id: 15, name: "Streak Freeze", price: 30, currency: "coins", owned: false, rarity: "common" },
    { id: 16, name: "Hint Pack (5)", price: 40, currency: "coins", owned: false, rarity: "common" },
    { id: 17, name: "Skip Lesson", price: 15, currency: "gems", owned: false, rarity: "rare" },
    { id: 18, name: "Unlimited Hearts (1h)", price: 25, currency: "gems", owned: false, rarity: "epic" },
  ],
}

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-amber-500",
}

export default function ShopPage() {
  const { user, isLoading } = useAuth()
  const { isOpen, closeNav, toggleNav } = useNavigation()
  const router = useRouter()
  const [items, setItems] = useState(shopItems)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  const handlePurchase = (itemId: number, category: "avatars" | "backgrounds" | "boosts") => {
    setItems((prev) => ({
      ...prev,
      [category]: prev[category].map((item) => (item.id === itemId ? { ...item, owned: true } : item)),
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      {/* <main className="md:ml-20 min-[1200px]:ml-96 mt-16 p-8 transition-all duration-300"> */}
            <main className="md:ml-20 xl:ml-64 mt-16 p-6 md:p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Shop</h1>
            <p className="text-muted-foreground text-lg">Customize your profile and boost your learning</p>
          </div>

          {/* Currency Display */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="border-2 border-accent">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center text-2xl">
                      💰
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Your Coins</div>
                      <div className="text-3xl font-bold text-accent">{user.coins}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Earn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-pink-600 flex items-center justify-center text-2xl">
                      💎
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Your Gems</div>
                      <div className="text-3xl font-bold text-secondary">{user.gems}</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Buy Gems
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shop Tabs */}
          <Tabs defaultValue="avatars" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6">
              <TabsTrigger value="avatars" className="gap-2">
                <Sparkles className="w-4 h-4" />
                Avatars
              </TabsTrigger>
              <TabsTrigger value="backgrounds" className="gap-2">
                <ImageIcon className="w-4 h-4" />
                Backgrounds
              </TabsTrigger>
              <TabsTrigger value="boosts" className="gap-2">
                <Zap className="w-4 h-4" />
                Boosts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="avatars">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.avatars.map((item) => (
                  <ShopItemCard key={item.id} item={item} onPurchase={() => handlePurchase(item.id, "avatars")} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="backgrounds">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.backgrounds.map((item) => (
                  <ShopItemCard key={item.id} item={item} onPurchase={() => handlePurchase(item.id, "backgrounds")} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="boosts">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.boosts.map((item) => (
                  <ShopItemCard key={item.id} item={item} onPurchase={() => handlePurchase(item.id, "boosts")} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function ShopItemCard({ item, onPurchase }: { item: any; onPurchase: () => void }) {
  return (
    <Card className={`border-2 hover:shadow-lg transition-all ${item.owned ? "border-success" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge className={`${rarityColors[item.rarity as keyof typeof rarityColors]} capitalize`}>
            {item.rarity}
          </Badge>
          {item.owned && <Check className="w-5 h-5 text-success" />}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Item Preview */}
        <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center text-4xl">
          {item.id % 3 === 0 ? "🎨" : item.id % 3 === 1 ? "🎭" : "✨"}
        </div>

        {/* Item Name */}
        <CardTitle className="text-lg">{item.name}</CardTitle>

        {/* Price & Action */}
        {item.owned ? (
          <Button disabled variant="outline" className="w-full bg-transparent">
            <Check className="w-4 h-4 mr-2" />
            Owned
          </Button>
        ) : (
          <Button onClick={onPurchase} className="w-full">
            <ShoppingBag className="w-4 h-4 mr-2" />
            {item.price} {item.currency === "coins" ? "💰" : "💎"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
