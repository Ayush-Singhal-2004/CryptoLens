"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Layers, User } from "lucide-react";
import { useEffect, useState } from "react";
import getResponse from "../utils/api";
import { useRouter } from 'next/navigation';
import { Chain, Coin } from "../utils/types";
import Image from 'next/image';

function LeftSidebar() {
    const router = useRouter();

    const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
    const [Chains, setChains] = useState<[Chain] | null>(null);
    const [Coins, setCoins] = useState<[Coin] | null>(null);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        console.log("LeftSidebar mounted");
        setHasMounted(true);
    }, []);

    const getChains = async () => {
        const response = await getResponse(`chains`);
        if (response.status === 200 && response.data.data !== "Internal server error") {
            setChains(response.data?.data);
        }
    };

    const getCoins = async () => {
        const response = await getResponse(`coins`);
        if (response.status === 200 && response.data.data !== "Internal server error") {
            setCoins(response.data?.data);
        }
    };

    useEffect(() => {
        if (hasMounted) {
            getChains();
            getCoins();
        }
    }, [hasMounted]);

    const handleCoinButton = ({ coin_id }: { coin_id: string }) => {
        console.log("Clicked on coin", coin_id);
        if (typeof window === "undefined") return null;
        //Router.push(`/coin/${coin_id}`);
    };

    const handleMyProfileClick = () => {
        const address = localStorage.getItem("address");
        if(address) {

        }
    }
    if (!hasMounted) return null;

    const handleTopCoinClick = (id: string) => {
        router.push(`/coin/${id}`);
    }

    return (
        <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 dark:bg-[#1f2937e2] transform ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out text-black dark:text-white`}>
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 border-gray-300">
                <h2 className="text-xl font-bold">Menu</h2>
                <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setLeftSidebarOpen(false)}>
                    <ChevronLeft className="h-6 w-6" />
                </Button>
            </div>
            <nav className="p-4">
                {[
                    { icon: <User className="h-5 w-5" />, label: "My Profile", handleClick: handleMyProfileClick },
                    { icon: <Layers className="h-5 w-5" />, label: "Tokens" },
                ].map((item, index) => (
                    <Button key={index} variant="ghost" className="w-full justify-start mb-2 hover:bg-gray-400 dark:hover:bg-gray-700 dark:bg-[#1D2735]" onClick={item?.handleClick}>
                        {item.icon}
                        <span className="ml-2 text-lg">{item.label}</span>
                    </Button>
                ))}
            </nav>
            <div className="p-4 border-t dark:border-gray-700 border-gray-300">
                <h3 className="text-xl font-semibold mb-2">Supported Chains</h3>
                {Chains?.map((chain, index) => (
                    <Button key={index} variant="ghost" className="w-full justify-start mb-2 hover:bg-gray-400 dark:hover:bg-gray-700 dark:bg-[#1D2735]">
                        <div className="flex-shrink-0">
                            <img src={chain.image} alt="Chain Logo"  className="w-5 h-5 md:w-5 md:h-5" />
                        </div>
                        <span className="text-lg">{chain.name}</span>
                    </Button>
                ))}
            </div>
            <div className="p-4 border-t dark:border-gray-700 border-gray-300">
                <h3 className="text-xl font-semibold mb-2">Top Coins</h3>
                {Coins?.map((coin, index) => (
                    <Button key={index} variant="ghost" className="w-full justify-start mb-2 hover:bg-gray-400 dark:bg-[#1D2735] dark:hover:bg-gray-700" onClick={() => handleTopCoinClick(coin?.id)}>
                        <div className="flex-shrink-0">
                            <Image src={coin?.image} alt="Coin Logo" className="w-5 h-5 md:w-7 md:h-7" width={32} height={32} />
                        </div>
                        <span className="text-lg">{coin.name}</span>
                    </Button>
                ))}
            </div>
        </aside>
    );
}

export default LeftSidebar;