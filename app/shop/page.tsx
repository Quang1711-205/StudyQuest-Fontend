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
import TopBar from "@/components/top-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Sparkles, Check, Star, Crown, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { shopAPI, ShopAvatar, ShopBalance } from "@/lib/api-service"
import { toast } from "sonner"
import { PurchaseCelebration } from "@/components/purchase-celebration"

const rarityConfig = {
  common: { 
    color: "from-blue-300 to-blue-400",
    borderColor: "border-blue-400",
    textColor: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-500",
    innerBg: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950"
  },
  rare: { 
    color: "from-indigo-400 to-purple-500",
    borderColor: "border-indigo-500",
    textColor: "text-indigo-700 dark:text-indigo-300",
    bgColor: "bg-indigo-500",
    innerBg: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950"
  },
  epic: { 
    color: "from-purple-400 to-pink-500",
    borderColor: "border-purple-500",
    textColor: "text-purple-700 dark:text-purple-300",
    bgColor: "bg-purple-500",
    innerBg: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950"
  },
  legendary: { 
    color: "from-amber-400 via-orange-500 to-amber-600",
    borderColor: "border-amber-500",
    textColor: "text-amber-700 dark:text-amber-300",
    bgColor: "bg-gradient-to-r from-amber-400 to-orange-500",
    innerBg: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950"
  },
}

