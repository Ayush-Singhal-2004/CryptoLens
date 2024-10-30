"use client"

import * as React from "react"
import LeftSidebar from "./components/Leftsidebar"
import RightSidebar from "./components/Rightsidebar"
import MainContent from "./components/MainContent"
import Footer from "./components/Footer"
import { useEffect, useState } from "react"
import getResponse from "./utils/api"
export default function Home() {
    const [TopTokens, setTopTokens] =useState<[unknown] | null>(null);

    const getTopTokens=async() => {
        const response = await getResponse(`trendingtokens`);
        console.log(response);
        if(response.status == 200 && response.data.data !== "Internal server error") {
            console.log(response.data?.data);
            setTopTokens(response.data?.data);
        }
    }
    useEffect(()=>{
        getTopTokens()
    },[])
  return (
    <>
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
        <LeftSidebar />
        <MainContent  TopTokens={TopTokens}/>
        <RightSidebar TopTokens={TopTokens}/>
    </div>
     {/* Footer */}
    <div>
        <Footer/> 
    </div>
    </>
    
  )
}