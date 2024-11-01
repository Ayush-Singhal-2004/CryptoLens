import { Card, CardContent } from "@/components/ui/card"

type ActivityCardPropType = {
    timestamp: string,
    method: string,
    status: string,
    to: string,
    from: string,
    transactionHash: string,
    fee: string
}

function ActivityCard({transactions}: any) {
    return (
        <>
        {
            transactions?.length > 0 && transactions.map((transaction, index) => (
                <div key={index}>
                    <TransactionCard
                    timestamp={transaction?.timestamp}
                    method={transaction?.method}
                    status={transaction?.status}
                    to={transaction?.to.hash}
                    from={transaction?.from.hash}
                    transactionHash={transaction?.hash}
                    fee={transaction?.fee.value}
                    />
                </div>
            ))
        }
        </>
    )
}

function TransactionCard({
    timestamp, method, status, to, from, transactionHash, fee
}: ActivityCardPropType) {
    return (
        <Card className="mb-3 shadow-xl">
            <CardContent className="py-5 flex flex-col gap-4">
                <p><strong>Timestamp:</strong> {new Date(timestamp).toLocaleString()}</p>
                <p><strong>Method:</strong> {method}</p>
                <p><strong>Status:</strong> {status}</p>
                <p><strong>To:</strong> {to}</p>
                <p><strong>From:</strong> {from}</p>
                <p><strong>Transaction Hash:</strong> {transactionHash}</p>
                <p><strong>Fee:</strong> {parseInt(fee).toLocaleString()} wei</p>
            </CardContent>
        </Card>
    )
}

export default ActivityCard;