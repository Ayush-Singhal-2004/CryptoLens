"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Twitter, AlertCircle, Check, X, Coins, BarChart2, TrendingUp, DollarSign, Award } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import getResponse from "../utils/api"
import { Exchange } from "../utils/types"
import LeftSidebar from "../components/Leftsidebar"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ExchangeList() {
    const { toast } = useToast();
    const [exchanges, setExchanges] = useState<[Exchange]>([]);

    useEffect(() => {
      let exchanges = localStorage.getItem("exchanges");
      if(exchanges) {
            exchanges = JSON.parse(exchanges);
            setExchanges(exchanges as any);
      }
      else setExchanges([]);
    }, []);

    const getExchanges = async() => {
        const response = await getResponse("exchanges");
        if(response.status == 200 && response.data.data !== "Internal server error") {
            // console.log(response.data?.data);
            // console.log(response.data.data.links)
            localStorage.setItem("exchanges", JSON.stringify(response.data?.data));
            setExchanges(response.data?.data);
        } else {
            console.error("Failed to fetch coin data");
        }
    }
    useEffect(()=>{
        getExchanges();
    },[]);

    const updateToast = (title: string, description: string) => {
      toast({
          title: title,
          description: description
      })
  }

  console.log("EXCHANGE");
  console.log(exchanges);
  
  
    return (
        <div className="dark:bg-gray-900 flex min-h-screen">
            <div >
                <LeftSidebar updateToast={updateToast} />
            </div>
            <Toaster />
            <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6">Cryptocurrency Exchanges</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exchanges.map((exchange) => (
              <Card key={exchange.id} className="shadow-xl transition-shadow duration-300 ">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <img
                      src={`https://static.coinpaprika.com/exchanges/${exchange.id}/logo.png`}
                      alt={`${exchange.name} logo`}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex-grow">
                      <CardTitle className="flex items-center justify-between">
                        {exchange.name}
                        <Badge variant={exchange.active ? "default" : "secondary"} className="ml-2">
                          {exchange.active ? "Active" : "Inactive"}
                        </Badge>
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-2 bg-primary/10 rounded-lg">
                      <Coins className="h-6 w-6 text-primary mb-1" />
                      <span className="text-sm font-medium">Currencies</span>
                      <span className="text-2xl font-bold">{exchange.currencies}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-primary/10 rounded-lg">
                      <BarChart2 className="h-6 w-6 text-secondary mb-1" />
                      <span className="text-sm font-medium">Markets</span>
                      <span className="text-2xl font-bold">{exchange.markets}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-primary/10 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-accent mb-1" />
                      <span className="text-sm font-medium">Monthly Sessions</span>
                      <span className="text-2xl font-bold">{(exchange.sessions_per_month?exchange.sessions_per_month:0 / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-green-500/10 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-500 mb-1" />
                      <span className="text-sm font-medium">24h Volume</span>
                      <span className="text-2xl font-bold">${(exchange.quotes.USD.adjusted_volume_24h / 1000000).toFixed(1)}M</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-center space-x-2 bg-yellow-500/10 p-2 rounded-lg">
                    <Award className="h-6 w-6 text-yellow-500" />
                    <span className="text-sm font-medium">Rank:</span>
                    <span className="text-2xl font-bold">{exchange.adjusted_rank || "N/A"}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-center space-x-4">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {exchange.website_status ? (
                            <Check className="h-6 w-6 text-green-500" />
                          ) : (
                            <AlertCircle className="h-6 w-6 text-red-500" />
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          Website Status: {exchange.website_status ? "Up" : "Down"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {exchange.api_status ? (
                            <Check className="h-6 w-6 text-green-500" />
                          ) : (
                            <AlertCircle className="h-6 w-6 text-red-500" />
                          )}
                        </TooltipTrigger>
                        <TooltipContent>
                          API Status: {exchange.api_status ? "Up" : "Down"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    {
                      exchange.links?.twitter && 
                      <Button variant="outline" size="icon" asChild>
                        <a href={exchange.links.twitter[0]} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                          <span className="sr-only">Twitter</span>
                        </a>
                      </Button>
                    }
                    {
                      exchange.links?.website && 
                      <Button variant="outline" size="icon" asChild>
                        <a href={exchange.links.website[0]} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Website</span>
                        </a>
                      </Button>
                    }
                  </div>
                  <Button variant="secondary">More Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        </div>
      )
}