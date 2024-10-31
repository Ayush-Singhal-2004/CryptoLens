"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Overview from "../Overview/Overview";
import { Card, CardContent } from "@/components/ui/card"  
import NftCard from "../NFTs/NftCard";
import Activity from "../Activity/Activity";
import TransactionTable from "../Wallet/TransactionTable";
import { FaChevronUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import isValidAddress from "@/app/utils/checkAddress";
import { useParams } from "next/navigation";
import getResponse from "@/app/utils/api";
import { NFT, WalletToken } from "@/app/utils/types";

export default function Profile() {

    const [tabState, setTabState] = useState("overview");
    
    const address = useParams()?.address;
    console.log(address);
    
    const [tokens, setTokens] = useState<[WalletToken] | null>(null);
    const [nfts, setNfts] = useState<[NFT] | null>(null);

    const updateTabState = (updatedState: string) => {
        setTabState(updatedState)
    }

    const scrollUp = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        const getTokens = async() => {
            if(isValidAddress(address as string)) {
                const response = await getResponse(`tokens/${address}`);
                console.log(response);
                if(response.status == 200 && response.data.data !== "Internal server error") {
                    console.log(response.data?.data);
                    setTokens(response.data?.data);
                }
            }
            else {
                //TODO
            }
        }
        getTokens();
    }, [address]);

    useEffect(() => {
        const getNfts = async() => {
            if(isValidAddress(address as string)) {
                const response = await getResponse(`nfts/${address}`);
                console.log(response);
                if(response.status == 200 && typeof response.data.data !== "string") {
                    console.log(response.data.data.items);
                    setNfts(response.data.data.items);
                }
            }
            else {
                //TODO
            }
        }
        getNfts();
    }, [address])

    console.log(nfts);

    return (
        <div className="overflow-x-hidden dark:bg-[#111827]">
            <div>
                <div className="border-b dark:border-b-[#262626] mx-4 py-5 flex justify-between items-end max-sm:flex-col max-sm:gap-5">
                    <div className="flex flex-col items-start gap-[5vh]">
                        <h1 className="text-2xl font-semibold">
                            {address}
                        </h1>
                    </div>
                    <div className="flex items-end">
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
                        <Overview 
                        updateTabState={updateTabState} 
                        tokens={tokens}
                        nfts={nfts}
                        />
                    </TabsContent>
                    <TabsContent value="nft" className="relative">
                        <div className="grid grid-cols-4 max-sm:grid-cols-1 justify-items-center gap-y-5 py-5 h-[70vh]">
                            {
                                nfts != null && nfts.map((nft, index) => (
                                   <div key={index}>
                                            <NftCard 
                                            image_url={nft.image_url}
                                            name={nft.metadata.name}
                                            value={nft.value}
                                            />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="md:hidden bg-[#8065dfe7] fixed rounded-full p-2 right-6 bottom-6" onClick={scrollUp}>
                            <FaChevronUp />
                        </div>
                    </TabsContent>
                    <TabsContent value="activity">
                        <Activity />
                    </TabsContent>
                    <TabsContent value="wallet">
                        <TransactionTable tokens={tokens} />
                    </TabsContent>
                </Tabs>
                </div>
            </div>
        </div>
    )
}