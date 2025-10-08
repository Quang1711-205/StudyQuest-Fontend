// "use client"

// import { useAuth } from "@/lib/auth-context"
// import { useNavigation } from "@/lib/navigation-context"
// import { Navigation } from "@/components/navigation"
// import { TopBar } from "@/components/top-bar"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { ShoppingBag, Sparkles, Zap, ImageIcon, Check } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"

// // Mock shop data
// const shopItems = {
//   avatars: [
//     { id: 1, name: "Cool Cat", price: 100, currency: "coins", owned: false, rarity: "common" },
//     { id: 2, name: "Space Explorer", price: 200, currency: "coins", owned: false, rarity: "rare" },
//     { id: 3, name: "Dragon Master", price: 50, currency: "gems", owned: false, rarity: "epic" },
//     { id: 4, name: "Ninja Warrior", price: 150, currency: "coins", owned: true, rarity: "common" },
//     { id: 5, name: "Wizard", price: 80, currency: "gems", owned: false, rarity: "legendary" },
//     { id: 6, name: "Robot", price: 250, currency: "coins", owned: false, rarity: "rare" },
//   ],
//   backgrounds: [
//     { id: 7, name: "Sunset Beach", price: 150, currency: "coins", owned: false, rarity: "common" },
//     { id: 8, name: "Mountain Peak", price: 200, currency: "coins", owned: false, rarity: "rare" },
//     { id: 9, name: "Space Station", price: 40, currency: "gems", owned: false, rarity: "epic" },
//     { id: 10, name: "Forest Path", price: 100, currency: "coins", owned: true, rarity: "common" },
//     { id: 11, name: "City Lights", price: 60, currency: "gems", owned: false, rarity: "legendary" },
//     { id: 12, name: "Ocean Depths", price: 180, currency: "coins", owned: false, rarity: "rare" },
//   ],
//   boosts: [
//     { id: 13, name: "2x XP Boost (1h)", price: 50, currency: "coins", owned: false, rarity: "common" },
//     { id: 14, name: "2x XP Boost (24h)", price: 20, currency: "gems", owned: false, rarity: "rare" },
//     { id: 15, name: "Streak Freeze", price: 30, currency: "coins", owned: false, rarity: "common" },
//     { id: 16, name: "Hint Pack (5)", price: 40, currency: "coins", owned: false, rarity: "common" },
//     { id: 17, name: "Skip Lesson", price: 15, currency: "gems", owned: false, rarity: "rare" },
//     { id: 18, name: "Unlimited Hearts (1h)", price: 25, currency: "gems", owned: false, rarity: "epic" },
//   ],
// }

// const rarityColors = {
//   common: "bg-gray-500",
//   rare: "bg-blue-500",
//   epic: "bg-purple-500",
//   legendary: "bg-amber-500",
// }

// export default function ShopPage() {
//   const { user, isLoading } = useAuth()
//   const { isOpen, closeNav, toggleNav } = useNavigation()
//   const router = useRouter()
//   const [items, setItems] = useState(shopItems)

//   useEffect(() => {
//     if (!isLoading && !user) {
//       router.push("/login")
//     }
//   }, [user, isLoading, router])

//   if (isLoading || !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
//       </div>
//     )
//   }

//   const handlePurchase = (itemId: number, category: "avatars" | "backgrounds" | "boosts") => {
//     setItems((prev) => ({
//       ...prev,
//       [category]: prev[category].map((item) => (item.id === itemId ? { ...item, owned: true } : item)),
//     }))
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation isOpen={isOpen} onClose={closeNav} />
//       <TopBar onMenuClick={toggleNav} />

//       {/* <main className="md:ml-20 min-[1200px]:ml-96 mt-16 p-8 transition-all duration-300"> */}
//             <main className="md:ml-20 xl:ml-64 mt-16 p-6 md:p-8 transition-all duration-300">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="mb-8">
//             <h1 className="text-4xl font-bold mb-2">Shop</h1>
//             <p className="text-muted-foreground text-lg">Customize your profile and boost your learning</p>
//           </div>

