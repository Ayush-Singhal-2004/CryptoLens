import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";  
// import { Card, CardContent } from "@/components/ui/card";

type DataTablePropType = {
    tokens: [any]
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
                                    {(data.value/Math.pow(10, data.token.decimals)).toFixed(4)}
                                </p>
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                                ${parseFloat((parseFloat(data.token.exchange_rate).toFixed(5)) * ((data.value/Math.pow(10, data.token.decimals)).toFixed(4))).toFixed(3)}
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default DataTable;