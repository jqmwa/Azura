"use client";

import { Header } from "@/components/dashboard/header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <>
      <Header title="Settings" />
      <div className="mx-auto max-w-2xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>Treasury Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Input
                id="treasury-name"
                label="Treasury Name"
                placeholder="My Treasury"
                defaultValue="Main Treasury"
              />
              <Input
                id="rpc-url"
                label="Custom RPC URL"
                placeholder="https://..."
              />
              <Input
                id="webhook-url"
                label="Webhook URL"
                placeholder="https://..."
              />
              <div className="mt-2">
                <Button>Save Changes</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
