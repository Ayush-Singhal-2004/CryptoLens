"use client";
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { ChevronLeft, Layers, User } from "lucide-react";
import { useEffect,useState } from "react";
import getResponse from "../utils/api";

function LeftSidebar() {
    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
    const [Chains,setChains]=useState<[unknown] | null>(null);
    const [Coins,setCoins]=useState<[unknown] | null>(null);

    const getChains=async() => {
        const response = await getResponse(`chains`);
        console.log(response);
        if(response.status == 200 && response.data.data !== "Internal server error") {
            console.log(response.data?.data);
            setChains(response.data?.data);
        }
    }
    const getCoins=async() => {
        const response = await getResponse(`coins`);
        console.log(response);
        if(response.status == 200 && response.data.data !== "Internal server error") {
            console.log(response.data?.data);
            setCoins(response.data?.data);
        }
    }
    useEffect(()=>{
        getChains()
        getCoins()
    },[])
    return (
        <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#1f2937e2] transform ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold">0v.dev</h2>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setLeftSidebarOpen(false)}>
                <ChevronLeft className="h-6 w-6" />
            </Button>
            </div>
            <nav className="p-4">
                {[
                    // { icon: <Home className="h-5 w-5" />, label: "Home" },
                    { icon: <User className="h-5 w-5" />, label: "My Profile" },
                    // { icon: <Image className="h-5 w-5" />, label: "NFTs" },
                    { icon: <Layers className="h-5 w-5" />, label: "Tokens" },
                ].map((item, index) => (
                    <Button key={index} variant="ghost" className="w-full justify-start mb-2 hover:bg-gray-900">
                    {item.icon}
                    <span className="ml-2 text-xl">{item.label}</span>
                    </Button>
                ))}
            </nav>
            <div className="p-4 border-t border-gray-700">
                <h3 className="text-2xl font-semibold mb-2">Supported Chains</h3>
                {Chains?.map((chain, index) => (
                    <Button key={index} variant="ghost" className="w-full justify-start mb-2 hover:bg-gray-900">
                    <div className="flex-shrink-0">
                        <img
                            src={chain?.image}
                            alt="Bitcoin Logo"
                            className="w-5 h-5 md:w-5 md:h-5"
                        />
                    </div>
                    <span className="text-[22px]">{chain?.name}</span>
                    </Button>
                ))}
            </div>
            <div className="p-4 border-t border-gray-700">
                <h3 className="text-2xl font-semibold mb-2">Top Coins </h3>
                {Coins?.map((coin, index) => (
                    <Button key={index} variant="ghost" className="w-full justify-start mb-2 hover:bg-gray-900">
                    <div className="flex-shrink-0">
                        <img
                            src={coin?.image}
                            alt="Bitcoin Logo"
                            className="w-5 h-5 md:w-7 md:h-7"
                        />
                        </div>
                    <span className="text-[22px]">{coin?.name}</span>
                    </Button>
                ))}
            </div>
        </aside>
    )
}

export default LeftSidebar;