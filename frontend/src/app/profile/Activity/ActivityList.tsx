import { ScrollArea } from "@/components/ui/scroll-area";

function ActivityList() {
    return (
        <ScrollArea className="w-full rounded-md border px-4 py-2 mt-3 shadow-lg">
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
        </ScrollArea>
    )
}

function ListItem() {
    return (
        <div className="flex justify-between py-4 border-b cursor-pointer px-2">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <img src="https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/706a11ec-2dc9-4f00-e56a-fe8a4973eb00/original" alt="logo"
                    className="h-5 rounded" />
                    <h1>lens/sarvesh371</h1>
                    <p className="text-xs dark:text-gray-300">5 days ago</p>
                </div>
                <h1 className="font-semibold text-lg">
                    Bought <span className="text-[#A387FF]">delegati.eth</span> fan tokens
                </h1>
            </div>
            <div>
                <div>
                    <p className="text-xs tracking-wider dark:text-gray-200">
                        - 610.8095 MOXIE
                    </p>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default ActivityList;