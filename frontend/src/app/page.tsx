"use client"

import * as React from "react"
import LeftSidebar from "./components/Leftsidebar"
import RightSidebar from "./components/Rightsidebar"
import MainContent from "./components/MainContent"
import Footer from "./components/Footer"
import { useEffect, useState } from "react"
import getResponse from "./utils/api"
import { TrendingTokens } from "./utils/types"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
    const [TopTokens, setTopTokens] = useState<TrendingTokens[] | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        let topTokens = localStorage.getItem("topTokens");
        if(topTokens) {
            topTokens = JSON.parse(topTokens);
            setTopTokens(topTokens as any);
        }
    }, []);

    const getTopTokens=async() => {
        const response = await getResponse(`trendingtokens`);
        console.log(response);
        if(response.status == 200 && response.data.data !== "Internal server error") {
            console.log(response.data?.data);
            localStorage.setItem("topTokens", JSON.stringify(response.data?.data));
            setTopTokens(response.data?.data);
        }
    }

    const updateToast = (title: string, description: string, type: string) => {

        let classname = "bg-blue-100 border-l-4 border-[#111827] text-[#111827]";
        if(type === "success") {
            classname = "bg-green-100 border-l-4 border-green-500 text-green-700";
        } 
        else if(type === "destructive") {
            classname = "bg-red-100 border-l-4 border-red-500 text-red-700"
        }

        toast({
            title: title,
            description: description,
            className: classname
        })
    }

    useEffect(()=>{
        getTopTokens();
    },[])


  return (
    <>
    <div className="flex flex-col md:flex-row min-h-screen dark:bg-gray-900 text-white">
        <LeftSidebar updateToast={updateToast} />
        <MainContent  TopTokens={TopTokens} updateToast={updateToast} />
        <Toaster />
        <RightSidebar TopTokens={TopTokens}/>
    </div>
     {/* Footer */}
    <div>
        <Footer/> 
    </div>
    </>
    
  )
}