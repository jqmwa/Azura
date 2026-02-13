import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_ASSETS } from "@/lib/constants";
import type { ChainId } from "@/types";

export function AssetTable() {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Assets</CardTitle>
          <span className="text-xs text-gray-500">{MOCK_ASSETS.length} tokens</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] text-left">
                <th className="pb-3 pr-4 text-xs font-medium tracking-wider text-gray-500 uppercase">Asset</th>
                <th className="pb-3 pr-4 text-xs font-medium tracking-wider text-gray-500 uppercase">Balance</th>
                <th className="pb-3 pr-4 text-xs font-medium tracking-wider text-gray-500 uppercase">Value</th>
                <th className="pb-3 pr-4 text-xs font-medium tracking-wider text-gray-500 uppercase">24h</th>
                <th className="pb-3 text-xs font-medium tracking-wider text-gray-500 uppercase">Chain</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ASSETS.map((asset, i) => (
                <tr
                  key={i}
                  className={`transition-colors hover:bg-white/[0.02] ${
                    i !== MOCK_ASSETS.length - 1 ? "border-b border-white/[0.04]" : ""
                  }`}
                >
                  <td className="py-3 pr-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-50">
                        {asset.symbol}
                      </span>
                      <span className="text-xs text-gray-500">
                        {asset.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 font-mono text-gray-300">
                    {asset.balance}
                  </td>
                  <td className="py-3 pr-4 text-gray-300">{asset.value}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={
                        asset.change.startsWith("+")
                          ? "text-success"
                          : asset.change === "0.0%"
                            ? "text-gray-500"
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
