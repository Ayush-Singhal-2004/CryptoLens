import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";  
// import { Card, CardContent } from "@/components/ui/card";
import { WalletToken } from "../utils/types";

type DataTablePropType = {
    tokens: [WalletToken]
}

function DataTable({tokens}: DataTablePropType) {

    let data = null;
    if(tokens) {
        data = tokens.slice(0, 5);
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[150px]">Token</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead className="text-right">Value</TableHead>
                </TableRow>
            </TableHeader>  
            <TableBody>
                {
                    data != null && data.map((data, index) => (
                        <TableRow key={index} className="py-5 text-lg">
                            <TableCell className="font-semibold">
                                <div className="flex items-center gap-2">
                                    <img src={data.token.icon_url} alt="logo" className="h-8 rounded-full" />
                                    <p className="overflow-ellipsis whitespace-nowrap overflow-hidden">{data.token.name}</p>
                                </div>
                            </TableCell>
                            <TableCell>
                                ${parseFloat(data.token.exchange_rate).toFixed(5)}
                            </TableCell>
                            <TableCell>
                                <p>
                                    {((Number(data.value) / Math.pow(10, Number(data?.token.decimals)))).toFixed(4)}
                                </p>
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                                ${(
                                    parseFloat(data.token.exchange_rate || "0") // Use "0" as a fallback if exchange_rate is not a valid number
                                    * (Number(data.value || "0") / Math.pow(10, Number(data.token.decimals || "0"))) // Use "0" as a fallback for value and decimals
                                ).toFixed(5)}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default DataTable;