export default function ShopPage() {
  const { user, isLoading: authLoading, updateUser } = useAuth()
  const { isOpen, closeNav, toggleNav } = useNavigation()
  const router = useRouter()
  
  const [avatars, setAvatars] = useState<ShopAvatar[]>([])
  const [balance, setBalance] = useState<ShopBalance>({ coins: 0, gems: 0 })
  const [isLoadingData, setIsLoadingData] = useState(true)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [isEquipping, setIsEquipping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedRarity, setSelectedRarity] = useState<string>("all")
  
  // Celebration state
  const [celebrationData, setCelebrationData] = useState<{
    isOpen: boolean
    avatar: {
      id: number
      name: string
      iconUrl: string
      rarity: "common" | "rare" | "epic" | "legendary"
    } | null
  }>({
    isOpen: false,
    avatar: null,
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  // Load shop data
  useEffect(() => {
    if (!user) return

    const loadShopData = async () => {
      setIsLoadingData(true)
      setError(null)
      
      try {
        // Load avatars and balance in parallel
        const [avatarsData, balanceData] = await Promise.all([
          shopAPI.getAvatars(),
          shopAPI.getBalance(),
        ])

        setAvatars(avatarsData)
        setBalance(balanceData)
      } catch (err) {
        console.error("Error loading shop data:", err)
        setError(err instanceof Error ? err.message : "Failed to load shop data")
        toast.error("Failed to load shop", {
          description: "Please try refreshing the page"
        })
      } finally {
        setIsLoadingData(false)
      }
    }

    loadShopData()
  }, [user])

  const handlePurchase = async (avatarId: number) => {
    if (isPurchasing) return

    setIsPurchasing(true)
    try {
      const result = await shopAPI.purchaseAvatar(avatarId)
      
      // Update avatars list - mark as owned
      setAvatars(prev => 
        prev.map(avatar => 
          avatar.id === avatarId 
            ? { ...avatar, owned: true } 
            : avatar
        )
      )

      // Update balance
      setBalance(result.balance)

      // Update user balance in auth context
      if (updateUser) {
        updateUser({
          coins: result.balance.coins,
          gems: result.balance.gems,
        })
      }

      // Show celebration modal
      setCelebrationData({
        isOpen: true,
        avatar: {
          id: result.avatar.id,
          name: result.avatar.name,
          iconUrl: result.avatar.iconUrl,
          rarity: result.avatar.rarity as "common" | "rare" | "epic" | "legendary",
        },
      })
    } catch (err) {
      console.error("Error purchasing avatar:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to purchase avatar"
      toast.error("Purchase failed", {
        description: errorMessage
      })
    } finally {
      setIsPurchasing(false)
    }
  }

  const handleEquip = async (avatarId: number) => {
    if (isEquipping) return

    setIsEquipping(true)
    try {
      const result = await shopAPI.equipAvatar(avatarId)
      
      // Update avatars list - update equipped status
      setAvatars(prev => 
        prev.map(avatar => ({
          ...avatar,
          equipped: avatar.id === avatarId
        }))
      )

      toast.success("Avatar equipped!", {
        description: `${result.avatar.name} is now your active avatar`
      })
    } catch (err) {
      console.error("Error equipping avatar:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to equip avatar"
      toast.error("Equip failed", {
        description: errorMessage
      })
    } finally {
      setIsEquipping(false)
    }
  }

  const handleCloseCelebration = () => {
    setCelebrationData({
      isOpen: false,
      avatar: null,
    })
  }

  // Filter avatars by rarity
  const filteredAvatars = selectedRarity === "all" 
    ? avatars 
    : avatars.filter(avatar => avatar.rarity === selectedRarity)

  // Loading state
  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navigation isOpen={isOpen} onClose={closeNav} />
      <TopBar onMenuClick={toggleNav} />

      <main className="md:ml-20 xl:ml-64 mt-16 p-4 md:p-6 lg:p-8 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-10 text-center">
            <div className="inline-flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <div className="w-8 h-8 md:w-11 md:h-11 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-pink-600 bg-clip-text text-transparent tracking-tight">
                Avatar Shop
              </h1>
              <div className="w-8 h-8 md:w-11 md:h-11 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
            <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 font-medium px-4">
              Customize your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 font-semibold">profile</span> with unique avatars ✨
            </p>
          </div>

          {/* Currency Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10">
            <Card className="relative overflow-hidden border-none shadow-xl bg-white dark:bg-slate-800">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
              <CardContent className="pt-4 pb-4 md:pt-6 md:pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                      <span className="text-2xl md:text-3xl">🪙</span>
                    </div>
                    <div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Your Coins</div>
                      <div className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400">
                        {balance.coins}
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => router.push("/practice")}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-xs md:text-sm px-3 md:px-4 h-9 md:h-10"
                  >
                    Earn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-none shadow-xl bg-white dark:bg-slate-800">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500"></div>
              <CardContent className="pt-4 pb-4 md:pt-6 md:pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                      <span className="text-2xl md:text-3xl">💎</span>
                    </div>
                    <div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">Your Gems</div>
                      <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">
                        {balance.gems}
                      </div>
                    </div>
                  </div>
                  <Button 
                    disabled
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-xs md:text-sm px-3 md:px-4 h-9 md:h-10"
                  >
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rarity Filter */}
          <div className="mb-6 md:mb-8">
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
              <Button
                onClick={() => setSelectedRarity("all")}
                className={`font-semibold text-sm md:text-base px-5 md:px-6 h-10 md:h-11 shadow-lg transition-all ${
                  selectedRarity === "all" 
                    ? "bg-gradient-to-r from-slate-700 to-slate-900 text-white hover:from-slate-800 hover:to-black scale-105" 
                    : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 border-2 border-slate-300 dark:border-slate-600"
                }`}
              >
                All
              </Button>
              <Button
                onClick={() => setSelectedRarity("common")}
                className={`font-semibold text-sm md:text-base px-5 md:px-6 h-10 md:h-11 shadow-lg transition-all ${
                  selectedRarity === "common" 
                    ? "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 scale-105" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 border-2 border-gray-300 dark:border-gray-600"
                }`}
              >
                Common
              </Button>
              <Button
                onClick={() => setSelectedRarity("rare")}
                className={`font-semibold text-sm md:text-base px-5 md:px-6 h-10 md:h-11 shadow-lg transition-all ${
                  selectedRarity === "rare" 
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 scale-105" 
                    : "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 border-2 border-blue-400 dark:border-blue-500"
                }`}
              >
                Rare
              </Button>
              <Button
                onClick={() => setSelectedRarity("epic")}
                className={`font-semibold text-sm md:text-base px-5 md:px-6 h-10 md:h-11 shadow-lg transition-all ${
                  selectedRarity === "epic" 
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 scale-105" 
                    : "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 border-2 border-purple-400 dark:border-purple-500"
                }`}
              >
                <Star className="w-4 h-4 md:w-4.5 md:h-4.5 mr-1.5" />
                Epic
              </Button>
              <Button
                onClick={() => setSelectedRarity("legendary")}
                className={`font-semibold text-sm md:text-base px-5 md:px-6 h-10 md:h-11 shadow-lg transition-all ${
                  selectedRarity === "legendary" 
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 scale-105" 
                    : "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800 border-2 border-amber-400 dark:border-amber-500"
                }`}
              >
                <Crown className="w-4 h-4 md:w-4.5 md:h-4.5 mr-1.5" />
                Legendary
              </Button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <Card className="mb-8 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950">
              <CardContent className="pt-6 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                <div>
                  <p className="font-semibold text-red-900 dark:text-red-100">Failed to load shop</p>
                  <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                </div>
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="ml-auto"
                >
                  Retry
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Avatars Grid */}
          {isLoadingData ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Loading avatars...</p>
              </div>
            </div>
          ) : filteredAvatars.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <p className="text-muted-foreground font-medium">
                  {selectedRarity === "all" 
                    ? "No avatars available at the moment." 
                    : `No ${selectedRarity} avatars available.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
              {filteredAvatars.map((avatar) => (
                <ShopItemCard 
                  key={avatar.id} 
                  item={avatar} 
                  onPurchase={() => handlePurchase(avatar.id)}
                  onEquip={() => handleEquip(avatar.id)}
                  isPurchasing={isPurchasing}
                  isEquipping={isEquipping}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Celebration Modal */}
      <PurchaseCelebration
        isOpen={celebrationData.isOpen}
        onClose={handleCloseCelebration}
        avatar={celebrationData.avatar}
      />
    </div>
  )
}

interface ShopItemCardProps {
  item: ShopAvatar
  onPurchase: () => void
  onEquip: () => void
  isPurchasing: boolean
  isEquipping: boolean
}

function ShopItemCard({ item, onPurchase, onEquip, isPurchasing, isEquipping }: ShopItemCardProps) {
  const rarity = rarityConfig[item.rarity]
  const price = item.priceCoins || item.priceGems || 0
  const currency = item.priceCoins ? 'coins' : 'gems'
  
  return (
    <Card className={`relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-white dark:bg-slate-800 ${
      item.equipped ? 'ring-2 ring-green-500' : item.owned ? 'ring-2 ring-blue-500' : ''
    }`}>
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${rarity.color}`}></div>
      
      {item.equipped && (
        <div className="absolute top-2 right-2 z-10">
          <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
            <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
          </div>
        </div>
      )}
      
      <CardHeader className="pb-2 pt-3 md:pt-4 px-3 md:px-4">
        <div className="flex items-start justify-between mb-1">
          <Badge className={`${rarity.bgColor} text-white capitalize font-semibold px-2 py-0.5 md:px-2.5 md:py-0.5 shadow-md flex items-center gap-1 text-xs`}>
            {item.rarity === 'legendary' && <Crown className="w-3 h-3" />}
            {item.rarity === 'epic' && <Star className="w-3 h-3" />}
            {item.rarity}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-2 md:space-y-3 px-3 md:px-4 pb-3 md:pb-4">
        {/* Item Preview */}
        <div className={`aspect-square ${rarity.innerBg} rounded-xl flex items-center justify-center shadow-md relative overflow-hidden p-3 md:p-4`}>
          {item.iconUrl ? (
            <img 
              src={item.iconUrl} 
              alt={item.name}
              className="w-full h-full object-contain relative z-10"
            />
          ) : (
            <span className="relative z-10 text-4xl md:text-5xl">
              {item.id % 3 === 0 ? "🎨" : item.id % 3 === 1 ? "🎭" : "✨"}
            </span>
          )}
        </div>

        {/* Item Name */}
        {/* Item Name */}
        <div>
          <CardTitle className="text-sm md:text-base font-semibold text-center mb-0.5 line-clamp-1 text-slate-800 dark:text-white">
            {item.name}
          </CardTitle>
          {/* {item.description && (
            <p className="text-xs text-gray-600 dark:text-gray-300 text-center line-clamp-2 hidden md:block leading-tight">
              {item.description}
            </p>
          )} */}
        </div>


        {/* Price & Action */}
        {item.equipped ? (
          <Button 
            disabled 
            variant="outline" 
            className="w-full h-9 md:h-10 bg-green-50 dark:bg-green-950 border-2 border-green-500 text-green-700 dark:text-green-300 font-semibold text-xs md:text-sm"
          >
            <Check className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5" />
            Equipped
          </Button>
        ) : item.owned ? (
          <Button 
            onClick={onEquip}
            disabled={isEquipping}
            className="w-full h-9 md:h-10 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white text-xs md:text-sm"
          >
            {isEquipping ? (
              <>
                <div className="animate-spin w-3.5 h-3.5 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full mr-1.5" />
                <span className="hidden md:inline">Equipping...</span>
                <span className="md:hidden">...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5" />
                Equip
              </>
            )}
          </Button>
        ) : (
          <Button 
            onClick={onPurchase}
            disabled={isPurchasing}
            className={`w-full h-9 md:h-10 font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 ${
              currency === 'coins' 
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
            } text-white text-xs md:text-sm`}
          >
            {isPurchasing ? (
              <>
                <div className="animate-spin w-3.5 h-3.5 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full mr-1.5" />
                <span className="hidden md:inline">Purchasing...</span>
                <span className="md:hidden">...</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5" />
                {price} {currency === "coins" ? "🪙" : "💎"}
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}