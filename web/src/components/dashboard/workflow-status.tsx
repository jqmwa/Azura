import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOCK_WORKFLOWS } from "@/lib/constants";
import type { WorkflowStatus as WfStatus } from "@/types";

const statusColor: Record<WfStatus, string> = {
  active: "bg-success",
  paused: "bg-warning",
  error: "bg-error",
};

const statusBadge: Record<WfStatus, "success" | "warning" | "error"> = {
  active: "success",
  paused: "warning",
  error: "error",
};

export function WorkflowStatusCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Workflows</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col divide-y divide-gray-700/50">
          {MOCK_WORKFLOWS.map((wf) => (
            <div
              key={wf.id}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    statusColor[wf.status as WfStatus]
                  }`}
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-gray-50">
                    {wf.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    Last run: {wf.lastRun}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant={statusBadge[wf.status as WfStatus]}>
                  {wf.status}
                </Badge>
                <Badge variant="default">{wf.trigger}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