//           {/* Currency Display */}
//           <div className="grid md:grid-cols-2 gap-4 mb-8">
//             <Card className="border-2 border-accent">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center text-2xl">
//                       💰
//                     </div>
//                     <div>
//                       <div className="text-sm text-muted-foreground">Your Coins</div>
//                       <div className="text-3xl font-bold text-accent">{user.coins}</div>
//                     </div>
//                   </div>
//                   <Button variant="outline" size="sm">
//                     Earn More
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>

//             <Card className="border-2 border-secondary">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-pink-600 flex items-center justify-center text-2xl">
//                       💎
//                     </div>
//                     <div>
//                       <div className="text-sm text-muted-foreground">Your Gems</div>
//                       <div className="text-3xl font-bold text-secondary">{user.gems}</div>
//                     </div>
//                   </div>
//                   <Button variant="outline" size="sm">
//                     Buy Gems
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Shop Tabs */}
//           <Tabs defaultValue="avatars" className="w-full">
//             <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-6">
//               <TabsTrigger value="avatars" className="gap-2">
//                 <Sparkles className="w-4 h-4" />
//                 Avatars
//               </TabsTrigger>
//               <TabsTrigger value="backgrounds" className="gap-2">
//                 <ImageIcon className="w-4 h-4" />
//                 Backgrounds
//               </TabsTrigger>
//               <TabsTrigger value="boosts" className="gap-2">
//                 <Zap className="w-4 h-4" />
//                 Boosts
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="avatars">
//               <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {items.avatars.map((item) => (
//                   <ShopItemCard key={item.id} item={item} onPurchase={() => handlePurchase(item.id, "avatars")} />
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="backgrounds">
//               <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {items.backgrounds.map((item) => (
//                   <ShopItemCard key={item.id} item={item} onPurchase={() => handlePurchase(item.id, "backgrounds")} />
//                 ))}
//               </div>
//             </TabsContent>

//             <TabsContent value="boosts">
//               <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {items.boosts.map((item) => (
//                   <ShopItemCard key={item.id} item={item} onPurchase={() => handlePurchase(item.id, "boosts")} />
//                 ))}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </main>
//     </div>
//   )
// }

// function ShopItemCard({ item, onPurchase }: { item: any; onPurchase: () => void }) {
//   return (
//     <Card className={`border-2 hover:shadow-lg transition-all ${item.owned ? "border-success" : ""}`}>
//       <CardHeader className="pb-3">
//         <div className="flex items-start justify-between mb-2">
//           <Badge className={`${rarityColors[item.rarity as keyof typeof rarityColors]} capitalize`}>
//             {item.rarity}
//           </Badge>
//           {item.owned && <Check className="w-5 h-5 text-success" />}
//         </div>
//       </CardHeader>
//       <CardContent className="space-y-3">
//         {/* Item Preview */}
//         <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center text-4xl">
//           {item.id % 3 === 0 ? "🎨" : item.id % 3 === 1 ? "🎭" : "✨"}
//         </div>

//         {/* Item Name */}
//         <CardTitle className="text-lg">{item.name}</CardTitle>

//         {/* Price & Action */}
//         {item.owned ? (
//           <Button disabled variant="outline" className="w-full bg-transparent">
//             <Check className="w-4 h-4 mr-2" />
//             Owned
//           </Button>
//         ) : (
//           <Button onClick={onPurchase} className="w-full">
//             <ShoppingBag className="w-4 h-4 mr-2" />
//             {item.price} {item.currency === "coins" ? "💰" : "💎"}
//           </Button>
//         )}
//       </CardContent>
//     </Card>
//   )
// }



"use client"

import { useAuth } from "@/lib/auth-context"
import { useNavigation } from "@/lib/navigation-context"
import { Navigation } from "@/components/navigation"
import { TopBar } from "@/components/top-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, Sparkles, Zap, ImageIcon, Check, Star, Crown } from "lucide-react"
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

