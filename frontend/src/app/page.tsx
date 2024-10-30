"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Wallet, ArrowRightLeft, PieChart, Github, Twitter, ChevronRight, ChevronLeft, User, Layers } from "lucide-react"
import { ScrollArea } from "@radix-ui/react-scroll-area"

const mockTopTokens = [
    { name: "Bitcoin", symbol: "BTC", price: 45000, change: 2.5 },
    { name: "Ethereum", symbol: "ETH", price: 3200, change: 1.8 },
    { name: "Binance Coin", symbol: "BNB", price: 420, change: -0.5 },
    { name: "Cardano", symbol: "ADA", price: 1.2, change: 3.2 },
    { name: "Solana", symbol: "SOL", price: 150, change: 5.7 },
  ]
  
  const chains = [
    { name: "Ethereum", icon: "🔷" },
    { name: "Binance Smart Chain", icon: "🟨" },
    { name: "Polygon", icon: "🟣" },
  ]

export default function Home() {
    const [leftSidebarOpen, setLeftSidebarOpen] = React.useState(false)
    const [rightSidebarOpen, setRightSidebarOpen] = React.useState(false)
  return (
    <>
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
{/* Left Sidebar */}
<aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#1f2937e2] transform ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out`}>
 <div className="flex items-center justify-between p-4 border-b border-gray-700">
   <h2 className="text-xl font-bold">0v.dev</h2>
   <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setLeftSidebarOpen(false)}>
     <ChevronLeft className="h-6 w-6" />
   </Button>
 </div>
 <nav className="p-4">
   {[
     // { icon: <Home className="h-5 w-5" />, label: "Home" },
     { icon: <User className="h-5 w-5" />, label: "My Profile" },
     // { icon: <Image className="h-5 w-5" />, label: "NFTs" },
     { icon: <Layers className="h-5 w-5" />, label: "Tokens" },
   ].map((item, index) => (
     <Button key={index} variant="ghost" className="w-full justify-start mb-2">
       {item.icon}
       <span className="ml-2">{item.label}</span>
     </Button>
   ))}
 </nav>
 <div className="p-4 border-t border-gray-700">
   <h3 className="text-sm font-semibold mb-2">Supported Chains</h3>
   {chains.map((chain, index) => (
     <Button key={index} variant="ghost" className="w-full justify-start mb-2">
       <span className="text-2xl mr-2">{chain.icon}</span>
       <span>{chain.name}</span>
     </Button>
   ))}
 </div>
</aside>

<main className="flex-1 p-4 md:p-8">
<section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
 <div className="text-center">
   <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-transparent bg-clip-text mb-6">
     Track, Manage, and Maximize Your Web3 Portfolio
   </h1>
   <p className="text-xl text-gray-400 mb-8">
     Your all-in-one solution for navigating the decentralized finance landscape
   </p>
   <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-200 ease-in-out transform hover:scale-105">
     Connect Wallet
   </Button>
 </div>
 <div className="mt-12 flex justify-center">
   <div className="relative w-full max-w-2xl">
     <div className="absolute inset-0 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 rounded-lg filter blur-3xl opacity-30"></div>
     <Card className="relative bg-gray-800 border-gray-700">
       <CardHeader>
         <CardTitle>Portfolio Overview</CardTitle>
         <CardDescription>Your assets across chains and protocols</CardDescription>
       </CardHeader>
       <CardContent>
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
           {[
             { name: "Ethereum", value: "$5,234.56", change: "+2.3%" },
             { name: "Polygon", value: "$1,234.56", change: "-0.5%" },
             { name: "Solana", value: "$987.65", change: "+5.1%" },
             { name: "Avalanche", value: "$432.10", change: "+1.2%" },
             { name: "Arbitrum", value: "$765.43", change: "-1.8%" },
             { name: "Optimism", value: "$321.09", change: "+3.7%" },
           ].map((asset) => (
             <div key={asset.name} className="bg-gray-700 p-3 rounded-lg">
               <div className="text-sm text-gray-400">{asset.name}</div>
               <div className="text-lg font-semibold">{asset.value}</div>
               <div className={asset.change.startsWith("+") ? "text-green-400" : "text-red-400"}>
                 {asset.change}
               </div>
             </div>
           ))}
         </div>
       </CardContent>
     </Card>
   </div>
 </div>
</section>

{/* Feature Highlights */}
<section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
 <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Web3 Enthusiasts</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
   {[
     {
       title: "Portfolio Tracking",
       description: "Real-time updates and insights on your digital assets across multiple chains.",
       icon: <PieChart className="w-10 h-10 text-teal-400" />,
     },
     {
       title: "Advanced Analytics",
       description: "Deep dive into your portfolio performance with comprehensive charts and metrics.",
       icon: <BarChart3 className="w-10 h-10 text-blue-400" />,
     },
     {
       title: "Cross-Chain Swaps",
       description: "Seamlessly swap assets across different blockchain networks with ease.",
       icon: <ArrowRightLeft className="w-10 h-10 text-purple-400" />,
     },
   ].map((feature, index) => (
     <Card key={index} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-200 ease-in-out">
       <CardHeader>
         <div className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mb-4">
           {feature.icon}
         </div>
         <CardTitle>{feature.title}</CardTitle>
       </CardHeader>
       <CardContent>
         <p className="text-gray-400">{feature.description}</p>
       </CardContent>
     </Card>
   ))}
 </div>
</section>
</main>
{/* Hero Section */}
<aside className={`fixed md:static inset-y-0 right-0 z-50 bg-[#1f2937e2] w-64 transform ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out`}>
 <div className="flex items-center justify-between p-4 border-b border-gray-700">
   <h2 className="text-xl font-bold">Top Tokens</h2>
   <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setRightSidebarOpen(false)}>
     <ChevronRight className="h-6 w-6" />
   </Button>
 </div>
 <ScrollArea className="h-[calc(100vh-5rem)]">
   <div className="p-4">
     {mockTopTokens.map((token, index) => (
       <div key={index} className="flex justify-between items-center mb-4">
         <div className="flex items-center">
           <span className="text-2xl mr-2">{token.symbol.slice(0, 1)}</span>
           <span>{token.name}</span>
         </div>
         <div className="text-right">
           <div>${token.price.toLocaleString()}</div>
           <div className={token.change >= 0 ? 'text-green-400' : 'text-red-400'}>
             {token.change}%
           </div>
         </div>
       </div>
     ))}
   </div>
 </ScrollArea>
</aside>
</div>
<div>
 {/* Footer */}
<footer className="border-t border-gray-800 bg-gray-900 py-8">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   <div className="flex flex-col md:flex-row justify-between items-center">
     <div className="text-gray-400 mb-4 md:mb-0">
       © 2024 0v.dev. All rights reserved.
     </div>
     <div className="flex space-x-6">
       <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
         Terms
       </a>
       <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
         Privacy
       </a>
       <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
         <Github className="w-6 h-6" />
       </a>
       <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
         <Twitter className="w-6 h-6" />
       </a>
     </div>
   </div>
 </div>
</footer>
</div>
    </>
    
  )
}