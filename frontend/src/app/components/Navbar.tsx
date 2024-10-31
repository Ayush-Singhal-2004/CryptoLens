"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "next-themes";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        ethereum?: any;
    }
}

function Navbar() {

    const { theme, setTheme } = useTheme();
    const [connectWalletFlag, setConnectWalletFlag] = useState(true);

    useEffect(() => {
        if(localStorage.getItem("address")) {
            setConnectWalletFlag(false);
        }
    }, []);
    
    const changeTheme = () => { 
        setTheme(theme == "dark" ? "light" : "dark");
    }

    const connectWallet = async() => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner()
        localStorage.setItem("address", signer.address);
    }

    return (
        <nav className="flex border-b dark:border-gray-700 dark:bg-gray-900 shadow-md justify-between px-6 py-3">
            <div className="flex gap-[5vw]">
                <h1 className="text-3xl font-bold">CryptoLens</h1>
                {/* <Input type="text" placeholder="Search accounts" className="w-[32vw] shadow-sm" /> */}
            </div>
            <div className="flex gap-3">
                {
                    connectWalletFlag && 
                    <Button variant="default" className="font-semibold dark:bg-[#1F2937] dark:text-white" onClick={connectWallet}>
                        Connect Wallet
                    </Button>
                }
                <Button variant="ghost" onClick={changeTheme}>
                    {
                        theme == "dark" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />
                    }
                </Button>
            </div>
        </nav>
    )
}

export default Navbar;