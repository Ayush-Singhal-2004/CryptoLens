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
import { useEffect, useState } from "react";
import getResponse from "@/app/utils/api";
import { useParams } from "next/navigation";
import isValidAddress from "@/app/utils/checkAddress";

type OverviewPropType = {
    updateTabState: (updatedState: string) => void 
}

function Overview({updateTabState}: OverviewPropType) {

    const address = useParams()?.address;
    console.log(address);

    const [tokens, setTokens] = useState<[any] | null>(null);

    useEffect(() => {
        const getTokens = async() => {
            if(isValidAddress(address as string)) {
                const response = await getResponse(`tokens/${address}`);
                console.log(response);
                if(response.status == 200) {
                    console.log(response.data?.data);
                    setTokens(response.data?.data);
                }
            }
            else {
                //TODO
            }
        }
        getTokens();
    }, []);

    useEffect(() => {
        const getNfts = async() => {
            if(isValidAddress(address as string)) {
                const response = await getResponse(`nfts/${address}`);
                console.log(response);
            }
            else {
                //TODO
            }
        }
        // getTokens();
    }, []);

    return (
        <div className="px-4 flex justify-between py-2 max-sm:flex-col max-sm:items-center">
            <div className="w-[49%] max-sm:w-full">
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
                        {
                            tokens !== null && <DataTable tokens={tokens} />
                        }
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Button variant={"outline"} className="font-semibold" 
                        onClick={() => updateTabState("wallet")}>
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
                    <CardFooter className="flex justify-end">
                        <Button variant={"outline"} className="font-semibold" 
                        onClick={() => updateTabState("nft")}>
                            View all
                            <IoIosArrowForward />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <div className="w-[49%] max-sm:w-full max-sm:mt-3">
                <Card className="mb-3 shadow-xl">
                    <CardContent className="flex items-center py-4">
                        <h1 className="font-semibold text-xl">Activity</h1>
                    </CardContent>
                </Card>
                <ScrollArea className="h-[120vh] w-full max-sm:h-[50vh] max-sm:pb-5">    
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