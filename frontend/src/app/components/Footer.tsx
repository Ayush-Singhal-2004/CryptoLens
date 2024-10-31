"use client";
import * as React from "react"
import {  Github, Twitter,} from "lucide-react";

function Footer() {
    return (
    <footer className="border-t border-gray-800 bg-gray-900 py-8">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   <div className="flex flex-col md:flex-row justify-between items-center">
     <div className="text-gray-400 mb-4 md:mb-0">
       © 2024 CryptoLens . All rights reserved.
     </div>
     <div className="flex space-x-6">
       <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
         Terms
       </a>
       <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
         Privacy
       </a>
       <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
         <Github className="w-6 h-6" />
       </a>
       <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
         <Twitter className="w-6 h-6" />
       </a>
     </div>
   </div>
 </div>
</footer>
    )
}

export default Footer;