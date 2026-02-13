import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_ASSETS } from "@/lib/constants";
import type { ChainId } from "@/types";

export function AssetTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 text-left">
                <th className="pb-3 pr-4 font-medium text-gray-400">Asset</th>
                <th className="pb-3 pr-4 font-medium text-gray-400">Balance</th>
                <th className="pb-3 pr-4 font-medium text-gray-400">Value</th>
                <th className="pb-3 pr-4 font-medium text-gray-400">24h</th>
                <th className="pb-3 font-medium text-gray-400">Chain</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ASSETS.map((asset, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-700/50 last:border-b-0"
                >
                  <td className="py-3 pr-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-50">
                        {asset.symbol}
                      </span>
                      <span className="text-xs text-gray-400">
                        {asset.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 font-mono text-gray-200">
                    {asset.balance}
                  </td>
                  <td className="py-3 pr-4 text-gray-200">{asset.value}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={
                        asset.change.startsWith("+")
                          ? "text-success"
                          : asset.change === "0.0%"
                            ? "text-gray-400"
                            : "text-error"
                      }
                    >
                      {asset.change}
                    </span>
                  </td>
                  <td className="py-3">
                    <Badge chain={asset.chain as ChainId}>{asset.chain}</Badge>
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
