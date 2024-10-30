"use client"
import React, { useState , useEffect } from 'react';
import { HomeIcon, UserIcon,  ImageIcon, MenuIcon, XIcon, PlusIcon, Router,Layout, Shield } from 'lucide-react';
import {getData} from "./../lib/getData"
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';

//array for tokens
const trendingTokens = [
  {
    id: 1,
    icon: "🔵",
    name: "ONDO",
    chain: "Ethereum",
    price: "$0.723",
    change: "+5.183%",
  },
  {
    id: 2,
    icon: "🔷",
    name: "CZ",
    chain: "BNB Chain",
    price: "$62.86",
    change: "+48.18%",
  },
  {
    id: 3,
    icon: "🔸",
    name: "PENDLE",
    chain: "Arbitrum",
    price: "$5.08",
    change: "+11.38%",
  },
  {
    id: 4,
    icon: "⭐",
    name: "Cheems",
    chain: "BNB Chain",
    price: "$0.0429",
    change: "+12.45%",
  },
  {
    id: 5,
    icon: "🐱",
    name: "CAT",
    chain: "BNB Chain",
    price: "$0.0000355",
    change: "+2.843%",
  },
];

//array for collections
const trendingCollections = [
  {
    id: 1,
    icon: "🎭",
    name: "Clone X - X TAKASHI MURAKAMI",
    chain: "Ethereum",
    price: "0.37 ETH",
    change: "-5.08%",
  },
  {
    id: 2,
    icon: "🎨",
    name: "ApuApustaja",
    chain: "Ethereum",
    price: "0.221 ETH",
    change: "+0.456%",
  },
  {
    id: 3,
    icon: "⚓",
    name: "The Captainz",
    chain: "Ethereum",
    price: "2.499 ETH",
    change: "+1.31%",
  },
];






