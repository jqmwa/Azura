import { Card, CardContent } from "@/components/ui/card";
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

      <div className="flex items-center justify-between p-6 pb-0">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-50">
            Recent Transactions
          </h3>
          <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-xs font-medium text-gray-400">
            {MOCK_TRANSACTIONS.length}
          </span>
        </div>
        <button className="text-xs font-medium text-purple-400 transition-colors hover:text-purple-300">
          View all
        </button>
      </div>

      <CardContent className="pt-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-left">
                <th className="pb-3 pr-6 text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Type
                </th>
                <th className="pb-3 pr-6 text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Status
                </th>
                <th className="pb-3 pr-6 text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Hash
                </th>
                <th className="pb-3 pr-6 text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Amount
                </th>
                <th className="pb-3 pr-6 text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Chain
                </th>
                <th className="pb-3 text-xs font-medium tracking-wider text-gray-500 uppercase text-right">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TRANSACTIONS.map((tx, i) => (
                <tr
                  key={tx.id}
                  className={`transition-colors hover:bg-white/[0.02] ${
                    i !== MOCK_TRANSACTIONS.length - 1
                      ? "border-b border-white/[0.04]"
                      : ""
                  }`}
                >
                  <td className="py-3 pr-6">
                    <span className="font-medium text-gray-50">{tx.type}</span>
                  </td>
                  <td className="py-3 pr-6">
                    <Badge variant={statusVariant[tx.status as TransactionStatus]}>
                      {tx.status}
                    </Badge>
                  </td>
                  <td className="py-3 pr-6 font-mono text-gray-500">
                    {tx.hash}
                  </td>
                  <td className="py-3 pr-6 font-medium text-gray-300">
                    {tx.amount}
                  </td>
                  <td className="py-3 pr-6">
                    <Badge chain={tx.chain as ChainId}>{tx.chain}</Badge>
                  </td>
                  <td className="py-3 text-right text-xs text-gray-500">
                    {tx.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
