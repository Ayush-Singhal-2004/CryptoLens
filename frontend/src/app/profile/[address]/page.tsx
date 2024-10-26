import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Overview from "../Overview"

export default function Profile() {
    return (
        <div>
            <div>
                <div className="border-b dark:border-b-[#262626] mx-4 py-5 flex flex-col gap-3">
                    <img 
                    src="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/706a11ec-2dc9-4f00-e56a-fe8a4973eb00/original" alt="nft" className="h-32 w-32 rounded-2xl" />
                    <h1 className="text-xl font-semibold">lens/savesh371</h1>
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