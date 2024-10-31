import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

function InputField() {

    const placeholders = [
        "Enter wallet address to explore holdings and activity",
        "Enter wallet address for token and NFT insights",
        "Enter wallet address to view transaction history"
    ];
     
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submitted");
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