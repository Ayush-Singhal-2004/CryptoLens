import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Overview from "../Overview";
import { Card, CardContent } from "@/components/ui/card"  
import { Button } from "@/components/ui/button";
import { LuSend } from "react-icons/lu";

export default function Profile() {
    return (
        <div>
            <div>
                <div className="border-b dark:border-b-[#262626] mx-4 py-5 flex justify-between">
                    <div className="flex flex-col gap-3">
                        <img 
                        src="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/706a11ec-2dc9-4f00-e56a-fe8a4973eb00/original" alt="nft" className="h-32 w-32 rounded-2xl" />
                        <h1 className="text-xl font-semibold">lens/savesh371</h1>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                        <Button>
                            Send
                            <LuSend />
                        </Button>
                        <Card className="w-[30vw]">
                            <CardContent className="py-4">
                                <p className="text-lg">Net Worth</p>
                                <h1 className="text-2xl font-semibold">$25,117.03</h1>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div>
                <Tabs defaultValue="overview" className="max-w-screen">
                    <div className="px-4 py-3 border-b dark:border-b-[#262626]">
                        <TabsList>
                            <TabsTrigger value="overview" className="font-semibold text-md">
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="nft" className="font-semibold text-md">
                                NFTs
                            </TabsTrigger>
                            <TabsTrigger value="activity" className="font-semibold text-md">
                                Activity
                            </TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="overview">
                        <Overview />
                    </TabsContent>
                    <TabsContent value="nft">
                        TODO: nft page
                    </TabsContent>
                    <TabsContent value="activity">
                        TODO: activity page
                    </TabsContent>
                </Tabs>
                </div>
            </div>
        </div>
    )
}