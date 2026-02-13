import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_TRANSACTIONS } from "@/lib/constants";
import type { TransactionStatus, ChainId } from "@/types";

const statusVariant: Record<TransactionStatus, "success" | "warning" | "error"> = {
  confirmed: "success",
  pending: "warning",
  failed: "error",
};

export function TransactionFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col divide-y divide-gray-700/50">
          {MOCK_TRANSACTIONS.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-50">
                    {tx.type}
                  </span>
                  <Badge variant={statusVariant[tx.status as TransactionStatus]}>
                    {tx.status}
                  </Badge>
                </div>
                <span className="font-mono text-xs text-gray-400">
                  {tx.hash}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-medium text-gray-50">
                  {tx.amount}
                </span>
                <div className="flex items-center gap-1.5">
                  <Badge chain={tx.chain as ChainId}>{tx.chain}</Badge>
                  <span className="text-xs text-gray-400">{tx.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
