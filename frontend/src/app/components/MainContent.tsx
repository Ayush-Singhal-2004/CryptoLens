"use client";
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useTheme } from "next-themes";
import { ArrowRightLeft, BarChart3, ChevronLeft, ChevronRight, Layers, PieChart, User } from "lucide-react";
import { TrendingTokens } from "../utils/types";

function MainContent({TopTokens}:{TopTokens:TrendingTokens[] | null}) {
    return (
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
                                {Array.isArray(TopTokens) && TopTokens.slice(0, 6).map((asset) => (
                                    <div key={asset?.name} className="bg-gray-700 p-3 rounded-lg">
                                        <div className="text-sm text-gray-400">{asset?.name}</div>
                                        <div className="text-lg font-semibold">{asset?.price.toLocaleString()}</div>
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
    )
}

export default MainContent;