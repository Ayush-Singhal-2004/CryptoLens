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
    CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function TransactionTable() {
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
                                    tokens.map((token, index) => (
                                        <TableRow key={index} className="text-lg">
                                            <TableCell className="font-semibold">
                                                <div className="flex items-center gap-4 w-72 max-sm:w-32">
                                                    <img src="https://zapper.xyz/cdn-cgi/image/width=32/https://storage.googleapis.com/zapper-fi-assets/tokens/base/0x8c9037d1ef5c6d1f6816278c7aaf5491d24cd527.png" alt="" />
                                                    {token.token_name}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {token.price}
                                            </TableCell>
                                            <TableCell>
                                                {token.balance}
                                            </TableCell>
                                            <TableCell className="text-right font-semibold">
                                                {token.value}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button variant={"outline"} className="font-semibold">
                            Show More
                        </Button>
                    </CardFooter>
                </Card>
    )
}

const tokens = [
    {
      "token_name": "ETH",
      "price": 1543.16,
      "balance": 78.3846,
      "value": 120959.98
    },
    {
      "token_name": "BTC",
      "price": 3832.73,
      "balance": 97.4534,
      "value": 373512.57
    },
    {
      "token_name": "SOL",
      "price": 2884.37,
      "balance": 17.7735,
      "value": 51265.35
    },
    {
      "token_name": "ADA",
      "price": 579.93,
      "balance": 45.8467,
      "value": 26587.88
    },
    {
      "token_name": "MATIC",
      "price": 2965.09,
      "balance": 46.1493,
      "value": 136836.83
    }
]  

export default TransactionTable;