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
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <span className="text-xs text-gray-500">{MOCK_TRANSACTIONS.length} total</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          {MOCK_TRANSACTIONS.map((tx, i) => (
            <div
              key={tx.id}
              className={`flex items-center justify-between py-3 ${
                i !== MOCK_TRANSACTIONS.length - 1 ? "border-b border-white/[0.04]" : ""
              }`}
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
                <span className="font-mono text-xs text-gray-500">
                  {tx.hash}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-medium text-gray-50">
                  {tx.amount}
                </span>
                <div className="flex items-center gap-1.5">
                  <Badge chain={tx.chain as ChainId}>{tx.chain}</Badge>
                  <span className="text-xs text-gray-500">{tx.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
