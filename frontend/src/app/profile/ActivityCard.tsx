import { Card, CardContent } from "@/components/ui/card"  

type ActivityCardPropType = {
    timestamp: string,
    method: string,
    status: string,
    to: string,
    from: string,
    transactionHash: string,
    fee: string
}

function ActivityCard({
    timestamp, method, status, to, from, transactionHash, fee
}: ActivityCardPropType) {
    return (
        <Card className="mb-3 shadow-xl">
            <CardContent className="py-5 flex flex-col gap-4">
                <p><strong>Timestamp:</strong> {new Date(timestamp).toLocaleString()}</p>
                <p><strong>Method:</strong> {method}</p>
                <p><strong>Status:</strong> {status}</p>
                <p><strong>To:</strong> {to}</p>
                <p><strong>From:</strong> {from}</p>
                <p><strong>Transaction Hash:</strong> {transactionHash}</p>
                <p><strong>Fee:</strong> {parseInt(fee).toLocaleString()} wei</p>
                {/* <div className="flex items-center gap-2">
                    <img 
                    src="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/706a11ec-2dc9-4f00-e56a-fe8a4973eb00/original" alt="nft" className="h-10 w-10 rounded-lg" />
                    <div>
                        <h1 className="text-sm">
                            lens/savesh371
                        </h1>
                        <p className="text-sm font-normal text-gray-400">
                            4 days ago
                        </p>
                    </div>
                </div>
                <div className="border-b dark:border-b-[#262626]">
                    <p className="font-semibold pb-2">
                        Bought <span className="text-[#927FFF]">delegati.eth</span> fan tokens
                    </p>
                </div>
                <div className="flex items-center gap-3 dark:bg-[#0d0d0d] p-2 rounded-lg">
                    <img src="https://zapper.xyz/cdn-cgi/image/width=32/https://storage.googleapis.com/zapper-fi-assets/tokens/base/0x8c9037d1ef5c6d1f6816278c7aaf5491d24cd527.png" alt="logo" 
                    className="h-7 w-7" />
                    <p>600 MOXIE</p>
                    <p className="font-semibold text-sm dark:bg-gray-800 px-2 border dark:border-gray-600 rounded-lg">
                        IN
                    </p>
                </div> */}
            </CardContent>
        </Card>
    )
}

export default ActivityCard;