"use client";

import { Icon } from "@/components/ui/icon";
import { MotionWrapper } from "@/components/shared/motion-wrapper";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { FEATURES } from "@/lib/constants";
import type { IconName } from "@/types";

const iconColors: Record<string, { bg: string; text: string; glow: string }> = {
  workflow: { bg: "bg-purple-500/10", text: "text-purple-400", glow: "group-hover:shadow-purple-500/20" },
  crosschain: { bg: "bg-blue-500/10", text: "text-blue-400", glow: "group-hover:shadow-blue-500/20" },
  code: { bg: "bg-cyan-400/10", text: "text-cyan-400", glow: "group-hover:shadow-cyan-400/20" },
  shield: { bg: "bg-violet-500/10", text: "text-violet-400", glow: "group-hover:shadow-violet-500/20" },
  monitor: { bg: "bg-success/10", text: "text-success", glow: "group-hover:shadow-success/20" },
  globe: { bg: "bg-blue-400/10", text: "text-blue-400", glow: "group-hover:shadow-blue-400/20" },
};

export function Features() {
  return (
    <section id="features" className="relative py-20 lg:py-32">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] rounded-full bg-purple-500/[0.03] blur-[120px]" />

      <div className="relative mx-auto max-w-[1280px] px-6">
        <MotionWrapper variants={fadeInUp} className="mb-12 text-center lg:mb-16">
          <p className="mb-3 text-sm font-medium tracking-wider text-purple-400 uppercase">
            Features
          </p>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Everything you need for{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              programmable treasury
            </span>
          </h2>
        </MotionWrapper>

        <MotionWrapper
          variants={staggerContainer}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => {
            const colors = iconColors[feature.icon] || iconColors.workflow;
            return (
              <MotionWrapper
                key={feature.title}
                variants={fadeInUp}
                className={`group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04] hover:shadow-lg ${colors.glow}`}
              >
                <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${colors.bg} ${colors.text}`}>
                  <Icon name={feature.icon as IconName} size={20} />
                </div>
                <h3 className="mb-2 text-base font-semibold text-gray-50">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {feature.description}
                </p>
              </MotionWrapper>
            );
          })}
        </MotionWrapper>
      </div>
    </section>
  );
}
