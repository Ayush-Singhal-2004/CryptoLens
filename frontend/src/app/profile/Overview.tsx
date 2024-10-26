import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"  
import DataTable from "../components/DataTable";
import { Button } from "@/components/ui/button";
import { IoIosArrowForward } from "react-icons/io";
import ActivityCard from "./ActivityCard";
import { ScrollArea } from "@/components/ui/scroll-area"

function Overview() {
    return (
        <div className="px-4 flex justify-between">
            <div className="w-[49%]">
                <Card>
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
                </Card>
            </div>
            <div className="w-[49%]">
                <Card className="mb-3">
                    <CardContent className="flex items-center py-4">
                        <h1 className="font-semibold text-xl">Activity</h1>
                    </CardContent>
                </Card>
                <ScrollArea className="h-[500px] w-full">    
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                </ScrollArea>
            </div>
        </div>
    )
}

export default Overview;