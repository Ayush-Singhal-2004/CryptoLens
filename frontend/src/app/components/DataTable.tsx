import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";  
import { Card, CardContent } from "@/components/ui/card";

type DataTablePropType = {
    tokens: [{
        icon_url: string,
        name: string,
        exchange_rate: string,
        holders: string
    }]
}

function DataTable({tokens}: DataTablePropType) {
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
                    tokens.map((token, index) => (
                        <TableRow key={index} className="py-5 text-lg">
                            <TableCell className="font-semibold">
                                <div className="flex items-center gap-2">
                                    <img src={token.icon_url} alt="" />
                                    {token.name}
                                </div>
                            </TableCell>
                            <TableCell>
                                {token.exchange_rate}
                            </TableCell>
                            <TableCell>
                                {token.holders}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                                {token.holders}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
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

export default DataTable;