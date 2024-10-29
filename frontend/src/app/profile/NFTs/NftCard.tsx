import { Card, CardContent } from "@/components/ui/card";

function NftCard() {
    return (
        <Card className="w-[16vw] overflow-hidden cursor-pointer relative max-sm:w-[75vw] max-sm:h-[42vh]">
            <CardContent className="p-0 h-full">
                <div className="h-[65%]">
                    <img 
                    src="https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fmedias%2F79065fe989dd6239cecc04674a57cf339a76db39665ffea4f8356a9237836b8d.png&width=500&checksum=16466" 
                    alt="" className="h-full w-full object-cover" />
                </div>
                <div className="h-[35%] dark:bg-[#252A2E] flex flex-col justify-center px-3 gap-2 max-sm:gap-0">
                    <h1 className="font-semibold">Community Call #1</h1>
                    <div>
                        <p className="text-xs text-gray-300">Est. Value</p>
                        <h1 className="font-semibold tracking-wider">0.0001 ETH</h1>
                    </div>
                </div>
            </CardContent>
            <div className="absolute z-30 right-3 top-3 dark:bg-[#181C1F] p-1 rounded-md">
                <p className="text-sm">x1</p>
            </div>
        </Card>
    )
}

export default NftCard;