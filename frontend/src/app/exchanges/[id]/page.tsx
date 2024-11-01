"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Check, ExternalLink, Info, Twitter, TrendingUp, TrendingDown } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import getResponse from "@/app/utils/api"
import { useEffect, useState } from "react"
import { Exchange, Market } from "@/app/utils/types"

export default function ExchangePage() {
  const params = useParams()
  const [exchangeData, setExchangeData] = useState<Exchange | null>(null);
  const [marketData, setMarketData] = useState<Market[] | null>(null);
  const getExchange = async() => {
      const response = await getResponse(`exchange/${params.id}`);
      if(response.status == 200 && response.data.data !== "Internal server error") {
        setExchangeData(response.data?.data);
      } else {
          console.error("Failed to fetch coin data");
      }
  }

  const getMarkets = async() => {
      const response = await getResponse(`exchange/${params.id}/market`);
      if(response.status == 200 && response.data.data !== "Internal server error") {
        setMarketData(response.data?.data);
      } else {
          console.error("Failed to fetch coin data");
      }
  }
  useEffect(()=>{
      getExchange();
      getMarkets();
  },[]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num)
  }

  const formatPercentage = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num / 100)
  }

  const renderTrustScore = (score: string) => {
    let color = "bg-yellow-500"
    if (score === "high") color = "bg-green-500"
    else if (score === "low") color = "bg-red-500"
    return <Badge className={`${color} text-white`}>{score}</Badge>
  }

  return (
    <div className="min-h-screen dark:bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img
                src={`https://static.coinpaprika.com/exchanges/${exchangeData?.id}/logo.png`}
                alt={`${exchangeData?.name} logo`}
                className="rounded-full mr-4 dark:bg-gray-700 p-2 w-40 h-40"
              />
              <div>
                <CardTitle className="text-3xl font-bold text-blue-400">{exchangeData?.name}</CardTitle>
                <CardDescription className="mt-2 max-w-2xl text-gray-400">{exchangeData?.description}</CardDescription>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="text-2xl font-bold mb-2 text-blue-300">Confidence Score</div>
              <Badge className="text-lg px-3 py-1 bg-blue-600 hover:bg-blue-700 transition-colors duration-300" variant="secondary">
                {(exchangeData?.confidence_score?exchangeData?.confidence_score:0 * 10).toFixed(1)} / 10
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <Badge variant={exchangeData?.active ? "default" : "secondary"} className="mr-2 bg-green-600 hover:bg-green-700 transition-colors duration-300">
                  {exchangeData?.active ? "Active" : "Inactive"}
                </Badge>
                <span className="text-sm text-gray-400">Status</span>
              </div>
              <div className="flex items-center">
                {exchangeData?.website_status ? (
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <span className="h-5 w-5 bg-red-500 rounded-full mr-2" />
                )}
                <span className="text-sm text-gray-400">Website Status</span>
              </div>
              <div className="flex items-center">
                {exchangeData?.api_status ? (
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <span className="h-5 w-5 bg-red-500 rounded-full mr-2" />
                )}
                <span className="text-sm text-gray-400">API Status</span>
              </div>
            </div>
            <div className="text-sm text-gray-400 mb-6">
              Last updated: {new Date(exchangeData?.last_updated?exchangeData?.last_updated:"").toLocaleString()}
            </div>
            <div className="flex space-x-4 mb-6">
              {exchangeData?.links.twitter && <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300" asChild>
                <a href={exchangeData?.links.twitter[0]} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </a>
              </Button>}
              {exchangeData?.links.website && <Button variant="outline" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300" asChild>
                <a href={exchangeData?.links.website[0]} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Website
                </a>
              </Button>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="dark:bg-gray-700 hover:dark:bg-gray-600 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-300">Volume (24h)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Reported:</span>
                    <span className="font-bold text-green-400">{formatNumber(exchangeData?.quotes.USD.reported_volume_24h?exchangeData?.quotes.USD.reported_volume_24h:0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Adjusted:</span>
                    <span className="font-bold text-green-400">{formatNumber(exchangeData?.quotes.USD.adjusted_volume_24h?exchangeData?.quotes.USD.adjusted_volume_24h:0)}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-700 hover:dark:bg-gray-600 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-300">Volume (7d)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Reported:</span>
                    <span className="font-bold text-green-400">{formatNumber(exchangeData?.quotes.USD.reported_volume_7d?exchangeData?.quotes.USD.reported_volume_7d:0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Adjusted:</span>
                    <span className="font-bold text-green-400">{formatNumber(exchangeData?.quotes.USD.adjusted_volume_7d?exchangeData?.quotes.USD.adjusted_volume_7d:0)}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-700 hover:dark:bg-gray-600 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-300">Volume (30d)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Reported:</span>
                    <span className="font-bold text-green-400">{formatNumber(exchangeData?.quotes.USD.reported_volume_30d?exchangeData?.quotes.USD.reported_volume_30d:0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Adjusted:</span>
                    <span className="font-bold text-green-400">{formatNumber(exchangeData?.quotes.USD.adjusted_volume_30d?exchangeData?.quotes.USD.adjusted_volume_30d:0)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              <Card className="dark:bg-gray-700 hover:dark:bg-gray-600 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-300">Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Reported:</span>
                    <span className="font-bold text-yellow-400">#{exchangeData?.reported_rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Adjusted:</span>
                    <span className="font-bold text-yellow-400">#{exchangeData?.adjusted_rank}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-700 hover:dark:bg-gray-600 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-300">Markets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">{exchangeData?.markets}</div>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-700 hover:dark:bg-gray-600 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-300">Currencies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">{exchangeData?.currencies}</div>
                </CardContent>
              </Card>
              <Card className="dark:bg-gray-700 hover:dark:bg-gray-600 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-300">Monthly Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">{exchangeData?.sessions_per_month?exchangeData?.sessions_per_month.toLocaleString():0}</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-400">Market Pairs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:dark:bg-gray-700 transition-colors duration-300 border-gray-300">
                  <TableHead className="text-gray-400">Pair</TableHead>
                  <TableHead className="text-gray-400">Category</TableHead>
                  <TableHead className="text-gray-400">Fee Type</TableHead>
                  <TableHead className="text-gray-400">Volume Share</TableHead>
                  <TableHead className="text-gray-400">Volume (24h)</TableHead>
                  <TableHead className="text-gray-400">Price</TableHead>
                  <TableHead className="text-gray-400">Trust Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketData?.map((pair, index) => 
                  <TableRow key={index} className="hover:dark:bg-gray-700 transition-colors duration-300 dark:border-gray-300">
                    <TableCell>
                      <a href={pair.market_url} className="text-blue-400 hover:text-blue-300 transition-colors duration-300">{pair.pair}</a>
                    </TableCell>
                    <TableCell>{pair.category}</TableCell>
                    <TableCell>{pair.fee_type}</TableCell>
                    <TableCell className="flex items-center">
                      {formatPercentage(pair.reported_volume_24h_share)}
                      {pair.reported_volume_24h_share > 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500 ml-2" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 ml-2" />
                      )}
                    </TableCell>
                    <TableCell>{formatNumber(pair.quotes.USD.volume_24h)}</TableCell>
                    <TableCell>{formatNumber(pair.quotes.USD.price)}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {renderTrustScore(pair.trust_score)}
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Trust Score: {pair.trust_score}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}