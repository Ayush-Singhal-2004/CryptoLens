import { Card, CardContent } from "@/components/ui/card";

type NftCardPropType = {
    image_url: string,
    name: string,
    value: string
}

function NftCard({image_url, name, value}: NftCardPropType) {

    
    return (
        <Card className="h-[40vh] w-[16vw] overflow-hidden cursor-pointer relative max-sm:w-[75vw] max-sm:h-[42vh]">
            <CardContent className="p-0 h-full">
                <div className="h-[65%]">
                    <img 
                    src={image_url} 
                    alt="" 
                    className="h-full w-full object-cover" />
                </div>
                <div className="h-[35%] dark:bg-[#252A2E] flex items-center justify-center px-3 gap-2 max-sm:gap-0">
                    <h1 className="font-semibold">{name}</h1>
                    {/* <div>
                        <p className="text-xs text-gray-300">Est. Value</p>
                        <h1 className="font-semibold tracking-wider">0.0001 ETH</h1>
                    </div> */}
                </div>
            </CardContent>
            <div className="absolute z-30 right-3 top-3 dark:bg-[#181C1F] p-1 rounded-md">
                <p className="text-sm">x{value}</p>
            </div>
        </Card>
    )
}

export default NftCard;