const rarityConfig = {
  common: { 
    color: "from-gray-400 to-gray-500",
    borderColor: "border-gray-400",
    textColor: "text-gray-700 dark:text-gray-300",
    bgColor: "bg-gray-500"
  },
  rare: { 
    color: "from-blue-400 to-blue-600",
    borderColor: "border-blue-500",
    textColor: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-500"
  },
  epic: { 
    color: "from-purple-400 to-purple-600",
    borderColor: "border-purple-500",
    textColor: "text-purple-700 dark:text-purple-300",
    bgColor: "bg-purple-500"
  },
  legendary: { 
    color: "from-amber-400 via-orange-500 to-amber-600",
    borderColor: "border-amber-500",
    textColor: "text-amber-700 dark:text-amber-300",
    bgColor: "bg-gradient-to-r from-amber-400 to-orange-500"
  },
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      <main className="md:ml-20 xl:ml-64 mt-16 p-6 md:p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-amber-600 via-orange-600 to-pink-600 bg-clip-text text-transparent">
                Shop
              </h1>
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 font-medium">
              Customize your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 font-bold">profile</span> and boost your learning ✨
            </p>
          </div>

          {/* Currency Display */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="relative overflow-hidden border-none shadow-xl bg-white dark:bg-slate-800">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <span className="text-3xl">🪙</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Your Coins</div>
                      <div className="text-3xl font-black text-amber-600 dark:text-amber-400">{user.coins}</div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold shadow-lg hover:shadow-xl transition-all">
                    Earn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-none shadow-xl bg-white dark:bg-slate-800">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500"></div>
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                      <span className="text-3xl">💎</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Your Gems</div>
                      <div className="text-3xl font-black text-purple-600 dark:text-purple-400">{user.gems}</div>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg hover:shadow-xl transition-all">
                    Buy Gems
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Shop Tabs */}
          <Tabs defaultValue="avatars" className="w-full">
            <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 mb-8 h-14 bg-white dark:bg-slate-800 shadow-lg p-1.5">
              <TabsTrigger value="avatars" className="gap-2 text-base font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
                <Sparkles className="w-5 h-5" />
                Avatars
              </TabsTrigger>
              <TabsTrigger value="backgrounds" className="gap-2 text-base font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                <ImageIcon className="w-5 h-5" />
                Backgrounds
              </TabsTrigger>
              <TabsTrigger value="boosts" className="gap-2 text-base font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
                <Zap className="w-5 h-5" />
                Boosts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="avatars">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.avatars.map((item) => (
                  <ShopItemCard key={item.id} item={item} onPurchase={() => handlePurchase(item.id, "avatars")} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="backgrounds">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.backgrounds.map((item) => (
                  <ShopItemCard key={item.id} item={item} onPurchase={() => handlePurchase(item.id, "backgrounds")} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="boosts">
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
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
  const rarity = rarityConfig[item.rarity as keyof typeof rarityConfig]
  
  return (
    <Card className={`relative overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-white dark:bg-slate-800 ${item.owned ? 'ring-2 ring-green-500' : ''}`}>
      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${rarity.color}`}></div>
      
      {item.owned && (
        <div className="absolute top-3 right-3 z-10">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
            <Check className="w-5 h-5 text-white" />
          </div>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge className={`${rarity.bgColor} text-white capitalize font-bold px-3 py-1 shadow-md flex items-center gap-1.5`}>
            {item.rarity === 'legendary' && <Crown className="w-3.5 h-3.5" />}
            {item.rarity === 'epic' && <Star className="w-3.5 h-3.5" />}
            {item.rarity}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Item Preview */}
        <div className={`aspect-square bg-gradient-to-br ${rarity.color} rounded-2xl flex items-center justify-center text-6xl shadow-lg relative overflow-hidden`}>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <span className="relative z-10">
            {item.id % 3 === 0 ? "🎨" : item.id % 3 === 1 ? "🎭" : "✨"}
          </span>
        </div>

        {/* Item Name */}
        <CardTitle className="text-lg font-bold text-center">{item.name}</CardTitle>

        {/* Price & Action */}
        {item.owned ? (
          <Button disabled variant="outline" className="w-full h-12 bg-green-50 dark:bg-green-950 border-2 border-green-500 text-green-700 dark:text-green-300 font-bold">
            <Check className="w-5 h-5 mr-2" />
            Owned
          </Button>
        ) : (
          <Button 
            onClick={onPurchase} 
            className={`w-full h-12 font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
              item.currency === 'coins' 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
            } text-white`}
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            {item.price} {item.currency === "coins" ? "🪙" : "💎"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}