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
// import { useEffect, useState } from "react";
// import getResponse from "@/app/utils/api";
// import { useParams } from "next/navigation";
// import isValidAddress from "@/app/utils/checkAddress";
import { Skeleton } from "@/components/ui/skeleton";
import { NFT, WalletToken } from "@/app/utils/types";
import { useEffect, useState } from "react";

type OverviewPropType = {
    updateTabState: (updatedState: string) => void,
    tokens: [WalletToken] | null,
    nfts: [NFT] | null
}

function Overview({updateTabState, tokens, nfts}: OverviewPropType) {

    // const [total, setTotal] = useState(0);
    const [nftsTotal, setNftsTotal] = useState(0);

    return (
        <div className="px-4 flex justify-between py-2 max-sm:flex-col max-sm:items-center">
            <div className="w-[49%] max-sm:w-full">
                <Card className="mb-3 shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-xl">
                            <div className="flex justify-between">
                                <h1>Wallet</h1>
                                {/* <h1>${total}</h1> */}
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {
                            tokens == null && <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-5">
                                    <Skeleton className="w-[40px] h-[40px] rounded-full" />
                                    <Skeleton className="w-[200px] h-[25px] rounded-full" />
                                    <Skeleton className="w-[200px] h-[25px] rounded-full" />
                                </div>
                                <div className="flex items-center gap-5">
                                    <Skeleton className="w-[40px] h-[40px] rounded-full" />
                                    <Skeleton className="w-[200px] h-[25px] rounded-full" />
                                    <Skeleton className="w-[200px] h-[25px] rounded-full" />
                                </div>
                            </div> 
                        }
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
                                {/* <h1>${nftsTotal}</h1> */}
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 grid-rows-1 justify-items-center" id="overview-nft-grid-container">
                        {
                            nfts == null &&  <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-5">
                                    <Skeleton className="w-[40px] h-[40px] rounded-full" />
                                    <Skeleton className="w-[200px] h-[25px] rounded-full" />
                                    <Skeleton className="w-[200px] h-[25px] rounded-full" />
                                </div>
                                <div className="flex items-center gap-5">
                                    <Skeleton className="w-[40px] h-[40px] rounded-full" />
                                    <Skeleton className="w-[200px] h-[25px] rounded-full" />
                                    <Skeleton className="w-[200px] h-[25px] rounded-full" />
                                </div>
                            </div> 
                        }
                        {
                             nfts != null && nfts.map((nft, index) => (
                                <div key={index} className="overview-grid-container-item">
                                         <NftCard 
                                         image_url={nft.image_url}
                                         name={nft.metadata.name}
                                         value={nft.value}
                                         />
                                 </div>
                             ))
                        }
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