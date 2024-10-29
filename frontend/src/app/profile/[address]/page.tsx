"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Overview from "../Overview/Overview";
import { Card, CardContent } from "@/components/ui/card"  
import { Button } from "@/components/ui/button";
import { LuSend } from "react-icons/lu";
import NftCard from "../NFTs/NftCard";
import Activity from "../Activity/Activity";
import { useState } from "react";
import TransactionTable from "../Wallet/TransactionTable";
import { FaChevronUp } from "react-icons/fa";

export default function Profile() {

    const [tabState, setTabState] = useState("overview");

    const updateTabState = (updatedState: string) => {
        setTabState(updatedState)
    }

    const scrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="overflow-x-hidden">
            <div>
                <div className="border-b dark:border-b-[#262626] mx-4 py-5 flex justify-between max-sm:flex-col max-sm:gap-5">
                    <div className="flex flex-col gap-3">
                        <img 
                        src="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/706a11ec-2dc9-4f00-e56a-fe8a4973eb00/original" alt="nft" className="h-32 w-32 rounded-2xl" />
                        <h1 className="text-xl font-semibold">lens/savesh371</h1>
                    </div>
                    <div className="flex items-end">
                        {/* <Button>
                            Send
                            <LuSend />
                        </Button> */}
                        <Card className="w-[30vw] max-sm:w-[80vw]">
                            <CardContent className="py-4">
                                <p className="text-lg">Net Worth</p>
                                <h1 className="text-2xl font-semibold">$25,117.03</h1>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div>
                <Tabs value={tabState} className="max-w-screen">
                    <div className="px-4 py-3 border-b dark:border-b-[#262626]">
                        <TabsList className="max-sm:flex">
                            <TabsTrigger value="overview" className="font-semibold text-md max-sm:flex-1" onClick={() => setTabState("overview")}>
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="nft" className="font-semibold text-md
                            max-sm:flex-1"
                            onClick={() => setTabState("nft")}>
                                NFTs
                            </TabsTrigger>
                            <TabsTrigger value="activity" className="font-semibold text-md max-sm:flex-1" onClick={() => setTabState("activity")}>
                                Activity
                            </TabsTrigger>
                            <TabsTrigger value="wallet" className="font-semibold text-md max-sm:flex-1" onClick={() => setTabState("wallet")}>
                                Wallet
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="overview">
                        <Overview updateTabState={updateTabState} />
                    </TabsContent>
                    <TabsContent value="nft" className="relative">
                        <div className="grid grid-cols-4 max-sm:grid-cols-1 justify-items-center gap-y-5 py-5">
                            <NftCard />
                            <NftCard />
                            <NftCard />
                            <NftCard />
                            <NftCard />
                        </div>
                        <div className="md:hidden bg-[#8065dfe7] fixed rounded-full p-2 right-6 bottom-6" onClick={scrollUp}>
                            <FaChevronUp />
                        </div>
                    </TabsContent>
                    <TabsContent value="activity">
                        <Activity />
                    </TabsContent>
                    <TabsContent value="wallet">
                        <TransactionTable />
                    </TabsContent>
                </Tabs>
                </div>
            </div>
        </div>
    )
}