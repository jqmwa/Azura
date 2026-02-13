"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function CTASection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-6">
        <MotionWrapper
          variants={staggerContainer}
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] px-8 py-16 text-center lg:px-16 lg:py-20"
          style={{
            background:
              "linear-gradient(135deg, rgba(45, 11, 68, 0.8) 0%, rgba(17, 17, 24, 0.9) 40%, rgba(17, 17, 24, 0.9) 60%, rgba(30, 27, 75, 0.6) 100%)",
          }}
        >
          {/* Mesh orbs */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-purple-500/15 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[80px]" />

          {/* Dot grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(136,136,160,0.2) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative flex flex-col items-center gap-6">
            <MotionWrapper variants={fadeInUp}>
              <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
                Ready to automate your{" "}
                <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                  treasury
                </span>
                ?
              </h2>
            </MotionWrapper>

            <MotionWrapper variants={fadeInUp}>
              <p className="max-w-lg text-lg text-gray-400">
                Start building programmable treasury workflows in minutes.
                No enterprise sales call required.
              </p>
            </MotionWrapper>

            <MotionWrapper variants={fadeInUp}>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="animate-pulse-glow bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 hover:from-purple-400 hover:via-violet-400 hover:to-blue-400 shadow-lg shadow-purple-500/20"
                  >
                    Get Started
                  </Button>
                </Link>
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-white/[0.08] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06]"
                >
                  Read the Docs
                </Button>
              </div>
            </MotionWrapper>

            <MotionWrapper variants={fadeInUp}>
              <div className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm px-4 py-2 font-mono text-sm text-gray-400">
                <span className="text-purple-400">$</span>
                <span>npx azura init</span>
              </div>
            </MotionWrapper>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
