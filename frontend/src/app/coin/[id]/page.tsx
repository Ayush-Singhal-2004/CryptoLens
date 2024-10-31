"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowDown,
  ArrowUp,
  Bitcoin,
  CircleDollarSign,
  Clock,
  Code2,
  ExternalLink,
  Facebook,
  Github,
  Globe,
  Lock,
  MessageSquare,
  Shield,
  TrendingUp,
  Wallet,
  Youtube,
  Twitter,
  X,
  RssIcon,
  Megaphone
} from "lucide-react"
import { useEffect, useState } from "react"
import getResponse from "@/app/utils/api"
import { useParams } from "next/navigation"
import {Coin,Token} from "../../utils/types"
import Image from "next/image"
// Utility functions remain the same
function formatNumber(num: number, style: 'currency' | 'decimal' = 'decimal', minimumFractionDigits = 2) {
  const formatter = new Intl.NumberFormat('en-US', {
    style,
    currency: 'USD',
    minimumFractionDigits,
    maximumFractionDigits: style === 'currency' ? 2 : 8,
  })
  return formatter.format(num)
}

function formatPercentage(value: number) {
  const formatted = Math.abs(value).toFixed(2)
  return (
    <div className={`flex items-center gap-1 ${value >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
      {value >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
      {formatted}%
    </div>
  )
}

export default function Component() {
    const params = useParams()
    const [Coin, setCoin] =useState<Coin | null>(null);
    const [Token, setToken] =useState<Token | null>(null);
    const getCoin = async() => {
        const response = await getResponse(`coin/${params.id}`);
        console.log(response);
        if(response.status == 200 && response.data.data !== "Internal server error") {
            console.log(response.data?.data);
            setCoin(response.data?.data);
        } else {
            console.error("Failed to fetch coin data");
        }
    }
    const getToken = async() => {
      const response = await getResponse(`token/${params.id}`);
      console.log(`token/${params.id}`,response);
      if(response.status == 200 && response.data.data !== "Internal server error") {
          console.log(response.data?.data);
          setToken(response.data?.data);
      } else {
          console.error("Failed to fetch coin data");
      }
  }
  useEffect(()=>{
    const fetchData = async () => {
      await getCoin();  // Fetch coin data
      await getToken(); // Fetch token data
  };

  fetchData();
  },[params.id]);
    const LinkTypes={
        "website":  Globe,
        "source_code":Github,
        "facebook":Facebook,
        "youtube":Youtube,
        "twitter":Twitter,
        "wallet":Wallet,
        "explorer":Globe,
        "message_board":MessageSquare,
        "reddit":X,
        "blog":RssIcon,
        "chat":MessageSquare,
        "announcement":Megaphone

    }
 
  const timeframes = [
    { label: "24h", value: Token?.quotes?.USD?.percent_change_24h },
    { label: "7d", value: Token?.quotes?.USD?.percent_change_7d },
    { label: "30d", value: Token?.quotes?.USD?.percent_change_30d },
    { label: "1y", value: Token?.quotes?.USD?.percent_change_1y },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="p-4 space-y-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
            <div className="flex-shrink-0">
              {Coin?.logo && <Image
                src={Coin.logo}
                alt={`${Coin.name} Logo`}
                width={128}
                height={128}
              />}
            </div>
            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold dark:text-white">{Coin?.name}</h1>
                  <Badge variant="outline" className="text-sm">
                    {Coin?.symbol}
                  </Badge>
                  <Badge variant="secondary" className="text-sm">
                    Rank #{Coin?.rank}
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground dark:text-gray-400">
                  {Coin?.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {Coin?.tags.map((tag) => (
                  <Badge key={tag.id} variant="secondary" className=" text-xl dark:bg-gray-800 dark:text-gray-200">
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Price Overview */}
          <Card className="border-2 mb-6 ">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <Bitcoin className="w-8 h-8 text-orange-500" />
                <div>
                  <CardTitle className="text-2xl dark:text-white">Current Price</CardTitle>
                  <CardDescription className="dark:text-gray-400">Live Bitcoin Price</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div>
                  <p className="text-4xl font-bold dark:text-white">
                    {formatNumber(Token?.quotes?.USD.price ?? 0, 'currency')}
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    24h Change: {formatPercentage(Token?.quotes?.USD?.percent_change_24h ?? 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Changes Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {timeframes.map((timeframe) => (
              <Card key={timeframe.label}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground dark:text-gray-400">
                    {timeframe.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold dark:text-white">
                    {formatPercentage(timeframe.value ?? 0)}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="market" className="space-y-4">
            <TabsList className="dark:bg-[#1a1a1a]">
              <TabsTrigger value="market">Market Data</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="links">Links & Resources</TabsTrigger>
            </TabsList>

            <TabsContent value="market" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Card >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <CircleDollarSign className="w-5 h-5" />
                      Market Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">Market Cap</p>
                        <p className="text-lg font-semibold dark:text-white">
                          {formatNumber(Token?.quotes.USD.market_cap ?? 0, 'currency', 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">24h Volume</p>
                        <p className="text-lg font-semibold dark:text-white">
                          {formatNumber(Token?.quotes.USD.volume_24h ?? 0, 'currency', 0)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <Wallet className="w-5 h-5" />
                      Supply Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">Circulating Supply</p>
                        <p className="text-lg font-semibold dark:text-white">
                          {formatNumber(Token?.circulating_supply ?? 0, 'decimal', 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">Max Supply</p>
                        <p className="text-lg font-semibold dark:text-white">
                          {formatNumber(Token?.max_supply ?? 0, 'decimal', 0)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2 ">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-white">
                      <TrendingUp className="w-5 h-5" />
                      All-Time High
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">ATH Price</p>
                        <p className="text-lg font-semibold dark:text-white">
                          {formatNumber(Token?.quotes?.USD.ath_price ?? 0, 'currency')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">Distance from ATH</p>
                        <p className="text-lg font-semibold dark:text-white">
                          {formatPercentage(Token?.quotes?.USD.percent_from_price_ath ?? 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">ATH Date</p>
                        <p className="text-lg font-semibold flex items-center gap-2 dark:text-white">
                          <Clock className="w-4 h-4" />
                          {new Date(Token?.quotes?.USD.ath_date ?? 0).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="team">
              <Card >
                <CardHeader>
                  <CardTitle className="dark:text-white">Core Team</CardTitle>
                  <CardDescription className="dark:text-gray-400">Key people behind Bitcoin development</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  {Coin?.team.map((member) => (
                    <div key={member.name} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary dark:bg-gray-800 flex items-center justify-center">
                        <Shield className="w-5 h-5 dark:text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium dark:text-white">{member.name}</h3>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">{member.position}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="links">
              <Card >
                <CardHeader>
                  <CardTitle className="dark:text-white">Important Links</CardTitle>
                  <CardDescription className="dark:text-gray-400">Official resources and community links</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Coin?.links_extended.map((link) => {
                    const LinkIcon = LinkTypes[link.type as keyof typeof LinkTypes];
                    return (
                      <Button key={link.url} variant="outline" className="justify-start gap-2 dark:border-[#262626] dark:bg-[#1a1a1a] dark:text-white dark:hover:bg-[#262626]">
                        {LinkIcon && <LinkIcon className="w-4 h-4" />}
                        {link.type}
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </Button>
                    );
                  })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}