const TrendingToken = ({ icon, name, chain, price, change }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-2">
      <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-500">{chain}</div>
      </div>
    </div>
    <div className="text-right">
      <div>{price}</div>
      <div className={`text-sm ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </div>
    </div>
  </div>
);




const TrendingCollection = ({ icon, name, chain, price, change }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="font-medium text-sm">{name}</div>
        <div className="text-xs text-gray-500">{chain}</div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-sm">{price}</div>
      <div className={`text-xs ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </div>
    </div>
  </div>
);






// Separate SidebarContent component for reuse

const SidebarContent = ({ Router, chains, coins }) => {
  
  return (
    <div className="p-4 dark:text-white md:text-black text-white">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-lg px-2 py-1 rounded-lg hover:cursor-pointer hover:bg-gray-700">
          <HomeIcon className="h-5 w-5" />
          <span>Home</span>
        </div>
        <div
          className="flex items-center gap-2 text-lg px-2 py-1 rounded-lg hover:cursor-pointer hover:bg-gray-700"
          onClick={() => {
            Router.push("./profile/address");
          }}
        >
          <UserIcon className="h-5 w-5" />
          <span>My Profile</span>
        </div>
        <div className="flex items-center gap-2 text-lg px-2 py-1 rounded-lg hover:cursor-pointer hover:bg-gray-700">
          <Layout className="h-5 w-5" />
          <span>Apps</span>
        </div>
        <div className="flex items-center gap-2 text-lg px-2 py-1 rounded-lg hover:cursor-pointer hover:bg-gray-700">
          <Shield className="h-5 w-5" />
          <span>Tokens</span>
        </div>
        <div className="flex items-center gap-2 text-lg px-2 py-1 rounded-lg hover:cursor-pointer hover:bg-gray-700">
          <ImageIcon className="h-5 w-5" />
          <span>NFTs</span>
        </div>
      </div>

      <div className="mt-8 dark:border-t-2 dark:border-b-2 border-gray-700 py-2 h-40 overflow-y-auto overflow-visible">
        <Input
          placeholder="Filter chain..."
          className="bg-gray-800 border-gray-700"
        />
        <div className="mt-4 space-y-2">
          {chains?.map((chain, index) => (
            <div key={chain.id} className="flex items-center gap-2">
              <img src={chain.image} alt={chain.name} className="w-8 h-8 rounded" />
              <span>{chain.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <span>My Bundles</span>
          <Button variant="ghost" size="sm">
            <PlusIcon className="h-4 w-4" />
            Create
          </Button>
        </div>
      </div>

      <div className="mt-8 dark:border-t-2 dark:border-b-2 border-gray-700 py-2 h-40 overflow-y-auto overflow-visible">
        <div className="mt-4 space-y-2">
          {coins?.map((coin, index) => (
            <div key={coin.id} className="flex items-center gap-2">
              <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded" />
              <span>{coin.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};





const Dashboard = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentBaseFee, setCurrentBaseFee] = useState(7);
  const [chains,setChains] = useState([])  
  const [coins,setCoins] = useState([]) 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    message: '',
});

const Router = useRouter();

// Handle input changes
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

// Handle form submission
const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Here you can add logic to send the formData to your server or API
};



useEffect(()=>{

  const RetrieveData = async () => {
   
    const chainsData = localStorage.getItem("chains");
    
    if (chainsData) {
        
        setChains(JSON.parse(chainsData));
    } else {
        
        const response = await getData("https://cryptolens.onrender.com/chains");
       
        if (response.data) {
            const formattedChains = response.data.map((chain) => ({
                id: chain.id,
                name: chain.name,
                image: chain.image
            }));
            
            
            setChains(formattedChains);
            localStorage.setItem("chains", JSON.stringify(formattedChains));
        }
    }

   
    const coinsData = localStorage.getItem("coins");

    if (coinsData) {
       
        setCoins(JSON.parse(coinsData));
    } else {
        
        const response1 = await getData("https://cryptolens.onrender.com/coins");
        
        if (response1.data) {
            const formattedCoins = response1.data.map((coin) => ({
                id: coin.id,
                name: coin.name,
                image: coin.image
            }));
            
            
            setCoins(formattedCoins);
            localStorage.setItem("coins", JSON.stringify(formattedCoins));
        }
    }
};

// Call RetrieveData
RetrieveData();


const intervalId = setInterval(() => {

    localStorage.removeItem("chains");  
    localStorage.removeItem("coins");
    
  RetrieveData(); 
},15*60 * 100);

return () => clearInterval(intervalId);

},[])



  return (
    <div className=" dark:bg-[#0d0d0d] text-white overflow-hidden ">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800 ">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon className="h-6 w-6  dark:text-white text-black " />
        </Button>
        <div className="text-xl font-semibold">Dashboard</div>
        <div className="w-6" /> {/* Spacer for alignment */}
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="lg:hidden fixed inset-0  bg-opacity-50 z-50 ">
          <div className="w-64 h-full bg-gray-900 text-white p-4 ">
            <div className="flex justify-end mb-4">
              <Button 
                variant="ghost"
                size="sm" 
                 
                onClick={() => setIsSidebarOpen(false)}
              >
              <XIcon className="h-6 w-6 " />
              </Button>
            </div>
            <SidebarContent Router={Router} chains={chains}/>
          </div>
        </div>
      )}




      <div className="flex flex-row">   
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 border-r border-gray-800 h-screen overflow-y-auto ">
          <SidebarContent Router={Router} chains={chains} coins={coins}/>
        </div>

        


      {/* Main Content Form */}
      <div className=" hidden md:flex items-center justify-center min-h-screen bg-gray-100 dark:bg-[#0d0d0d] w-[60%]">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-[#0d0d0d] p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
            >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">Contact Us</h2>

                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-[#0d0d0d] text-gray-800 dark:text-gray-200 placeholder-gray-400 shadow-lg dark:shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-[#0d0d0d] text-gray-800 dark:text-gray-200 placeholder-gray-400 shadow-lg dark:shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Address Field */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Your Address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-[#0d0d0d] text-gray-800 dark:text-gray-200 placeholder-gray-400 shadow-lg dark:shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Message Field */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        placeholder="Your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-gray-50 dark:bg-[#0d0d0d] text-gray-800 dark:text-gray-200 placeholder-gray-400 shadow-lg dark:shadow-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 text-white font-semibold transition duration-300"
                >
                    Send Message
                </button>
            </form>
        </div>



     
        {/* Side Content */}
        <div className=" p-6  md:flex md:flex-col md:w-[30%] w-full  overflow-y-auto  right-0 max-h-screen">
           
          {/* Current Base Fee */}
          <div className="mb-6 flex items-center text-black dark:text-white">
            <span className="text-lg font-semibold mr-2">Current Base Fee</span>
            <span className="text-2xl font-bold">{currentBaseFee}</span>
          </div>
               
            {/* Trending Tokens */}
            <Card className="dark:bg-[#0d0d0d] boxShadow mb-2">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Trending Tokens</h2>
                  <Button variant="link" className="text-blue-400 text-sm">
                    View More
                  </Button>
                </div>
                <div className="space-y-2">
                  {trendingTokens.map((token) => (
                    <TrendingToken
                      key={token.id}
                      icon={token.icon}
                      name={token.name}
                      chain={token.chain}
                      price={token.price}
                      change={token.change}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Collections */}
            <Card className="dark:bg-[#0d0d0d]  boxShadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Trending Collections</h2>
                  <Button variant="link" className="text-blue-400 text-sm">
                    View More
                  </Button>
                </div>
                <div className="space-y-2">
                  {trendingCollections.map((collection) => (
                    <TrendingCollection
                      key={collection.id}
                      icon={collection.icon}
                      name={collection.name}
                      chain={collection.chain}
                      price={collection.price}
                      change={collection.change}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
            
          </div>
          
          </div>
      
    </div>
  );
};

export default Dashboard;