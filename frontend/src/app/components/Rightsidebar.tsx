"use client";
import * as React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { ChevronLeft, ChevronRight, Layers, User } from "lucide-react";
import { useEffect,useState } from "react";
import getResponse from "../utils/api";
import { ScrollArea } from "@/components/ui/scroll-area";

function RightSidebar({TopTokens}) {
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
    

    return (
        <aside className={`fixed md:w-96 md:static inset-y-0 right-0 z-50 bg-[#1f2937e2] w-64 transform ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold">Top Tokens</h2>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setRightSidebarOpen(false)}>
                <ChevronRight className="h-6 w-6" />
            </Button>
            </div>
            <ScrollArea className="h-[calc(100vh-5rem)]">
                <div className="p-4 pr-10">
                    {TopTokens?.map((token, index) => (
                    <div key={index} className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 pr-2">
                                <img
                                    src={token?.image}
                                    alt="Bitcoin Logo"
                                    className="w-5 h-5 md:w-5 md:h-5"
                                />
                            </div>
                            <span className="text-xl">{token?.name}</span>
                            </div>
                            <div className="text-right">
                            <div>${token?.price.toLocaleString()}</div>
                            <div className={token?.percent_change_15m >= 0 ? 'text-green-400' : 'text-red-400'}>
                                {token?.percent_change_15m}%
                            </div>
                            </div>
                    </div>
                    ))}
                </div>
            </ScrollArea>
        </aside>
    )

}

export default RightSidebar;