"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowDown, ArrowUp, DollarSign, TrendingDown, TrendingUp, ArrowRightLeft } from "lucide-react"
import { useEffect, useState } from "react"
import getResponse from "@/app/utils/api"
import { Token } from "@/app/utils/types"
import { useParams } from "next/navigation"


const conversionData = {
  "base_currency_id": "btc-bitcoin",
  "base_currency_name": "Bitcoin",
  "base_price_last_updated": "2024-10-31T11:30:35Z",
  "quote_currency_id": "eth-ethereum",
  "quote_currency_name": "Ethereum",
  "quote_price_last_updated": "2024-10-31T11:30:35Z",
  "amount": 1.2,
  "price": 32.946620167557
}

export default function TokenPage() {
  const params = useParams()
  const [baseAmount, setBaseAmount] = useState(conversionData.amount.toString())
  const [quoteAmount, setQuoteAmount] = useState(conversionData.price.toString())
  const [tokenData,setTokenData]=useState<Token | null>(null);

  const getTokenData = async() => {
    const response = await getResponse(`token/${params.id}`);
    console.log(`token/${params.id}`,response);
    if(response.status == 200 && response.data.data !== "Internal server error") {
        console.log(response.data?.data);
        setTokenData(response.data?.data);
    } else {
        console.error("Failed to fetch coin data");
    }
   }

   useEffect(()=>{
     getTokenData()
   }, [])
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num)
  }

  const formatLargeNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
    return formatNumber(num)
  }

  const renderPercentageChange = (change: number) => {
    const color = change >= 0 ? "text-green-500" : "text-red-500"
    const icon = change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
    return (
      <span className={`flex items-center ${color}`}>
        {icon}
        {Math.abs(change).toFixed(2)}%
      </span>
    )
  }

  const handleBaseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setBaseAmount(value)
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setQuoteAmount((numValue * (conversionData.price / conversionData.amount)).toFixed(6))
    }
  }

  const handleQuoteAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuoteAmount(value)
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      setBaseAmount((numValue / (conversionData.price / conversionData.amount)).toFixed(6))
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen">
         <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <img src={`https://static.coinpaprika.com/coin/${tokenData?.id}/logo.png?height=48&width=48`} alt="Ethereum logo" className="w-12 h-12 mr-4" />
              <div>
                <h1 className="text-3xl font-bold">{tokenData?.name} Price</h1>
                <p className="text-gray-500">{tokenData?.symbol}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-3xl font-bold">${formatNumber(tokenData?.quotes.USD.price?tokenData?.quotes.USD.price:0)}</div>
              <div className="flex items-center">
                {renderPercentageChange(tokenData?.quotes.USD.percent_change_24h?tokenData?.quotes.USD.percent_change_24h:0)}
                <span className="text-gray-500 ml-2">24h</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${formatLargeNumber(tokenData?.quotes.USD.market_cap?tokenData?.quotes.USD.market_cap:0)}</div>
                {renderPercentageChange(tokenData?.quotes.USD.market_cap_change_24h?tokenData?.quotes.USD.market_cap_change_24h:0)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
                <ArrowDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${formatLargeNumber(tokenData?.quotes.USD.volume_24h?tokenData?.quotes.USD.volume_24h:0)}</div>
                {renderPercentageChange(tokenData?.quotes.USD.volume_24h_change_24h?tokenData?.quotes.USD.volume_24h_change_24h:0)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Circulating Supply</CardTitle>
                <ArrowUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatLargeNumber(tokenData?.circulating_supply?tokenData?.circulating_supply:0)} {tokenData?.symbol}</div>
                <div className="text-xs text-muted-foreground">
                  Max Supply: {tokenData?.max_supply === 0 ? "Unlimited" : formatLargeNumber(tokenData?.max_supply?tokenData?.max_supply:0)}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="price_statistics" className="w-full">
            <TabsList>
              <TabsTrigger value="price_statistics">Price Statistics</TabsTrigger>
              <TabsTrigger value="market_statistics">Market Statistics</TabsTrigger>
            </TabsList>
            <TabsContent value="price_statistics">
              <Card>
                <CardContent className="pt-6">
                  <table className="w-full">
                    <tbody>
                      {[
                        { label: "Price Change (24h)", value: renderPercentageChange(tokenData?.quotes.USD.percent_change_24h?tokenData?.quotes.USD.percent_change_24h:0) },
                        { label: "24h Low / 24h High", value: `$${formatNumber(tokenData?.quotes.USD.price?tokenData?.quotes.USD.price:0 * 0.99)} / $${formatNumber(tokenData?.quotes.USD.price?tokenData?.quotes.USD.price:0 * 1.01)}` },
                        { label: "7d Low / 7d High", value: `$${formatNumber(tokenData?.quotes.USD.price?tokenData?.quotes.USD.price:0 * 0.95)} / $${formatNumber(tokenData?.quotes.USD.price?tokenData?.quotes.USD.price:0 * 1.05)}` },
                        { label: "Trading Volume (24h)", value: `$${formatLargeNumber(tokenData?.quotes.USD.volume_24h?tokenData?.quotes.USD.volume_24h:0)}` },
                        { label: "Market Cap Rank", value: `#${tokenData?.rank}` },
                        { label: "Market Cap", value: `$${formatLargeNumber(tokenData?.quotes.USD.market_cap?tokenData?.quotes.USD.market_cap:0)}` },
                        { label: "All-Time High", value: `$${formatNumber(tokenData?.quotes.USD.ath_price?tokenData?.quotes.USD.ath_price:0)} (${new Date(tokenData?.quotes.USD.ath_date?tokenData?.quotes.USD.ath_date:'').toLocaleDateString()})` }
                      ].map((item, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="py-4 text-sm text-gray-500">{item.label}</td>
                          <td className="py-4 text-sm text-right">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="market_statistics">
              <Card>
                <CardContent className="pt-6">
                  <table className="w-full">
                    <tbody>
                      {[
                        { label: "Market Cap", value: `$${formatLargeNumber(tokenData?.quotes.USD.market_cap?tokenData?.quotes.USD.market_cap:0)}` },
                        { label: "24h Trading Volume", value: `$${formatLargeNumber(tokenData?.quotes.USD.volume_24h?tokenData?.quotes.USD.volume_24h:0)}` },
                        { label: "Fully Diluted Valuation", value: "N/A" },
                        { label: "Circulating Supply", value: `${formatLargeNumber(tokenData?.circulating_supply?tokenData?.circulating_supply:0)} ${tokenData?.symbol}` },
                        { label: "Total Supply", value: `${formatLargeNumber(tokenData?.total_supply?tokenData?.total_supply:0)} ${tokenData?.symbol}` },
                        { label: "Max Supply", value: tokenData?.max_supply === 0 ? "Unlimited" : `${formatLargeNumber(tokenData?.max_supply?tokenData?.max_supply:0)} ${tokenData?.symbol}` },
                      ].map((item, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="py-4 text-sm text-gray-500">{item.label}</td>
                          <td className="py-4 text-sm text-right">{item.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:w-80">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Currency Converter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="base-amount">{conversionData.base_currency_name} ({conversionData.base_currency_id.split('-')[1].toUpperCase()})</Label>
                  <Input
                    id="base-amount"
                    type="number"
                    value={baseAmount}
                    onChange={handleBaseAmountChange}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="flex justify-center">
                  <ArrowRightLeft className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quote-amount">{conversionData.quote_currency_name} ({conversionData.quote_currency_id.split('-')[1].toUpperCase()})</Label>
                  <Input
                    id="quote-amount"
                    type="number"
                    value={quoteAmount}
                    onChange={handleQuoteAmountChange}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="text-sm text-gray-500 text-center">
                  1 {conversionData.base_currency_id.split('-')[1].toUpperCase()} = {(conversionData.price / conversionData.amount).toFixed(6)} {conversionData.quote_currency_id.split('-')[1].toUpperCase()}
                </div>
                <div className="text-xs text-gray-400 text-center">
                  Last updated: {new Date(conversionData.quote_price_last_updated).toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
   
  )
}