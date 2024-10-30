import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react";
import { CiCreditCard2, CiViewList } from "react-icons/ci";
import ActivityCard from "./ActivityCard";
import ActivityList from "./ActivityList";


function Activity() {

    const [displayType, setDisplayType] = useState("card");
    const [transactionType, setTransactionType] = useState("all");

    return (
        <div className="px-4 py-2">
            <Card className="shadow-lg">
                <CardContent className="py-4 flex items-center justify-between
                max-sm:flex-col max-sm:items-start max-sm:gap-5">
                    <h1 className="font-semibold text-xl">Activity</h1>
                    <div className="flex gap-10 max-sm:flex-col-reverse max-sm:gap-3
                    max-sm:items-center max-sm:w-full">
                        <Tabs value={displayType} className="max-sm:w-full">
                            <TabsList className="max-sm:w-full">
                                <TabsTrigger value="card" className="flex gap-2
                                max-sm:flex-1"
                                onClick={() => setDisplayType("card")}>
                                    <CiCreditCard2 size={20} />
                                    <h2 className="font-semibold text-base">Card</h2>
                                </TabsTrigger>
                                <TabsTrigger value="list" className="flex gap-2
                                max-sm:flex-1"
                                onClick={() => setDisplayType("list")}>
                                    <CiViewList size={20} />
                                    <h2 className="font-semibold text-base">List</h2>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <Tabs value={transactionType} className="max-sm:w-full">
                            <TabsList className="max-sm:w-full">
                                <TabsTrigger value="all" className="flex gap-2 max-sm:flex-1"
                                onClick={() => setTransactionType("all")}>
                                    <h2 className="font-semibold text-base">
                                        All
                                    </h2>
                                </TabsTrigger>
                                <TabsTrigger value="received" className="flex gap-2
                                max-sm:flex-1"
                                onClick={() => setTransactionType("received")}>
                                    <h2 className="font-semibold text-base">
                                        Received
                                    </h2>
                                </TabsTrigger>
                                <TabsTrigger value="send" className="flex gap-2
                                max-sm:flex-1"
                                onClick={() => setTransactionType("send")}>
                                    <h2 className="font-semibold text-base">
                                        Send
                                    </h2>
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </CardContent>
            </Card>
            <div>
                {
                    displayType == "card" ? <ActivityCard /> : <ActivityList />
                }
            </div>
        </div>
    )
}

export default Activity;