import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useState } from "react";
import isValidAddress from "../utils/checkAddress";
import { useRouter } from "next/navigation";

function InputField({ updateToast }: {
    updateToast: (title: string, description: string) => void
}) {

    const [address, setAddress] = useState("");
    const router = useRouter();

    const placeholders = [
        "Enter wallet address to explore holdings and activity",
        "Enter wallet address for token and NFT insights",
        "Enter wallet address to view transaction history"
    ];
     
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(address);
        if(isValidAddress(address)) {
            router.push(`/profile/${address}`);
        }
        else {
            updateToast("Invalid address", "Enter a valid wallet address.");
        }
        setAddress("");
    };

    return (
        <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
        />
    )
}

export default InputField;