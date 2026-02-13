import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function PortfolioCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Value Locked</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-gray-50">$299,339.30</span>
          <span className="mb-1 text-sm font-medium text-success">+3.2%</span>
        </div>
        <p className="mt-1 text-sm text-gray-400">Across 5 chains</p>

        {/* Donut placeholder */}
        <div className="mt-6 flex items-center justify-center">
          <div className="relative h-32 w-32">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#2A2A38"
                strokeWidth="4"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#627EEA"
                strokeWidth="4"
                strokeDasharray="30 70"
                strokeDashoffset="0"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#0052FF"
                strokeWidth="4"
                strokeDasharray="25 75"
                strokeDashoffset="-30"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#8247E5"
                strokeWidth="4"
                strokeDasharray="20 80"
                strokeDashoffset="-55"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="#B24BF3"
                strokeWidth="4"
                strokeDasharray="25 75"
                strokeDashoffset="-75"
              />
            </svg>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-chain-ethereum" />
            <span className="text-gray-400">ETH 30%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-chain-base" />
            <span className="text-gray-400">Base 25%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-chain-polygon" />
            <span className="text-gray-400">Polygon 20%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
            <span className="text-gray-400">Other 25%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
