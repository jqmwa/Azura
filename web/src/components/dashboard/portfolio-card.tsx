import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function PortfolioCard() {
  return (
    <Card className="relative overflow-hidden">
      {/* Subtle top accent */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      <CardHeader>
        <p className="text-xs font-medium tracking-wider text-gray-400 uppercase">Total Value Locked</p>
        <div className="flex items-end gap-3 mt-1">
          <span className="text-3xl font-bold tracking-tight text-gray-50">$299,339.30</span>
          <span className="mb-0.5 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">+3.2%</span>
        </div>
        <p className="text-sm text-gray-500">Across 5 chains</p>
      </CardHeader>
      <CardContent>
        {/* Donut */}
        <div className="flex items-center justify-center">
          <div className="relative h-36 w-36">
            <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#1A1A24" strokeWidth="3.5" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#627EEA" strokeWidth="3.5"
                strokeDasharray="30 70" strokeDashoffset="0" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#0052FF" strokeWidth="3.5"
                strokeDasharray="25 75" strokeDashoffset="-30" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#8247E5" strokeWidth="3.5"
                strokeDasharray="20 80" strokeDashoffset="-55" strokeLinecap="round" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#B24BF3" strokeWidth="3.5"
                strokeDasharray="25 75" strokeDashoffset="-75" strokeLinecap="round" />
            </svg>
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-gray-500">TVL</span>
              <span className="text-sm font-bold text-gray-50">$299K</span>
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 text-xs">
          {[
            { color: "bg-chain-ethereum", label: "Ethereum", pct: "30%" },
            { color: "bg-chain-base", label: "Base", pct: "25%" },
            { color: "bg-chain-polygon", label: "Polygon", pct: "20%" },
            { color: "bg-purple-500", label: "Other", pct: "25%" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${item.color}`} />
              <span className="text-gray-400">{item.label}</span>
              <span className="ml-auto font-medium text-gray-300">{item.pct}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
