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
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gray-900/80 px-8 py-16 text-center lg:px-16 lg:py-20"
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
                Ready to digitize your business treasury?
              </h2>
            </MotionWrapper>

            <MotionWrapper variants={fadeInUp}>
              <p className="max-w-lg text-lg text-gray-400">
                Add BTC, ETH, and stablecoins to your company&apos;s treasury
                and let Azura&apos;s AI agent manage it. No sales calls required.
              </p>
            </MotionWrapper>

            <MotionWrapper variants={fadeInUp}>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="animate-pulse-glow border-purple-200/30 hover:border-purple-200/50 hover:shadow-[0_0_36px_rgba(99,102,241,0.45),0_4px_16px_rgba(0,0,0,0.3),0_0_0_1px_rgba(34,211,238,0.2)] transition-all duration-200"
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
