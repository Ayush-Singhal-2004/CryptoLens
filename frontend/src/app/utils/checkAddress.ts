import { ethers } from "ethers";

function isValidAddress(address: string): boolean {
    return ethers.isAddress(address);
}

export default isValidAddress;