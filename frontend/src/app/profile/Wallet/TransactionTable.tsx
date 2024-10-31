import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"  
import { Card,
    CardContent, 
    CardHeader, 
    CardTitle, 
} from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { WalletToken } from "@/app/utils/types";

type TransactionTablePropType = {
    tokens: [WalletToken] | any
}

function TransactionTable({tokens}: TransactionTablePropType) {

    if(tokens?.message) {
        return ( 
            <div className="h-[70vh]">
                <h1 className="flex justify-center text-lg font-semibold py-5">You don't have any tokens</h1>
            </div>
        )
    }

    let data = null;
    if(tokens) {
        data = tokens.filter((token) => token.token.exchange_rate !== null);
    }

    return (
        <Card className="my-4 shadow-xl mx-4">
                    <CardHeader>
                        <CardTitle className="text-xl">
                            <div className="flex justify-between">
                                <h1>Wallet</h1>
                                <h1>$13,868.39</h1>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
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
                                                    {
                                                        data.token.icon_url ? (
                                                            <img src={data.token.icon_url} alt=""  className="w-8 h-8 rounded-full"></img>
                                                        ) : 
                                                        <div className="rounded-full border p-2">
                                                            {data.token.name.slice(0,2)}
                                                        </div>
                                                    }
                                                    <p className="whitespace-nowrap overflow-hidden mr-7">{data.token.name}</p>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                ${parseFloat(data.token.exchange_rate).toFixed(5)}
                                            </TableCell>
                                            <TableCell>
                                                <p>
                                                    {(Number(data.value)/Math.pow(10, Number(data.token.decimals))).toFixed(4)}
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
                    </CardContent>
                </Card>
    )
}

// const tokens = [
//     {
//       "token_name": "ETH",
//       "price": 1543.16,
//       "balance": 78.3846,
//       "value": 120959.98
//     },
//     {
//       "token_name": "BTC",
//       "price": 3832.73,
//       "balance": 97.4534,
//       "value": 373512.57
//     },
//     {
//       "token_name": "SOL",
//       "price": 2884.37,
//       "balance": 17.7735,
//       "value": 51265.35
//     },
//     {
//       "token_name": "ADA",
//       "price": 579.93,
//       "balance": 45.8467,
//       "value": 26587.88
//     },
//     {
//       "token_name": "MATIC",
//       "price": 2965.09,
//       "balance": 46.1493,
//       "value": 136836.83
//     }
// ]  

export default TransactionTable;