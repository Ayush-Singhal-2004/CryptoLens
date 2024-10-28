import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"  
import DataTable from "../..//components/DataTable";
import { Button } from "@/components/ui/button";
import { IoIosArrowForward } from "react-icons/io";
import ActivityCard from "../ActivityCard";
import { ScrollArea } from "@/components/ui/scroll-area"
import NftCard from "../NFTs/NftCard";

type OverviewPropType = {
    updateTabState: (updatedState: string) => void 
}

function Overview({updateTabState}: OverviewPropType) {
    return (
        <div className="px-4 flex justify-between py-2">
            <div className="w-[49%]">
                <Card className="mb-3 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-xl">
                            <div className="flex justify-between">
                                <h1>Wallet</h1>
                                <h1>$13,868.39</h1>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable />
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button variant={"outline"} className="font-semibold">
                            View all
                            <IoIosArrowForward />
                        </Button>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">
                            <div className="flex justify-between">
                                <h1>NFTs</h1>
                                <h1>$0.27</h1>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 grid-rows-1 justify-items-center" id="overview-nft-grid-container">
                        <div id="overview-grid-container-item">
                            <NftCard />
                        </div>
                        <div id="overview-grid-container-item">
                            <NftCard />
                        </div>
                        <div id="overview-grid-container-item">
                            <NftCard />
                        </div>
                        <div id="overview-grid-container-item">
                            <NftCard />
                        </div>
                        <div id="overview-grid-container-item">
                            <NftCard />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="w-[49%]">
                <Card className="mb-3 shadow-xl">
                    <CardContent className="flex items-center py-4">
                        <h1 className="font-semibold text-xl">Activity</h1>
                    </CardContent>
                </Card>
                <ScrollArea className="h-[120vh] w-full">    
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <div className="flex justify-end px-5">
                        <Button variant={"outline"} className="font-semibold"
                        onClick={() => updateTabState("activity")}>
                            View all
                            <IoIosArrowForward />
                        </Button>
                    </div>
                </ScrollArea>
            </div>
        </div>
    )
}

export default Overview;